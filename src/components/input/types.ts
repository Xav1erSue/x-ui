import { OmitWithTypes } from '../../types/utils';

export interface InputProps
  extends OmitWithTypes<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 输入框尺寸
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 输入框图标
   */
  icon?: React.ReactNode;
}
