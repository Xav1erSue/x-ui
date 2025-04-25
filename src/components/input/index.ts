import InternalInput from './input';
import InternalInputPassword from './password';

export * from './types';

const Input = InternalInput as typeof InternalInput & {
  Password: typeof InternalInputPassword;
};

Input.Password = InternalInputPassword;

export { Input };
