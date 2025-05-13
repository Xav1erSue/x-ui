import { Flex, Input } from 'lessline';
import { HelpCircle, Search } from 'lucide-react';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="large">
      <Input placeholder="请输入内容" prefix={<Search />} />
      <Input
        placeholder="请输入内容"
        prefix={<Search />}
        suffix={<HelpCircle />}
      />
      <Input
        defaultValue="右侧显示清除按钮"
        placeholder="请输入内容"
        prefix={<Search />}
        suffix={<HelpCircle />}
        allowClear
      />
    </Flex>
  );
};

export default Demo;
