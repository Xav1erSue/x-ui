import SvgIcon from '../../assets/icons/icons.svg';
import { IconProps } from './types';

const Icon: React.FC<IconProps> = (props) => {
  const {
    fill = 'currentColor',
    size = '1.25em',
    width,
    height,
    name,
    ...rest
  } = props;

  return (
    <svg {...rest} fill={fill} width={width ?? size} height={height ?? size}>
      <use xlinkHref={`${SvgIcon}#${name}`}></use>
    </svg>
  );
};
export default Icon;
