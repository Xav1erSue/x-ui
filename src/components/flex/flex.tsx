import cn from 'classnames';
import { forwardRef } from 'react';
import { FlexProps } from './types';
import { getClsPrefix } from '../../utils';

const prefix = getClsPrefix('flex');

const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    direction = 'horizontal',
    justify = 'start',
    align = 'start',
    wrap = false,
    gap = 'medium',
    children,
    className,
    style,
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      className={cn(prefix, className, {
        [`${prefix}--gap-${gap}`]: typeof gap === 'string',
        [`${prefix}--${direction}`]: direction,
      })}
      style={{
        ...style,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...(typeof gap === 'number' && { gap: `${gap}px` }),
      }}
      {...rest}
    >
      {children}
    </div>
  );
});

Flex.displayName = 'Flex';
export default Flex;
