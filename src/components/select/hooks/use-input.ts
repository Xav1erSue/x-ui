import { useRef, useState, useLayoutEffect } from 'react';

export const useInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  const [inputValue, setInputValue] = useState<string>('');

  const [inputWidth, setInputWidth] = useState(0);


  useLayoutEffect(() => {
    setInputWidth(measureRef.current?.offsetWidth ?? 0);
  }, [inputValue]);

  return { inputRef, measureRef, inputValue, setInputValue, inputWidth };
};
