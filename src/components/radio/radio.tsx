import { useControllableValue } from 'ahooks';
import cn from 'classnames';
import { omit } from 'radash';
import { useId } from 'react';
import { RadioProps } from './types';
import { getClsPrefix } from '../../utils';
import { Flex } from '../flex';
import { Typography } from '../typography';

const clsPrefix = getClsPrefix('radio');

const Radio: React.FC<RadioProps> = (props) => {
  const {
    className,
    style,
    label,
    id: propsId,
    disabled,
    status = 'default',
    ...rest
  } = props;

  const [checked, setChecked] = useControllableValue(props, {
    defaultValue: false,
    defaultValuePropName: 'defaultChecked',
    valuePropName: 'checked',
  });

  const internalId = useId();
  const id = propsId || internalId;

  return (
    <Flex
      gap="medium"
      align="center"
      className={cn(clsPrefix, className, {
        [`${clsPrefix}--disabled`]: disabled,
        [`${clsPrefix}--checked`]: checked,
        [`${clsPrefix}--status-${status}`]: status,
      })}
      style={style}
    >
      <input
        {...omit(rest, ['checked'])}
        className={`${clsPrefix}__input`}
        type="radio"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={() => setChecked(true)}
      />
      <div
        className={`${clsPrefix}__indicator`}
        onClick={(e) => {
          e.stopPropagation();
          setChecked(true);
        }}
      />
      {label && (
        <Typography
          component="label"
          weight="medium"
          htmlFor={id}
          className={`${clsPrefix}__label`}
        >
          {label}
        </Typography>
      )}
    </Flex>
  );
};

export default Radio;
