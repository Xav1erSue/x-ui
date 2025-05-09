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

export interface BaseTypographyProps<C extends keyof JSX.IntrinsicElements>
  extends React.HTMLAttributes<HTMLElement> {
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

export type ParagraphProps = OmitWithTypes<
  BaseTypographyProps<'p'>,
  'component'
>;

export type TextProps = OmitWithTypes<BaseTypographyProps<'span'>, 'component'>;

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5;
}
