import { CSSProperties } from 'react';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 主轴方向
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 主轴对齐方式
   * @default 'start'
   */
  justify?: CSSProperties['justifyContent'];
  /**
   * 交叉轴对齐方式
   * @default 'start'
   */
  align?: CSSProperties['alignItems'];
  /**
   * 间距
   * @default medium
   */
  gap?: 'small' | 'medium' | 'large' | number;
  /**
   * 是否换行
   * @default false
   */
  wrap?: boolean;
}
