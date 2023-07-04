import { watch } from 'vue';
import { useToggle } from '@vueuse/core';

export default function useLockDocumentOverflow() {
  const [lock] = useToggle(false);

  const lockScroll = () => (document.body.style.overflowY = 'hidden');
  const unlockScroll = () => (document.body.style.overflowY = 'auto');

  function toggleDocumentScroll(scroll: boolean) {
    if (scroll) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }

  watch(lock, toggleDocumentScroll);

  return lock;
}
