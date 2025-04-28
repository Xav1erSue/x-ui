import { getClsPrefix } from '../../utils';
import cn from 'classnames';
import { ButtonProps } from './types';
import { Loading } from '../loading';

const prefix = getClsPrefix('button');

const Button: React.FC<ButtonProps> = (props) => {
  const {
    type = 'default',
    size = 'medium',
    status = 'default',
    block,
    disabled,
    loading,
    className,
    children,
    onClick,
    ...rest
  } = props;

  return (
    <button
      className={cn(prefix, className, {
        [`${prefix}--${type}`]: type,
        [`${prefix}--disabled`]: disabled || loading,
        [`${prefix}--loading`]: loading,
        [`${prefix}--${size}`]: size,
        [`${prefix}--block`]: block,
        [`${prefix}--status-${status}`]: status,
      })}
      onClick={(e) => !disabled && !loading && onClick?.(e)}
      disabled={disabled}
      {...rest}
    >
      {loading ? <Loading /> : null}
      <span className={`${prefix}__label`}>{children}</span>
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
