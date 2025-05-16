import { useControllableValue } from 'ahooks';
import cn from 'classnames';
import { forwardRef, useRef, useState, useLayoutEffect } from 'react';
import { InputTextAreaProps } from './types';
import { useForwardedRef } from '../../hooks';
import { getClsPrefix } from '../../utils';
import { Flex } from '../flex';

const clsPrefix = getClsPrefix('input');

const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextAreaProps>(
  (props, ref) => {
    const {
      disabled,
      status = 'default',
      size = 'medium',
      id,
      className,
      style,
      onFocus: propsOnFocus,
      onBlur: propsOnBlur,
      autoHeight,
      showCount,
      maxLength,
      ...rest
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const [textareaRef, setTextareaRef] = useForwardedRef(ref);

    const [value, setValue] = useControllableValue<string>(props, {
      defaultValue: '',
    });

    const [focused, setFocused] = useState(false);

    useLayoutEffect(() => {
      const textarea = textareaRef.current;

      if (autoHeight && textarea) {
        textarea.style.height = '';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [autoHeight, value, textareaRef]);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(true);
      propsOnFocus?.(e);
      textareaRef.current?.focus();
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false);
      propsOnBlur?.(e);
      textareaRef.current?.blur();
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
          console.log(e);

          if (
            document.activeElement === textareaRef.current &&
            e.target !== textareaRef.current
          ) {
            e.preventDefault();
          } else {
            textareaRef.current?.focus();
          }
        }}
        style={style}
        direction="vertical"
      >
        <textarea
          {...rest}
          ref={setTextareaRef}
          disabled={disabled}
          value={value}
          onChange={(e) => setValue(e.target.value, e)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={maxLength}
        />
        {showCount && (
          <div className={`${clsPrefix}__count`}>
            {[value.length, maxLength].filter((v) => v !== undefined).join('/')}
          </div>
        )}
      </Flex>
    );
  },
);

InputTextArea.displayName = 'Input.TextArea';
export default InputTextArea;
