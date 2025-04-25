import { Flex, Input } from 'xui';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="large">
      <Input placeholder="请输入内容" />
      <Input disabled placeholder="禁用输入" />
      <Input status="success" placeholder="请输入内容" />
      <Input disabled status="success" placeholder="禁用输入" />
      <Input status="error" placeholder="请输入内容" />
      <Input disabled status="error" placeholder="禁用输入" />
    </Flex>
  );
};

export default Demo;
