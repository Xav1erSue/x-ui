import React from 'react';
import { ParagraphProps } from './types';
import Typography from './typography';

const Paragraph: React.FC<ParagraphProps> = (props) => {
  return <Typography {...props} component="p" />;
};

export default Paragraph;
