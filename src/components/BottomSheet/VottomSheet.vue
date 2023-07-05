<script setup lang="ts">
import 'hammerjs';
import { computed, onMounted, ref, watch } from 'vue';
import { useVModel, useWindowSize } from '@vueuse/core';
import { useLockDocumentOverflow } from '@/composables/index.ts';
import BaseOverlay from '@/components/Overlay/VOverlay.vue';
import { MAX_OPACITY } from './VottomSheet.constants.ts';
import type { Emits, Props } from './VottomSheet.types';

const props = withDefaults(defineProps<Props>(), {
  fullscreen: false,
  zIndex: 0,
});

const emit = defineEmits<Emits>();

const internalModelValue = useVModel(props, 'modelValue', emit);

// HEIGHT
const handle = ref<HTMLDivElement | null>(null);
const content = ref<HTMLDivElement | null>(null);

const bottom = ref(0);
const totalContentHeight = ref(0);

const handleHeight = computed(() => {
  if (!handle.value) {
    return 0;
  }

  if (!(handle.value instanceof HTMLElement)) {
    return 0;
  }

  return handle.value.clientHeight;
});

function setBottomIfClosed() {
  if (props.fullscreen) {
    bottom.value = -window.innerHeight;
  } else {
    bottom.value = totalContentHeight.value;
  }
}

const contentAndHandleHeight = computed(() => {
  if (!content.value) {
    return handleHeight.value;
  }

  if (!(content.value instanceof HTMLElement)) {
    return handleHeight.value;
  }

  return content.value.clientHeight + handleHeight.value;
});

function setBottom(modelValue: boolean) {
  if (modelValue) {
    bottom.value = 0;
    return;
  }

  setBottomIfClosed();
}

function setHeightBaseOnContent() {
  if (!content.value) {
    return;
  }

  totalContentHeight.value = -contentAndHandleHeight.value;

  setBottom(internalModelValue.value);
}

watch(content, setHeightBaseOnContent);

const { width: windowWidth } = useWindowSize();

watch(windowWidth, setBottomIfClosed);

const height = computed(() =>
  props.fullscreen ? windowWidth.value && -window.innerHeight : totalContentHeight.value
);

// WIDTH
const width = computed(() => (props.fullscreen ? '100vw' : '640px'));

// BORDER RADIUS
const borderRadius = computed(() => !props.fullscreen && 'bottom-sheet--bordered');

// OVERLAY OPACITY
const backdropOpacity = computed(() => MAX_OPACITY - (bottom.value / height.value) * MAX_OPACITY);

// V-MODEL
const close = () => emit('update:modelValue', false);

const openStateClass = computed(() => internalModelValue && 'bottom-sheet--open');
const openStateStyle = computed(() => ({
  bottom: `${bottom.value}px`,
  height: `${Math.abs(height.value)}px`,
  width: width.value
}));

watch(internalModelValue, setBottom);

// TOUCH EVENTS
function registerTouchEvents() {
  if (!handle.value) {
    return;
  }

  if (!(handle.value instanceof HTMLElement)) {
    return;
  }

  const hammerWrapper = new Hammer(handle.value, {});

  hammerWrapper.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

  hammerWrapper.on('pan', (ev: any) => {
    const { deltaY } = ev;

    if (deltaY > 0) {
      bottom.value = 0 - deltaY;
    }

    if (!ev.isFinal) {
      return;
    }

    if (ev.velocityY > 0.6) {
      close();
      return;
    }

    if (bottom.value <= totalContentHeight.value * 0.6) {
      close();
    } else {
      bottom.value = 0;
    }
  });
}

onMounted(registerTouchEvents);

// SCROLLING
const lock = useLockDocumentOverflow();

watch(internalModelValue, (value) => (lock.value = value));
</script>

<template>
  <BaseOverlay v-if="internalModelValue" :opacity="backdropOpacity" @click="close" />

  <div
    v-bind="$attrs"
    class="bottom-sheet"
    :class="[openStateClass, width, borderRadius]"
    :style="openStateStyle"
  >
    <div ref="handle" class="bottom-sheet__handle">
      <slot name="handle">
        <div class="bottom-sheet__handle-bar" />
      </slot>
    </div>

    <div ref="content" class="bottom-sheet__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottom-sheet {
  transition: all 300ms cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: bottom;
  position: fixed;
  display: block;
  overflow: auto;
  background-color: white;
  left: 50%;
  transform: translate(-50%, 0);
  max-width: 100vw;
  z-index: v-bind(zIndex);

  &--open {
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
  }

  &--bordered {
    border-radius: 28px 28px 0 0;
  }

  &__handle {
    position: sticky;
    height: 3.2rem;
    width: 100%;
    background-color: white;

    &-bar {
      position: relative;
      top: 0.8rem;
      margin: 0 auto;
      background-color: #d1d5db;
      height: 0.3rem;
      width: 3rem;
      border-radius: 0.375rem;
    }
  }

  &__content {
    overflow-y: auto;
    scroll-behavior: smooth;
  }
}
</style>
