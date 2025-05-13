import { Flex } from 'lessline';

const Demo: React.FC = () => {
  return (
    <Flex gap={32}>
      <div style={{ width: 100, height: 100, backgroundColor: 'red' }} />
      <div style={{ width: 100, height: 100, backgroundColor: 'red' }} />
      <div style={{ width: 100, height: 100, backgroundColor: 'red' }} />
      <div style={{ width: 100, height: 100, backgroundColor: 'red' }} />
    </Flex>
  );
};

export default Demo;
