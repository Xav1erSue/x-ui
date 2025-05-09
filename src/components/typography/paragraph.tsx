import { forwardRef } from 'react';
import { ParagraphProps } from './types';
import Typography from './typography';

const Paragraph = forwardRef<HTMLElement, ParagraphProps>((props, ref) => {
  return <Typography {...props} component="p" ref={ref} />;
});

export default Paragraph;
