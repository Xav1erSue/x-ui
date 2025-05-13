import { Flex, Stepper } from 'lessline';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="large">
      <Stepper size="small" />
      <Stepper size="medium" />
      <Stepper size="large" />
    </Flex>
  );
};

export default Demo;
