import InternalInput from './input';
import InternalInputPassword from './password';
import InternalInputTextArea from './textarea';

const Input = InternalInput as typeof InternalInput & {
  Password: typeof InternalInputPassword;
  TextArea: typeof InternalInputTextArea;
};

Input.Password = InternalInputPassword;
Input.TextArea = InternalInputTextArea;

export { Input };
export * from './types';
