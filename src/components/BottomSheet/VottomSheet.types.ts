export interface Props {
  modelValue: boolean;
  fullscreen?: boolean;
  zIndex?: StringOrNumber;
}

export interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}
