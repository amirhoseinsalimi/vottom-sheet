import { onBeforeUnmount } from 'vue';
import { useEventListener } from '@vueuse/core';

export default function useOnEscapeKey(cb: () => void) {
  const unregister = useEventListener(document, 'keydown', (e: KeyboardEvent) => {
    if (e.key !== 'Escape') {
      return;
    }

    cb();
  });

  onBeforeUnmount(unregister);
}
