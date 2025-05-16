import { useControllableValue } from 'ahooks';
import cn from 'classnames';
import { omit } from 'radash';
import { SwitchProps } from './types';
import { getClsPrefix } from '../../utils';

const clsPrefix = getClsPrefix('switch');

const Switch: React.FC<SwitchProps> = (props) => {
  const {
    className,
    disabled,
    size = 'medium',
    status = 'default',
    ...rest
  } = props;

  const [checked, setChecked] = useControllableValue(props, {
    valuePropName: 'checked',
    defaultValuePropName: 'defaultChecked',
    defaultValue: false,
  });

  return (
    <div
      {...omit(rest, ['checked', 'defaultChecked', 'onChange'])}
      className={cn(clsPrefix, className, {
        [`${clsPrefix}--disabled`]: disabled,
        [`${clsPrefix}--${size}`]: size,
        [`${clsPrefix}--status-${status}`]: status,
        [`${clsPrefix}--checked`]: checked,
      })}
      onClick={() => setChecked(!checked)}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
    >
      <div className={`${clsPrefix}__indicator`} />
    </div>
  );
};

export default Switch;
