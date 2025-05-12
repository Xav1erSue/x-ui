import cn from 'classnames';
import { forwardRef } from 'react';
import { LinkProps } from './types';
import Typography from './typography';
import { getClsPrefix } from '../../utils';

const clsPrefix = getClsPrefix('typography-link');

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { disabled, className, onClick, ...rest } = props;

  return (
    <Typography
      {...rest}
      component="a"
      ref={ref}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e as React.MouseEvent<HTMLAnchorElement, MouseEvent>);
      }}
      className={cn(className, clsPrefix, {
        [`${clsPrefix}--disabled`]: disabled,
      })}
    />
  );
});

export default Link;
