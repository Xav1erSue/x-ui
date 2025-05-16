import { OmitWithTypes } from '../../types';
import { FormItemBaseProperty } from '../form/types';

export interface RadioProps
  extends OmitWithTypes<React.HTMLAttributes<HTMLInputElement>, 'onChange'>,
    OmitWithTypes<FormItemBaseProperty, 'size'> {
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否选中
   * @default false
   */
  checked?: boolean;
  /**
   * 默认是否选中
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * 选中状态变化时触发
   */
  onChange?: (checked?: boolean) => void;
  /**
   * 单选框的标签文本
   */
  label?: React.ReactNode;
}

export type OptionValueType = string | number | boolean;

export interface RadioOptionType {
  label: string;
  value: OptionValueType;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends OmitWithTypes<
      React.HTMLAttributes<HTMLDivElement>,
      'onChange' | 'children'
    >,
    OmitWithTypes<FormItemBaseProperty, 'size'> {
  /**
   * 单选框的值
   */
  value?: string;
  /**
   * 默认选中的值
   */
  defaultValue?: string;
  /**
   * 单选框的值
   */
  onChange?: (value: string) => void;
  /**
   * 单选框的选项
   */
  options?: OptionValueType[] | RadioOptionType[];
}
