import InternalInput from './input';
import InternalInputPassword from './password';

const Input = InternalInput as typeof InternalInput & {
  Password: typeof InternalInputPassword;
};

Input.Password = InternalInputPassword;

export { Input };
export * from './types';
