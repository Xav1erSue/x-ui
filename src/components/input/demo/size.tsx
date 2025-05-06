import { Flex, Input } from 'lessline';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="large">
      <Input size="small" placeholder="请输入内容" />
      <Input size="medium" placeholder="请输入内容" />
      <Input size="large" placeholder="请输入内容" />
    </Flex>
  );
};

export default Demo;
