import { Flex, Switch } from 'lessline';
import React from 'react';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="medium">
      <Switch />
      <Switch status="error" />
      <Switch status="success" />
      <Switch checked />
      <Switch checked status="error" />
      <Switch checked status="success" />
      <Switch disabled />
      <Switch disabled status="error" />
      <Switch disabled status="success" />
    </Flex>
  );
};

export default Demo;
