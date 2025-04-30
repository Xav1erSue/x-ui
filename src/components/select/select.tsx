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
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { SelectContext } from './context';
import { findNextOption, KeyCode } from './helper';
import { useSelectedOptions, useSearchOptions } from './hooks';
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

  const { options, search, setSearch } = useSearchOptions({
    dataSource,
    filterOption,
  });

  const inputRef = useRef<HTMLInputElement>(null);

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
    if (showSearch) inputRef.current?.focus();
  };

  const blur = () => {
    setVisible(false);
    setSearch('');
    if (showSearch) inputRef.current?.blur();
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
    setSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    propsOnKeyDown?.(e);

    if (!options?.length || disabled) return;

    switch (e.key) {
      case KeyCode.ArrowDown:
      case KeyCode.ArrowUp: {
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
        if (visible) {
          setVisible(false);
        }
        break;
      }

      case KeyCode.Escape: {
        setVisible(false);
        break;
      }

      case KeyCode.Backspace: {
        if (
          showSearch &&
          !search &&
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
    if (mode === 'single' || !selectedOptions.length) return null;
    if (mode === 'multiple') {
      return (
        <span className={`${clsPrefix}__label__text`}>
          {selectedOptions
            ?.map((option) => option.label ?? option.value)
            .join('、')}
        </span>
      );
    } else {
      return (
        <>
          {selectedOptions?.map((option) => (
            <Tag key={option.value} option={option} />
          ))}
        </>
      );
    }
  };

  const getInputValue = () => {
    if (showSearch && visible) return search;
    if (mode === 'single')
      return selectedOptions[0]?.label ?? selectedOptions[0]?.value;
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
        tabIndex={disabled ? -1 : 0}
      >
        <div className={`${clsPrefix}__label`}>
          {renderLabel()}
          <input
            ref={inputRef}
            autoComplete="off"
            className={`${clsPrefix}__label__input`}
            type="text"
            role="combobox"
            aria-expanded={visible}
            readOnly={!showSearch}
            value={getInputValue()}
            tabIndex={-1}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={!selectedOptions.length ? placeholder : undefined}
          />
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
