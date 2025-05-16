import { Flex, Radio } from 'lessline';
import React from 'react';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="medium">
      <Radio label="单选框" />
      <Radio label="默认勾选" defaultChecked />
      <Radio label="禁用" disabled />
      <Radio label="禁用且勾选" defaultChecked disabled />
    </Flex>
  );
};

export default Demo;
