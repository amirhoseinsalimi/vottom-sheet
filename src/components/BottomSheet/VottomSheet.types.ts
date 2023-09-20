export interface Props {
  modelValue: boolean;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  eager?: boolean;
  fullscreen?: boolean;
  zIndex?: StringOrNumber;
}

export interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}
