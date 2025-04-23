import { BaseComponentProps } from 'lib/types';

export interface ButtonProps extends BaseComponentProps {
  /**
   * 按钮类型
   * @default 'default'
   */
  type?: 'default' | 'primary';
  /**
   * 按钮尺寸
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否块级元素
   * @default false
   */
  block?: boolean;
  /**
   * 是否显示加载状态
   * @default false
   */
  loading?: boolean;
  /**
   * 按钮内容
   */
  children: React.ReactNode;
  /**
   * 按钮状态
   * @default 'default'
   */
  status?: 'default' | 'success' | 'error';
}
