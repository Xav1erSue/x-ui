import { useEffect, useMemo, useState } from 'react';
import { OptionType, RawValueType, SelectProps } from '../types';

type UseDisplayValueProps = Pick<
  SelectProps,
  'options' | 'defaultOptions' | 'mode' | 'labelInValue' | 'value'
>;

export const useDisplayValue = (props: UseDisplayValueProps) => {
  const { options, defaultOptions, mode, labelInValue, value } = props;

  // 缓存所有的 options，用于在搜索场景下也能正确回显
  const [valueOptionsCacheMap, setValueOptionsCacheMap] = useState<
    Map<RawValueType, OptionType>
  >(new Map(defaultOptions?.map((option) => [option.value, option])));

  // 每次 options 变化时，更新缓存
  useEffect(() => {
    if (!options?.length) return;

    options.forEach((item) => {
      setValueOptionsCacheMap((pre) => new Map(pre).set(item.value, item));
    });
  }, [options]);

  const displayValue = useMemo(() => {
    if (mode === 'single') {
      if (labelInValue) {
        const option = value as OptionType;
        return option?.label ?? option?.value;
      } else {
        const option = valueOptionsCacheMap.get(value as RawValueType);
        return option?.label ?? option?.value;
      }
    } else {
      if (labelInValue) {
        return (value as OptionType[])
          ?.map((item) => item.label ?? item.value)
          ?.join('、');
      } else {
        return (value as RawValueType[])
          ?.map((item) => {
            const option = valueOptionsCacheMap.get(item);
            return option?.label ?? option?.value;
          })
          .join('、');
      }
    }
  }, [value, mode, labelInValue, valueOptionsCacheMap]);

  return { displayValue };
};
