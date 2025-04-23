import { Button, Flex } from 'xui';

const Demo: React.FC = () => {
  return (
    <Flex gap="medium" align="center">
      <Button size="small">Small Button</Button>
      <Button size="medium">Medium Button</Button>
      <Button size="large">Large Button</Button>
    </Flex>
  );
};

export default Demo;
