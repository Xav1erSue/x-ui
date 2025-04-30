import { createContext } from 'react';
import { SelectContextProps } from './types';

export const SelectContext = createContext<SelectContextProps>({
  handleChange: () => { },
  hoveredIndex: -1,
  setHoveredIndex: () => { },
  isSelected: () => false,
});
