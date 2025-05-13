import { Flex, Input } from 'lessline';
import { Lock } from 'lucide-react';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="large">
      <Input.Password placeholder="请输入内容" />
      <Input.Password placeholder="显示图标" prefix={<Lock />} />
    </Flex>
  );
};

export default Demo;
