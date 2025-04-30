import cn from 'classnames';
import { LoaderCircle } from 'lucide-react';
import { LoadingProps } from './types';
import { getClsPrefix } from '../../utils';

const prefix = getClsPrefix('loading');

const Loading: React.FC<LoadingProps> = (props) => {
  const { size = 'medium' } = props;
  return (
    <LoaderCircle className={cn(prefix, { [`${prefix}--${size}`]: size })} />
  );
};

Loading.displayName = 'Loading';
export default Loading;
