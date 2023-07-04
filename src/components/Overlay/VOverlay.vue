<script setup lang="ts">
import { computed } from 'vue';
import type { Props } from './VOverlay.types';

const props = withDefaults(defineProps<Props>(), {
  opacity: 0.5,
});

// OPACITY
const backgroundColorWithOpacity = computed(() => ({
  backgroundColor: `rgba(0, 0, 0, ${props.opacity})`,
}));
</script>

<template>
  <div :style="backgroundColorWithOpacity" class="overlay" />
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: black;
  width: 100vw;
  height: 100vh;
}
</style>
