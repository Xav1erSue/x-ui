import { Icon } from '../icon';
import { LoadingProps } from './types';
import { getClsPrefix } from '../../utils';

const prefix = getClsPrefix('loading');

const Loading: React.FC<LoadingProps> = () => {
  return <Icon className={prefix} name="loading" />;
};

export default Loading;
