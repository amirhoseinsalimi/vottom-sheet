<script lang="ts" setup>
import { ref } from 'vue';
import VottomSheet from '@/components/BottomSheet/VottomSheet.vue';

const model = ref(false);
</script>

<template>
  <button type="button" @click="model = true">
    Open Vottom Sheet
  </button>

  <VottomSheet v-model="model">
    <div style="color: black">
      Hello from Vottom Sheet
    </div>
  </VottomSheet>
</template>
