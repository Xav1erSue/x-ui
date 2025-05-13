import { OmitWithTypes } from '../../types/utils';
import { FormItemBaseProperty } from '../form/types';

export interface InputProps
  extends OmitWithTypes<
      React.InputHTMLAttributes<HTMLInputElement>,
      'size' | 'value' | 'defaultValue' | 'onChange' | 'prefix' | 'disabled'
    >,
    FormItemBaseProperty {
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 输入框尺寸
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 前缀
   */
  prefix?: React.ReactNode;
  /**
   * 后缀
   */
  suffix?: React.ReactNode;
  /**
   * 输入框值
   */
  value?: string;
  /**
   * 输入框默认值
   */
  defaultValue?: string;
  /**
   * 输入框值变化回调
   */
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 是否显示清除按钮
   * @default false
   */
  allowClear?: boolean;
}

export type InputPasswordProps = OmitWithTypes<InputProps, 'type' | 'suffix'>;

export interface InputTextAreaProps
  extends OmitWithTypes<
      React.InputHTMLAttributes<HTMLTextAreaElement>,
      'size' | 'value' | 'defaultValue' | 'onChange' | 'prefix' | 'disabled'
    >,
    FormItemBaseProperty {
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 输入框尺寸
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 输入框值
   */
  value?: string;
  /**
   * 输入框默认值
   */
  defaultValue?: string;
  /**
   * 输入框值变化回调
   */
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 是否显示清除按钮
   * @default false
   */
  allowClear?: boolean;
  /**
   * 是否自动调整高度
   * @default false
   */
  autoHeight?: boolean;
  /**
   * 是否显示计数
   * @default false
   */
  showCount?: boolean;
}
