<script setup lang="ts">
import Hammer from 'hammerjs';
import { computed, onMounted, ref, watch } from 'vue';
import { useVModel, useWindowSize } from '@vueuse/core';
import BaseOverlay from '@/components/Overlay/VOverlay.vue';
import { useLockDocumentOverflow, useOnEscapeKey } from '@/composables/index.ts';
import { MAX_OPACITY } from './VottomSheet.constants.ts';
import type { Emits, Props } from './VottomSheet.types';

const props = withDefaults(defineProps<Props>(), {
  closeOnEscape: false,
  closeOnOverlayClick: false,
  disableSwipe: false,
  eager: false,
  fullscreen: false,
  zIndex: 0,
});

const emit = defineEmits<Emits>();

const internalModelValue = useVModel(props, 'modelValue', emit);

// HEIGHT
const handle = ref<Maybe<HTMLDivElement>>(null);
const content = ref<Maybe<HTMLDivElement>>(null);

const { width: windowWidth, height: windowHeight } = useWindowSize({
  listenOrientation: true,
});

const bottom = ref(-window.innerHeight);
const totalContentHeight = ref(0);

const handleYMargins = computed(() => {
  if (!handle.value) {
    return 0;
  }

  if (!(handle.value instanceof HTMLElement)) {
    return 0;
  }

  if (!handle.value.firstElementChild) {
    return 0;
  }

  const marginTop = Number.parseInt(
    window.getComputedStyle(handle.value.firstElementChild).marginTop,
    10
  );
  const marginBottom = Number.parseInt(
    window.getComputedStyle(handle.value.firstElementChild).marginBottom,
    10
  );

  return marginTop + marginBottom;
});

const handleHeight = computed(() => {
  if (!handle.value) {
    return 0;
  }

  if (!(handle.value instanceof HTMLElement)) {
    return 0;
  }

  return handle.value.clientHeight + handleYMargins.value;
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

watch(windowWidth, setBottomIfClosed);

const height = computed(() =>
  props.fullscreen
    ? (windowWidth.value || windowHeight.value) && -window.innerHeight
    : Math.min(totalContentHeight.value, window.innerHeight)
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
  width: width.value,
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

  hammerWrapper.on('pan', (event: HammerInput) => {
    const { deltaY } = event;

    if (deltaY > 0) {
      bottom.value = 0 - deltaY;
    }

    if (!event.isFinal) {
      return;
    }

    if (event.velocityY > 0.6) {
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

if (!props.disableSwipe) {
  onMounted(registerTouchEvents);
}

// SCROLLING
const lock = useLockDocumentOverflow();

watch(internalModelValue, (value) => (lock.value = value));

// DISMISS WITH ESCAPE KEY
if (props.closeOnEscape) {
  useOnEscapeKey(close);
}

// EAGER
const shouldMountContent = computed(() => props.eager || internalModelValue.value);

// CLOSE ON OVERLAY CLICK
function closeIfShouldClose() {
  if (!props.closeOnOverlayClick) {
    return;
  }

  close();
}
</script>

<template>
  <Teleport to="body">
    <BaseOverlay v-if="internalModelValue" :opacity="backdropOpacity" @click="closeIfShouldClose" />

    <div
      v-bind="$attrs"
      class="bottom-sheet"
      :class="[openStateClass, width, borderRadius]"
      :style="openStateStyle"
    >
      <div ref="handle" class="bottom-sheet__handle">
        <slot name="handle">
          <div class="bottom-sheet__handle__wrapper">
            <div class="bottom-sheet__handle__wrapper__bar" />
          </div>
        </slot>
      </div>

      <div class="bottom-sheet__content-wrapper">
        <div v-if="shouldMountContent" ref="content" class="bottom-sheet__content-wrapper__content">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.bottom-sheet {
  transition: all 300ms cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
  position: fixed;
  display: flex;
  flex: {
    direction: column;
  }
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
    width: 100%;
    background-color: white;

    &__wrapper {
      height: 1.8rem;
      position: relative;

      &__bar {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0 auto;
        background-color: #d1d5db;
        height: 0.3rem;
        width: 2.8rem;
        border-radius: 0.375rem;
      }
    }
  }

  &__content-wrapper {
    display: flex;
    flex: 1 1 0;

    &__content {
      overflow-y: auto;
      scroll-behavior: smooth;
    }
  }
}
</style>
