import { OmitWithTypes } from '../../types';

export type TypographySize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';

export type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface BaseTypographyProps<
  C extends keyof JSX.IntrinsicElements,
  T extends HTMLElement,
> extends React.HTMLAttributes<T> {
  /**
   * 自定义元素，如 `div`、`span` 等
   * @type "keyof JSX.IntrinsicElements"
   */
  component?: C;
  /**
   * 字体大小
   * @default 'base'
   */
  size?: TypographySize;
  /**
   * 字体权重
   * @default 'regular'
   */
  weight?: TypographyWeight;
}

export interface ParagraphProps
  extends OmitWithTypes<
      BaseTypographyProps<'p', HTMLParagraphElement>,
      'component'
    >,
    React.HTMLAttributes<HTMLParagraphElement> {}

export interface TextProps
  extends OmitWithTypes<
      BaseTypographyProps<'span', HTMLSpanElement>,
      'component'
    >,
    React.HTMLAttributes<HTMLSpanElement> {}

export interface TitleProps
  extends OmitWithTypes<
      BaseTypographyProps<'h1', HTMLHeadingElement>,
      'component'
    >,
    React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5;
}

export interface LinkProps
  extends OmitWithTypes<
      BaseTypographyProps<'a', HTMLAnchorElement>,
      'component'
    >,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
}
