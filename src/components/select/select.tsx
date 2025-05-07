import {
  useFloating,
  autoUpdate,
  flip,
  offset,
  size,
} from '@floating-ui/react';
import { useControllableValue } from 'ahooks';
import cn from 'classnames';
import { ChevronsUpDown } from 'lucide-react';
import { omit } from 'radash';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { SelectContext } from './context';
import { findNextOption, KeyCode } from './helper';
import { useSelectedOptions, useSearchOptions, useInput } from './hooks';
import OptionList from './option-list';
import Tag from './tag';
import {
  OptionType,
  RawValueType,
  SelectContextProps,
  SelectProps,
  SelectRef,
  ValueType,
} from './types';
import { useClickAway } from '../../hooks';
import { getClsPrefix } from '../../utils';

const clsPrefix = getClsPrefix('select');

const Select = forwardRef<SelectRef, SelectProps>((props, ref) => {
  const {
    mode = 'single',
    size: propsSize = 'medium',
    status = 'default',
    placeholder,
    options: dataSource,
    defaultOptions,
    labelInValue = false,
    disabled,
    showSearch = false,
    filterOption = false,
    onKeyDown: propsOnKeyDown,
    ...rest
  } = props;

  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const { inputRef, measureRef, inputValue, setInputValue, inputWidth } =
    useInput();

  const { options } = useSearchOptions({
    inputValue,
    dataSource,
    filterOption,
  });

  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      flip(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
      offset(15),
    ],
  });

  const focus = () => {
    setVisible(true);
    inputRef.current?.focus();
  };

  const blur = () => {
    setVisible(false);
    setInputValue('');
    inputRef.current?.blur();
  };

  useImperativeHandle(ref, () => ({
    focus,
    blur,
  }));

  useClickAway(() => blur(), [refs.reference, refs.floating] as Array<
    React.MutableRefObject<HTMLElement>
  >);

  const [value, setValue] = useControllableValue<ValueType>(props);
  const [visible, setVisible] = useControllableValue<boolean>(props, {
    valuePropName: 'visible',
    defaultValuePropName: 'defaultVisible',
    trigger: 'onVisibleChange',
  });

  const { selectedOptions } = useSelectedOptions({
    options,
    mode,
    labelInValue,
    value,
    defaultOptions,
  });

  useEffect(() => {
    setHoveredIndex(-1);
  }, [options]);

  const isSelected = (option: OptionType) => {
    if (mode === 'single') {
      if (labelInValue) {
        return value === option;
      } else {
        return value === option.value;
      }
    } else {
      if (labelInValue) {
        return (value as OptionType[])?.some((v) => v.value === option.value);
      } else {
        return (value as RawValueType[])?.some((v) => v === option.value);
      }
    }
  };

  const handleChange = (option: OptionType) => {
    const checked = isSelected(option);

    if (mode === 'single') {
      setValue(labelInValue ? option : option.value);
      setVisible(false);
    } else {
      if (labelInValue) {
        const newValue = !checked
          ? [...((value as OptionType[]) ?? []), option]
          : ((value as OptionType[]) ?? []).filter(
              (v) => v.value !== option.value,
            );
        setValue(newValue);
      } else {
        const newValue = !checked
          ? [...((value as RawValueType[]) ?? []), option.value]
          : ((value as RawValueType[]) ?? []).filter((v) => v !== option.value);

        setValue(newValue);
      }
    }
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    propsOnKeyDown?.(e);

    if (!options?.length || disabled) return;

    switch (e.key) {
      case KeyCode.ArrowDown:
      case KeyCode.ArrowUp: {
        if (!visible) break;
        e.preventDefault();
        const nextIndex = findNextOption(options, hoveredIndex, e.key);
        setHoveredIndex(nextIndex);
        break;
      }

      case KeyCode.Enter: {
        if (visible) {
          handleChange(options[hoveredIndex]);

          if (mode === 'single') setVisible(false);
        } else {
          focus();
        }
        break;
      }

      case KeyCode.Tab: {
        if (!visible) break;
        setVisible(false);
        break;
      }

      case KeyCode.Escape: {
        if (!visible) break;
        setVisible(false);
        setInputValue('');
        break;
      }

      case KeyCode.Backspace: {
        if (
          showSearch &&
          !inputValue &&
          mode !== 'single' &&
          Array.isArray(value)
        ) {
          const newValue = value.slice(0, -1);
          setValue(newValue);
        }
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!disabled) focus();
  };

  const contextValue: SelectContextProps = {
    handleChange,
    hoveredIndex,
    setHoveredIndex,
    isSelected,
  };

  const renderLabel = () => {
    if (!selectedOptions.length) return null;

    if (mode === 'single') {
      if (showSearch && visible) return null;

      return (
        <span>{selectedOptions[0]?.label ?? selectedOptions[0]?.value}</span>
      );
    }
    if (mode === 'multiple') {
      return selectedOptions?.map((option, index) => (
        <span
          className={cn(`${clsPrefix}__label__selected`, {
            [`${clsPrefix}__label__selected--last`]:
              index === selectedOptions.length - 1,
          })}
          key={option.value}
        >
          {option.label ?? option.value}
        </span>
      ));
    } else {
      return selectedOptions?.map((option) => (
        <Tag key={option.value} option={option} />
      ));
    }
  };

  return (
    <SelectContext.Provider value={contextValue}>
      <div
        {...omit(rest, [
          'value',
          'defaultValue',
          'onChange',
          'visible',
          'defaultVisible',
          'onVisibleChange',
        ])}
        ref={refs.setReference}
        className={cn(clsPrefix, {
          [`${clsPrefix}--disabled`]: disabled,
          [`${clsPrefix}--${propsSize}`]: propsSize,
          [`${clsPrefix}--status-${status}`]: status,
          [`${clsPrefix}--focused`]: visible,
          [`${clsPrefix}--tag`]: mode === 'tags',
          [`${clsPrefix}--has-value`]: selectedOptions.length,
        })}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div className={`${clsPrefix}__label`}>
          <span
            hidden={!!selectedOptions.length || !!inputValue}
            className={`${clsPrefix}__label__placeholder`}
          >
            {placeholder}
          </span>
          {renderLabel()}
          <input
            ref={inputRef}
            autoComplete="off"
            className={`${clsPrefix}__label__input`}
            style={{ width: inputWidth }}
            type="text"
            role="combobox"
            aria-expanded={visible}
            readOnly={!showSearch || !visible}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => blur()}
          />
          {/* 用于动态调整输入框宽度 */}
          <span
            ref={measureRef}
            className={`${clsPrefix}__label__input`}
            style={{ visibility: 'hidden', position: 'absolute' }}
            aria-hidden
          >
            {inputValue}&nbsp;
          </span>
        </div>
        <ChevronsUpDown className={`${clsPrefix}__icon`} />
      </div>
      <OptionList
        ref={refs.setFloating}
        style={floatingStyles}
        visible={visible}
        options={options || []}
      />
    </SelectContext.Provider>
  );
});

Select.displayName = 'Select';
export default Select;
