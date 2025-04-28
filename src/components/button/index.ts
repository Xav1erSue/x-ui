export * from './types';
import InternalButton from './button';
import Submit from './submit';

type Button = typeof InternalButton & {
  Submit: typeof Submit;
};

const Button = InternalButton as Button;
Button.Submit = Submit;

export { Button };
