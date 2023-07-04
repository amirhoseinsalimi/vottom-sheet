<script lang="ts" setup>
import VottomSheet from '@/components/BottomSheet/VottomSheet.vue'
import { ref } from 'vue'

const model = ref(false)
</script>

<template>
  <div>
    <button @click="model = true">Click me</button>

    <VottomSheet v-model="model">
      <div style="color: black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quos cum! Suscipit maxime
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quos cum! Suscipit maxime
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quos cum! Suscipit maxime
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quos cum! Suscipit maxime
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quos cum! Suscipit maxime
        qui totam numquam tempore doloremque quidem est! Possimus consectetur in autem libero
        voluptas aperiam voluptates placeat similique?
        voluptas aperiam voluptates placeat similique?
        voluptas aperiam voluptates placeat similique?
        voluptas aperiam voluptates placeat similique?
        voluptas aperiam voluptates placeat similique?
        voluptas aperiam voluptates placeat similique?
        voluptas aperiam voluptates placeat similique?
      </div>
    </VottomSheet>
  </div>
</template>

<style lang="scss"></style>
