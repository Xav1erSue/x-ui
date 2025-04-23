import { useRef } from 'react';
import { Button, Flex, Input } from 'xui';

const Demo: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickSetValue = () => {
    if (!inputRef?.current) return;

    inputRef.current.value = 'abcdefg';
  };

  return (
    <>
      <Flex align="center" gap="medium" style={{ marginBottom: 12 }}>
        <Button onClick={() => inputRef?.current?.focus()}>聚焦</Button>
        <Button onClick={() => console.log(inputRef?.current?.value)}>
          获取值
        </Button>
        <Button onClick={handleClickSetValue}>设置值</Button>
      </Flex>
      <Flex direction="vertical" gap="large">
        <Input placeholder="请输入内容" ref={inputRef} />
        <Input value="1234" />
        <Input disabled placeholder="请输入内容" />
        <Input disabled value="这是禁用状态" />
        <Input size="small" placeholder="请输入内容" />
        <Input size="medium" placeholder="请输入内容" />
        <Input size="large" placeholder="请输入内容" />
      </Flex>
    </>
  );
};

export default Demo;
