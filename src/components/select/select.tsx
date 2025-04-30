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
import { findNextOption, isSelected, KeyCode } from './helper';
import { useDisplayValue, useSearchOptions } from './hooks';
import OptionList from './option-list';
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
    inputRef.current?.focus();
  };

  const blur = () => {
    setVisible(false);
    setSearch('');
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

  const { displayValue } = useDisplayValue({
    options,
    mode,
    labelInValue,
    value,
    defaultOptions,
  });

  useEffect(() => {
    setHoveredIndex(-1);
  }, [options]);

  const handleChange = (option: OptionType) => {
    const checked = isSelected(mode, labelInValue, value, option);

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
    mode,
    labelInValue,
    value,
    handleChange,
    hoveredIndex,
    setHoveredIndex,
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
        })}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
      >
        <div className={`${clsPrefix}__label`}>
          {mode !== 'single' && (
            <span className={cn(`${clsPrefix}__label__text`)}>
              {displayValue}
            </span>
          )}
          <input
            ref={inputRef}
            autoComplete="off"
            className={`${clsPrefix}__label__input`}
            type="text"
            role="combobox"
            aria-expanded={visible}
            aria-controls={refs.floating.current?.id}
            readOnly={!showSearch}
            value={
              showSearch && visible
                ? search
                : mode === 'single'
                ? displayValue
                : ''
            }
            tabIndex={-1}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={!displayValue ? placeholder : undefined}
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
