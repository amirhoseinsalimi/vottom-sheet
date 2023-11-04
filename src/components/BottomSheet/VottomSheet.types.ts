export interface Props {
  modelValue: boolean;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  disableSwipe?: boolean;
  eager?: boolean;
  fullscreen?: boolean;
  zIndex?: StringOrNumber;
  transitionDuration?: StringOrNumber;
}

export interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}
