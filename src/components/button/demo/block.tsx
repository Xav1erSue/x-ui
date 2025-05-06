import { Button, Flex } from 'lessline';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="medium">
      <Button block size="small" type="primary">
        Small Button
      </Button>
      <Button block size="medium" type="primary">
        Medium Button
      </Button>
      <Button block size="large" type="primary">
        Large Button
      </Button>
    </Flex>
  );
};

export default Demo;
