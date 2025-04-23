import SvgIcon from '../../assets/icons/icons.svg';
import { IconProps } from './types';

const Icon: React.FC<IconProps> = (props) => {
  const { color, size = '1.25em', width, height, name, ...rest } = props;
  return (
    <svg
      {...rest}
      fill={color ?? 'currentColor'}
      width={width ?? size}
      height={height ?? size}
    >
      <use xlinkHref={`${SvgIcon}#${name}`}></use>
    </svg>
  );
};
export default Icon;
