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
npm install @amho/vottom-sheet
```

```bash copy
# or yarn:
yarn add @amho/vottom-sheet
```

```bash copy
# or pnpm:
pnpm add @amho/vottom-sheet
```

## How to use

```vue copy


```

## Props

Vottom Sheet supports the following props:

- `modelValue` (`Boolean`, required): Control the visibility of the bottom sheet. Works in pair with `@update:modelValue` to enable 2-way data binding (`v-model`).
- `fullscreen` (`Boolean`, optional, default: `false`): Make the component fullscreen.
- `zIndex` (`String` | `Number`, optional, default: `0`): Specify the `z-index` of the bottom-sheet.
- `closeOnEscape` (`Boolean`, optional, default: `false`): Whether to close the bottom sheet on ECS key press.
- More props are going to be added...

## Events

- `update:modelValue` (Payload: Boolean): Works in pair with `@update:modelValue` to enable 2-way data binding (`v-model`). Can be used to listen on state changes and trigger custom code.

## Slots

- `default`: Insert the content that is going to be displayed inside bottom sheet.
- `handle`: Insert custom handle for bottom sheet which is displayed above the `content` slot and can be used to drag the component.
