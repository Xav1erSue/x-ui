import { Button, Flex } from 'xui';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="large">
      <Flex align="center" gap="medium" wrap>
        <Button>Default Button</Button>
        <Button loading>Default Button</Button>
        <Button disabled>Default Button</Button>
        <Button status="success">Success Button</Button>
        <Button status="error">Error Button</Button>
      </Flex>
      <Flex align="center" gap="medium" wrap>
        <Button type="primary">Primary Button</Button>
        <Button type="primary" loading>
          Primary Button
        </Button>
        <Button type="primary" disabled>
          Primary Button
        </Button>
        <Button type="primary" status="success">
          Success Button
        </Button>
        <Button type="primary" status="error">
          Error Button
        </Button>
      </Flex>
      <Flex align="center" gap="medium" wrap>
        <Button type="ghost">Ghost Button</Button>
        <Button type="ghost" loading>
          Ghost Button
        </Button>
        <Button type="ghost" disabled>
          Ghost Button
        </Button>
        <Button type="ghost" status="success">
          Success Button
        </Button>
        <Button type="ghost" status="error">
          Error Button
        </Button>
      </Flex>
      <Flex align="center" gap="medium" wrap>
        <Button type="link">Link Button</Button>
        <Button type="link" loading>
          Link Button
        </Button>
        <Button type="link" disabled>
          Link Button
        </Button>
        <Button type="link" status="success">
          Success Button
        </Button>
        <Button type="link" status="error">
          Error Button
        </Button>
      </Flex>
    </Flex>
  );
};

export default Demo;
