import { Flex, Switch } from 'lessline';
import React from 'react';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical">
      <Switch size="small" />
      <Switch />
      <Switch size="large" />
    </Flex>
  );
};

export default Demo;
