import { Form, Input } from 'xui';

const Demo: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item name="name" label="姓名" required>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default Demo;
