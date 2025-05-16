import { Flex, Radio } from 'lessline';
import React from 'react';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="medium">
      <Radio status="error" label="单选框" />
      <Radio status="error" label="默认勾选" defaultChecked />
      <Radio status="error" label="禁用" disabled />
      <Radio status="error" label="禁用且勾选" defaultChecked disabled />
      <Radio status="success" label="单选框" />
      <Radio status="success" label="默认勾选" defaultChecked />
      <Radio status="success" label="禁用" disabled />
      <Radio status="success" label="禁用且勾选" defaultChecked disabled />
    </Flex>
  );
};

export default Demo;
