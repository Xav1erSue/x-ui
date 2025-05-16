import { useControllableValue } from 'ahooks';
import cn from 'classnames';
import { omit } from 'radash';
import Radio from './radio';
import { RadioGroupProps } from './types';
import { getClsPrefix } from '../../utils';

const clsPrefix = getClsPrefix('radio-group');

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const { options, className, ...rest } = props;

  const [value, setValue] = useControllableValue(props);

  return (
    <div
      {...omit(rest, ['value', 'defaultValue', 'onChange'])}
      className={cn(clsPrefix, className)}
    >
      {options?.map((option) => {
        const key = typeof option === 'object' ? option.value : option;
        const label = typeof option === 'object' ? option.label : option;
        return (
          <Radio
            key={`${key}`}
            label={label}
            checked={value === key}
            onChange={() => setValue(key)}
          />
        );
      })}
    </div>
  );
};

export default RadioGroup;
