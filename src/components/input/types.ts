import { OmitWithTypes } from '../../types/utils';

export interface InputProps
  extends OmitWithTypes<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'value' | 'defaultValue' | 'onChange'
  > {
  /**
   * 输入框尺寸
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 输入框状态
   * @default 'default'
   */
  status?: 'default' | 'success' | 'error';
  /**
   * 输入框图标
   */
  icon?: React.ReactNode;
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

export interface InputPasswordProps
  extends OmitWithTypes<InputProps, 'icon' | 'type'> {
  /**
   * 是否显示密码
   * @default false
   */
  showPassword?: boolean;
  /**
   * 点击密码图标回调
   */
  onClickIcon?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
