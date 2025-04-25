import { InputProps } from './types';
import cn from 'classnames';
import { useForwardedRef } from '../../hooks';
import { getClsPrefix } from '../../utils';
import { forwardRef, useRef, useState } from 'react';
import { useControllableValue } from 'ahooks';
import { Flex } from '../flex';
import { X } from 'lucide-react';

const prefix = getClsPrefix('input');

const Input = forwardRef<HTMLInputElement | null, InputProps>((props, ref) => {
  const {
    icon,
    disabled,
    status = 'default',
    size = 'medium',
    id,
    className,
    style,
    allowClear = false,
    onFocus: propsOnFocus,
    onBlur: propsOnBlur,
    ...rest
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [inputRef, setInputRef] = useForwardedRef(ref);

  const [value, setValue] = useControllableValue<string>(props, {
    defaultValue: '',
  });

  const [focused, setFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    propsOnFocus?.(e);
    inputRef.current?.focus();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    propsOnBlur?.(e);
    inputRef.current?.blur();
  };

  return (
    <Flex
      id={id}
      ref={containerRef}
      className={cn(prefix, className, {
        [`${prefix}--${size}`]: size,
        [`${prefix}--disabled`]: disabled,
        [`${prefix}--status-${status}`]: status,
        [`${prefix}--focused`]: focused,
      })}
      onClick={() => inputRef.current?.focus()}
      style={style}
      align="center"
      justify="space-between"
      gap={size}
      tabIndex={-1}
    >
      {!!icon && <div className={`${prefix}__icon`}>{icon}</div>}
      <input
        {...rest}
        ref={setInputRef}
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value, e)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {allowClear && value ? (
        <X className={`${prefix}__clear`} onClick={() => setValue('')} />
      ) : null}
    </Flex>
  );
});

export default Input;
