import { Button, useClickAway } from 'lessline';
import { useRef, useState } from 'react';

const Demo: React.FC = () => {
  const ref = useRef<HTMLButtonElement>(null);

  const [count, setCount] = useState(0);

  useClickAway(() => setCount((pre) => pre + 1), [ref]);

  return <Button ref={ref}>Click {count} times</Button>;
};

export default Demo;
