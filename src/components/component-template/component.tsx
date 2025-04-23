import { ComponentProps } from './types';
import cn from 'classnames';
import { getClsPrefix } from '../../utils';

const prefix = getClsPrefix('component');

const Component: React.FC<ComponentProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div className={cn(prefix, className)} {...rest}>
      {children}
    </div>
  );
};

export default Component;
