export interface Props {
  modelValue: boolean;
  fullscreen?: boolean;
  zIndex?: StringOrNumber;
  closeOnEscape?: boolean;
  eager?: boolean;
}

export interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}
