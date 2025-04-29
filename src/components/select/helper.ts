import { OptionType, RawValueType, SelectProps, ValueType } from './types';

export enum KeyCode {
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  Enter = 'Enter',
  Escape = 'Escape',
  Tab = 'Tab',
}

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
