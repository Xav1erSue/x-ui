import { OmitWithTypes } from 'src/types';
import { FormItemBaseProperty } from '../form/types';

export interface StepperProps
  extends OmitWithTypes<
      React.InputHTMLAttributes<HTMLInputElement>,
      'value' | 'defaultValue' | 'onChange' | 'size' | 'prefix' | 'placeholder'
    >,
    FormItemBaseProperty {
  /**
   * 值
   */
  value?: number;
  /**
   * 默认值
   */
  defaultValue?: number;
  /**
   * 值改变时回调
   */
  onChange?: (value: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 最小值
   */
  min?: number;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 步长
   */
  step?: number;
  /**
   * 精度
   * @default 0
   */
  precision?: number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 前缀
   */
  prefix?: React.ReactNode;
  /**
   * 后缀
   */
  suffix?: React.ReactNode;
  /**
   * 是否圆角
   */
  rounded?: boolean;
}
