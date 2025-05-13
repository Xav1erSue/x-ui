import { Button, Flex, useForwardedRef } from 'lessline';
import { forwardRef, useEffect, useRef } from 'react';

const Child = forwardRef<HTMLInputElement>((_, ref) => {
  const [inputRef, setInputRef] = useForwardedRef(ref);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return <input ref={setInputRef} />;
});

const Parent: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Flex direction="vertical" gap={16}>
      <Button onClick={() => ref.current?.focus()}>Click to focus</Button>
      <Child ref={ref} />
    </Flex>
  );
};

export default Parent;
