# Vottom Sheet

Vottom Sheet is a touch-friendly, lightweight and easy-to-use Vue.js component
that allows you to create smooth bottom sheets or modal dialogs in your web
application.

## Features

- Simple integration: Easily integrate the Vottom Sheet component into your Vue.js project with just a few lines of code.
- Smooth animations: Enjoy smooth and elegant animations as the bottom sheet slides into view and hides.
- Flexible: Use Vottom Sheet however you want.
- More to come...

## Installation

```bash copy
# npm:
npm install vottom-sheet
```
```bash copy
# or yarn:
yarn add vottom-sheet
```

```bash copy
 # or pnpm:
pnpm add vottom-sheet
```

## Usage

```vue copy
<script lang="ts" setup>
import { ref } from 'vue';
import VottomSheet from 'vottom-sheet';

const model = ref(false);
</script>

<template>
  <button type="button" @click="model = true">
    Open Vottom Sheet
  </button>

  <VottomSheet v-model="model">
    <div>
      Hello from Vottom Sheet
    </div>
  </VottomSheet>
</template>
```

## Props

Vottom Sheet supports the following props:

- `modelValue` (Boolean, required): Control the visibility of the bottom sheet. Works in pair with `@update:modelValue` to enable 2-way data binding (`v-model`).
- `fullscreen` (Boolean, optional, default: false): Make the component fullscreen.
- More props are going to be added...

## Events

- `update:modelValue` (Payload: Boolean): Works in pair with `@update:modelValue` to enable 2-way data binding (`v-model`). Can be used to listen on state changes and triggering custom code.

## Slots
- `default`: Insert the content that is going to be displayed inside bottom sheet.
- `handle`: Insert custom handle for bottom sheet which is displayed above the `content` slot and can be used to drag the component.

