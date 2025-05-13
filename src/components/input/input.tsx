import { useControllableValue } from 'ahooks';
import cn from 'classnames';
import { X } from 'lucide-react';
import { omit } from 'radash';
import { forwardRef, useRef, useState } from 'react';
import { InputProps } from './types';
import { useForwardedRef } from '../../hooks';
import { getClsPrefix } from '../../utils';
import { Flex } from '../flex';

const clsPrefix = getClsPrefix('input');

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    disabled,
    status = 'default',
    size = 'medium',
    id,
    className,
    style,
    prefix,
    suffix,
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
      className={cn(clsPrefix, className, {
        [`${clsPrefix}--${size}`]: size,
        [`${clsPrefix}--disabled`]: disabled,
        [`${clsPrefix}--status-${status}`]: status,
        [`${clsPrefix}--focused`]: focused,
      })}
      onMouseDown={(e) => {
        if (focused) {
          e.preventDefault();
        } else {
          inputRef.current?.focus();
        }
      }}
      style={style}
      align="center"
      justify="space-between"
      gap={12}
    >
      {!!prefix && <div className={`${clsPrefix}__prefix`}>{prefix}</div>}
      <input
        {...omit(rest, ['value', 'defaultValue', 'onChange'])}
        ref={setInputRef}
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value, e)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {allowClear && value ? (
        <X className={`${clsPrefix}__clear`} onClick={() => setValue('')} />
      ) : null}
      {!!suffix && <div className={`${clsPrefix}__suffix`}>{suffix}</div>}
    </Flex>
  );
});

Input.displayName = 'Input';
export default Input;
