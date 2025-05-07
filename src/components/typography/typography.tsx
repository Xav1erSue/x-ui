import cn from 'classnames';
import { forwardRef } from 'react';
import { BaseTypographyProps } from './types';
import { getClsPrefix } from '../../utils';

const clsPrefix = getClsPrefix('typography');

const Typography = forwardRef<
  HTMLElement,
  BaseTypographyProps<keyof JSX.IntrinsicElements>
>((props, ref) => {
  const {
    size = 'base',
    weight = 'regular',
    component: Component = 'span',
    children,
    className: propClassName,
    ...rest
  } = props;

  const className = cn(clsPrefix, propClassName, {
    [`${clsPrefix}--${size}`]: size,
    [`${clsPrefix}--${weight}`]: weight,
  });

  return (
    // @ts-expect-error: Expression produces a union type that is too complex to represent.
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
});

export default Typography;
