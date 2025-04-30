import { OptionType, } from './types';

export enum KeyCode {
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  Enter = 'Enter',
  Escape = 'Escape',
  Tab = 'Tab',
  Backspace = 'Backspace',
}



/**
 * 查找下一个（或上一个）第一个非禁用态的选项
 */
export const findNextOption = (
  options: OptionType[],
  currentIndex: number,
  keyCode: KeyCode,
) => {
  if (!options.length) return -1;

  let index = currentIndex;
  const total = options.length;

  for (let i = 0; i < total; i++) {
    if (keyCode === KeyCode.ArrowDown) {
      index = (index + 1) % total;
    } else {
      index = (index - 1 + total) % total;
    }
    // 如果不是禁用项，返回
    if (!options[index].disabled) {
      return index;
    }
  }
  // 全部都禁用
  return -1;
};