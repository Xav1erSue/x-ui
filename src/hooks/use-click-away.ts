import { useEffect } from 'react';

export const useClickAway = <T extends HTMLElement>(
  handler: (event: MouseEvent | UIEvent | Event | TouchEvent) => void,
  refs: React.MutableRefObject<T>[],
  eventName: Array<keyof DocumentEventMap> = ['click'],
) => {
  useEffect(() => {
    const abortController = new AbortController();

    eventName.forEach((event) => {
      document.body.addEventListener(
        event,
        (e) => {
          const target = e.target as Node;

          const isClickInside = refs.some((ref) => {
            const element = ref.current;
            return element && element.contains(target);
          });

          if (!isClickInside) handler(e);
        },
        {
          capture: true,
          signal: abortController.signal,
        },
      );
    });

    return () => abortController.abort();
  }, [handler, refs, eventName]);
};
