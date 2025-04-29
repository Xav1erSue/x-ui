import { useClickAway } from '../../hooks';
import { getClsPrefix } from '../../utils';
import {
  OptionType,
  RawValueType,
  SelectContextProps,
  SelectProps,
  ValueType,
} from './types';
import { omit } from 'radash';
import cn from 'classnames';
import {
  useFloating,
  autoUpdate,
  flip,
  offset,
  size,
} from '@floating-ui/react';
import { useState } from 'react';
import { useDisplayValue } from './hooks';
import { ChevronsUpDown } from 'lucide-react';
import { isSelected, KeyCode } from './helper';
import { SelectContext } from './context';
import OptionList from './option-list';
import { useControllableValue } from 'ahooks';

const clsPrefix = getClsPrefix('select');

const Select: React.FC<SelectProps> = (props) => {
  const {
    mode = 'single',
    size: propsSize = 'medium',
    status = 'default',
    placeholder,
    options,
    defaultOptions,
    labelInValue = false,
    disabled,
    onKeyDown: propsOnKeyDown,
    ...rest
  } = props;

  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

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

  useClickAway(() => setVisible(false), [
    refs.reference,
    refs.floating,
  ] as Array<React.MutableRefObject<HTMLElement>>);

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

  const handleChange = (option: OptionType) => {
    const checked = isSelected(mode, labelInValue, value, option);

    if (mode === 'single') {
      setValue(labelInValue ? option : option.value);
      // 单选模式下，选中后自动关闭弹窗
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
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    propsOnKeyDown?.(e);

    if (!options?.length) return;

    switch (e.key) {
      case KeyCode.ArrowDown: {
        e.preventDefault();
        if (hoveredIndex === options.length - 1) {
          setHoveredIndex(0);
        } else {
          setHoveredIndex(hoveredIndex + 1);
        }
        break;
      }

      case KeyCode.ArrowUp: {
        e.preventDefault();
        if (hoveredIndex === 0) {
          setHoveredIndex(options?.length - 1);
        } else {
          setHoveredIndex(hoveredIndex - 1);
        }
        break;
      }

      case KeyCode.Enter: {
        if (visible) {
          handleChange(options[hoveredIndex]);
          setVisible(false);
        } else {
          setVisible(true);
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
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!disabled) {
      setVisible(true);
    }
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
        <div
          className={cn(`${clsPrefix}__label`, {
            [`${clsPrefix}__label--placeholder`]: !displayValue,
          })}
        >
          {displayValue || placeholder}
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
};

Select.displayName = 'Select';
export default Select;
