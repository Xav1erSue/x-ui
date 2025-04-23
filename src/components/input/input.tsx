import { InputProps } from './types';
import cn from 'classnames';
import { getClsPrefix } from '../../utils';
import { forwardRef } from 'react';

const prefix = getClsPrefix('input');

const Input = forwardRef<HTMLInputElement | null, InputProps>((props, ref) => {
  const {
    icon,
    disabled,
    size = 'medium',
    id,
    className,
    style,
    ...rest
  } = props;

  return (
    <div
      id={id}
      className={cn(prefix, className, {
        [`${prefix}--${size}`]: size,
        [`${prefix}--disabled`]: disabled,
      })}
      style={style}
    >
      {!!icon && <div className={`${prefix}__icon`}>{icon}</div>}
      <input ref={ref} disabled={disabled} {...rest} />
    </div>
  );
});

export default Input;
