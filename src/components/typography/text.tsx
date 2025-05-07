import React from 'react';
import { TextProps } from './types';
import Typography from './typography';

const Text: React.FC<TextProps> = (props) => {
  return <Typography {...props} component="span" />;
};

export default Text;
