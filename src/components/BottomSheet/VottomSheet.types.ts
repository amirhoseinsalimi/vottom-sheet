export interface Props {
  modelValue: boolean;
  fullScreen?: boolean;
}

export interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}
