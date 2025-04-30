import { OptionType, RawValueType, SelectProps, ValueType } from './types';

export enum KeyCode {
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  Enter = 'Enter',
  Escape = 'Escape',
  Tab = 'Tab',
  Backspace = 'Backspace',
}

/**
 * 判断当前选项是否被选中
 */
export const isSelected = (
  mode: SelectProps['mode'],
  labelInValue: boolean,
  value: ValueType,
  option: OptionType,
) => {
  if (mode === 'single') {
    if (labelInValue) {
      return value === option;
    } else {
      return value === option.value;
    }
  } else {
    if (labelInValue) {
      return (value as OptionType[])?.some((v) => v.value === option.value);
    } else {
      return (value as RawValueType[])?.some((v) => v === option.value);
    }
  }
};

/**
 * 查找下一个（或上一个）第一个非禁用态的选项
 */
export const findNextOption = (
  options: OptionType[],
  currentIndex: number,
  keyCode: KeyCode,
) => {
  if (!options.length) return -1;

  let index = currentIndex;
  const total = options.length;

  for (let i = 0; i < total; i++) {
    if (keyCode === KeyCode.ArrowDown) {
      index = (index + 1) % total;
    } else {
      index = (index - 1 + total) % total;
    }
    // 如果不是禁用项，返回
    if (!options[index].disabled) {
      return index;
    }
  }
  // 全部都禁用
  return -1;
};