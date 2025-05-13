import { Flex, Stepper } from 'lessline';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="large">
      <Stepper />
      <Stepper disabled />
      <Stepper status="success" />
      <Stepper disabled status="success" />
      <Stepper status="error" />
      <Stepper disabled status="error" />
    </Flex>
  );
};

export default Demo;
