import { Flex, Radio } from 'lessline';
import React from 'react';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="medium">
      <Radio.Group options={['aa', 'bb', 'cc']} />
      <Radio.Group options={[1, 2, 3]} />
      <Radio.Group
        options={[
          { label: 'aa', value: 1 },
          { label: 'bb', value: 2 },
          { label: 'cc', value: 3 },
        ]}
      />
    </Flex>
  );
};

export default Demo;
