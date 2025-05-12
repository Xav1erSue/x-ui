import { forwardRef } from 'react';
import { TextProps } from './types';
import Typography from './typography';

const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  return <Typography {...props} component="span" ref={ref} />;
});

export default Text;
