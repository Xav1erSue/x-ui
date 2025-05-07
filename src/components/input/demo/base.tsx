import { Flex, Input } from 'lessline';
import { useRef } from 'react';

const Demo: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex direction="vertical" gap="large">
      <Input ref={inputRef} placeholder="请输入内容" />
      <Input placeholder="限制最大长度为 10" maxLength={10} />
      <Input placeholder="仅支持输入数字" type="number" />
      <Input placeholder="显示清除按钮" allowClear />
    </Flex>
  );
};

export default Demo;
