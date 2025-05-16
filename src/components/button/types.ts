import { ButtonHTMLAttributes } from 'react';
import { OmitWithTypes } from '../../types/utils';
import { FormItemBaseProperty } from '../form/types';

export interface ButtonProps
  extends OmitWithTypes<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    FormItemBaseProperty {
  /**
   * 按钮类型
   * @default 'default'
   */
  type?: 'default' | 'primary' | 'ghost' | 'link';
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
}

export interface SubmitProps
  extends OmitWithTypes<ButtonProps, 'loading' | 'onClick'> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}
