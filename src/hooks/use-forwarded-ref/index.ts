import { useCallback, useRef } from 'react';

/**
 * 合并多个 ref，同时支持 ref object 和 ref callback
 */
export const useMergeRefs = <T>(
  refs: Array<
    | React.MutableRefObject<T>
    | React.RefCallback<T>
    | React.ForwardedRef<T>
    | null
  >,
) => {
  const mergedRef = useRef<T | null>(null);

  const setRef = useCallback<React.RefCallback<T>>(
    (element) => {
      if (mergedRef.current) return;

      refs.forEach((ref) => {
        // 处理 ref callback 的情况
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          ref.current = element;
        } else {
          console.error('ref is not a valid ref');
        }
      });
      mergedRef.current = element;
    },
    [refs],
  );

  return [mergedRef, setRef] as const;
};
