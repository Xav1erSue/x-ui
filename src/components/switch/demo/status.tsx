import { Flex, Switch } from 'lessline';
import React from 'react';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="medium">
      <Switch />
      <Switch status="error" />
      <Switch status="success" />
      <Switch disabled />
      <Switch disabled checked />
      <Switch disabled checked status="error" />
      <Switch disabled checked status="success" />
    </Flex>
  );
};

export default Demo;
