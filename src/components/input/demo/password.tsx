import { Flex, Input } from 'lessline';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="large">
      <Input.Password placeholder="请输入内容" />
    </Flex>
  );
};

export default Demo;
