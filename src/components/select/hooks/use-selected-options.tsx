import { useEffect, useMemo, useState } from 'react';
import { OptionType, RawValueType, SelectProps } from '../types';

type UseSelectedOptionsProps = Pick<
  SelectProps,
  'options' | 'defaultOptions' | 'labelInValue' | 'value' | 'mode'
>;

export const useSelectedOptions = (props: UseSelectedOptionsProps) => {
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

  // 已选项，抹平单选和多选的差异
  const selectedOptions = useMemo<OptionType[]>(() => {
    if (!value) return [] as OptionType[];

    if (mode === 'single') {
      const option = labelInValue
        ? (value as OptionType)
        : valueOptionsCacheMap.get(value as RawValueType) ??
          ({ value } as OptionType);
      return [option];
    } else {
      return (value as OptionType[] | RawValueType[])?.map((item) => {
        return labelInValue
          ? (item as OptionType)
          : valueOptionsCacheMap.get(item as RawValueType) ??
              ({ value: item } as OptionType);
      });
    }
  }, [value, mode, labelInValue, valueOptionsCacheMap]);

  return { selectedOptions };
};
