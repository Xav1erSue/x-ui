import { createContext } from 'react';
import { SelectContextProps } from './types';

export const SelectContext = createContext<SelectContextProps>({
  mode: 'single',
  labelInValue: false,
  value: [],
  handleChange: () => {},
  hoveredIndex: -1,
  setHoveredIndex: () => {},
});
