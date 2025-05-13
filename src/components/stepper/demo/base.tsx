import { Flex, Stepper } from 'lessline';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="large">
      <Stepper />
      <Stepper rounded />
      <Stepper min={1} max={10} />
      <Stepper step={2} />
      <Stepper min={1} max={10} step={2} />
    </Flex>
  );
};

export default Demo;
