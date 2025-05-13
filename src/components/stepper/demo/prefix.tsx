import { Flex, Stepper } from 'lessline';
import { HelpCircle, Search } from 'lucide-react';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="large">
      <Stepper prefix={<Search />} />
      <Stepper prefix={<Search />} suffix={<HelpCircle />} />
      <Stepper prefix={<Search />} suffix={<HelpCircle />} />
    </Flex>
  );
};

export default Demo;
