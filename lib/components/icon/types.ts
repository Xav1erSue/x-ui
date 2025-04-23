import { BaseComponentProps } from '../../types';

export interface IconProps extends BaseComponentProps {
  name: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
}
