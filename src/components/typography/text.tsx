import { forwardRef } from 'react';
import { TextProps } from './types';
import Typography from './typography';

const Text = forwardRef<HTMLElement, TextProps>((props, ref) => {
  return <Typography {...props} component="span" ref={ref} />;
});

export default Text;
