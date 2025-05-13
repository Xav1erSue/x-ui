import { useToggle } from 'ahooks';
import { Eye, EyeOff, LucideProps } from 'lucide-react';
import { forwardRef } from 'react';
import Input from './input';
import { InputPasswordProps } from './types';
import { getClsPrefix } from '../../utils';

const clsPrefix = getClsPrefix('input');

const InputPassword = forwardRef<HTMLInputElement | null, InputPasswordProps>(
  (props, ref) => {
    const { ...rest } = props;
    const [show, { toggle }] = useToggle();

    const renderIcon = () => {
      const iconProps: LucideProps = {
        className: `${clsPrefix}__toggle`,
        onClick: toggle,
      };

      return show ? <Eye {...iconProps} /> : <EyeOff {...iconProps} />;
    };

    return (
      <Input
        {...rest}
        ref={ref}
        type={show ? 'text' : 'password'}
        suffix={renderIcon()}
      />
    );
  },
);

InputPassword.displayName = 'Input.Password';

export default InputPassword;
