export interface Props {
  modelValue: boolean;
  fullScreen?: boolean;
  zIndex?: StringOrNumber;
}

export interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}
