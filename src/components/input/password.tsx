import { InputPasswordProps } from './types';
import { forwardRef } from 'react';
import Input from './input';

const InputPassword = forwardRef<HTMLInputElement | null, InputPasswordProps>(
  (props, ref) => {
    return <Input {...props} ref={ref} type="password" />;
  },
);

export default InputPassword;
