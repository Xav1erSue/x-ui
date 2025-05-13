import { Flex, Input } from 'lessline';

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="large">
      <Input.TextArea placeholder="请输入内容" />
      <Input.TextArea disabled placeholder="禁用输入" />
      <Input.TextArea autoHeight placeholder="自动调整高度" />
      <Input.TextArea autoHeight showCount placeholder="显示计数" />
      <Input.TextArea
        autoHeight
        showCount
        placeholder="最大字数"
        maxLength={100}
      />
      <Input.TextArea status="success" placeholder="请输入内容" />
      <Input.TextArea status="error" placeholder="请输入内容" />
    </Flex>
  );
};

export default Demo;
