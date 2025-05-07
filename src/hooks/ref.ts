import { useRef, useCallback } from 'react';

/**
 * 统一处理 ref，支持 ref object 和 ref callback，
 * 并确保始终能够访问到当前 DOM 元素
 */
export const useForwardedRef = <T>(propsRef: React.ForwardedRef<T>) => {
  const ref = useRef<T | null>(null);

  const setRef = useCallback<React.RefCallback<T>>(
    (element) => {
      // 处理 ref callback 的情况
      if (typeof propsRef === 'function') {
        propsRef(element);
      }
      // 处理 ref object 的情况
      else if (propsRef) {
        propsRef.current = element;
      }
      // 始终更新内部 ref
      ref.current = element;
    },
    [propsRef],
  );

  return [ref, setRef] as const;
};

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
