import { useControllableValue } from 'ahooks';
import cn from 'classnames';
import { Minus, Plus } from 'lucide-react';
import { omit } from 'radash';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { StepperProps } from './types';
import { useForwardedRef } from '../../hooks';
import { getClsPrefix } from '../../utils';
import { Flex } from '../flex';

const clsPrefix = getClsPrefix('stepper');

const Stepper = forwardRef<HTMLInputElement, StepperProps>((props, ref) => {
  const {
    disabled,
    status = 'default',
    size = 'medium',
    id,
    className,
    style,
    prefix,
    step = 1,
    precision = 0,
    min,
    max,
    suffix,
    rounded,
    onFocus: propsOnFocus,
    onBlur: propsOnBlur,
    ...rest
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [inputRef, setInputRef] = useForwardedRef(ref);

  const [value, setValue] = useControllableValue<number>(props, {
    defaultValue: 0,
  });

  const [inputValue, setInputValue] = useState<string>(
    value.toFixed(precision),
  );

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
    triggerChange();
  };

  const triggerChange = () => {
    const number = Number(inputValue);
    if (Number.isNaN(number)) {
      setInputValue(value.toFixed(precision));
    } else {
      let finalNumber = number;
      if (min !== undefined && number < min) {
        finalNumber = min;
      }
      if (max !== undefined && number > max) {
        finalNumber = max;
      }
      setValue(finalNumber);
      setInputValue(finalNumber.toFixed(precision));
    }
  };

  useEffect(() => {
    setInputValue(value.toFixed(precision));
  }, [value, precision]);

  const canMinus = !disabled && (min === undefined || value - step >= min);
  const canPlus = !disabled && (max === undefined || value + step <= max);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (canPlus) setValue(value + step);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (canMinus) setValue(value - step);
        break;
      case 'Enter':
        triggerChange();
        break;
      case 'Escape':
        setInputValue(value.toFixed(precision));
        break;
    }
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
      onKeyDown={handleKeyDown}
    >
      {!!prefix && <div className={`${clsPrefix}__prefix`}>{prefix}</div>}
      <input
        {...omit(rest, ['value', 'defaultValue', 'onChange'])}
        ref={setInputRef}
        disabled={disabled}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {!!suffix && <div className={`${clsPrefix}__suffix`}>{suffix}</div>}
      <div className={`${clsPrefix}__handler`}>
        <div
          className={cn(`${clsPrefix}__handler__item`, {
            [`${clsPrefix}__handler__item--disabled`]: !canMinus,
            [`${clsPrefix}__handler__item--rounded`]: rounded,
          })}
          onClick={() => canMinus && setValue(value - step)}
        >
          <Minus />
        </div>
        <div
          className={cn(`${clsPrefix}__handler__item`, {
            [`${clsPrefix}__handler__item--disabled`]: !canPlus,
            [`${clsPrefix}__handler__item--rounded`]: rounded,
          })}
          onClick={() => canPlus && setValue(value + step)}
        >
          <Plus />
        </div>
      </div>
    </Flex>
  );
});

Stepper.displayName = 'Stepper';
export default Stepper;
