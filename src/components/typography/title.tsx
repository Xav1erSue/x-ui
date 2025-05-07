import cn from 'classnames';
import { forwardRef } from 'react';
import { TitleProps } from './types';
import { getClsPrefix } from '../../utils';

const clsPrefix = getClsPrefix('typography');

const Title = forwardRef<HTMLHeadingElement, TitleProps>((props, ref) => {
  const { level = 1, children, className: propClassName, ...rest } = props;

  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  const className = cn(propClassName, {
    [`${clsPrefix}--4xl`]: level === 1,
    [`${clsPrefix}--3xl`]: level === 2,
    [`${clsPrefix}--2xl`]: level === 3,
    [`${clsPrefix}--xl`]: level === 4,
    [`${clsPrefix}--lg`]: level === 5,
  });

  return (
    // @ts-expect-error: Expression produces a union type that is too complex to represent.
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
});

export default Title;
