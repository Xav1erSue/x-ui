import { KeyRound, Mail, User } from 'lucide-react';
import { Button, Form, Input } from 'xui';

const sleep = (time: number) => new Promise((res) => setTimeout(res, time));

const Demo: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const values = await form.validateFields();
    await sleep(1000);
    console.log(values);
  };

  return (
    <Form form={form}>
      <Form.Item
        name="account"
        label="账号"
        required
        rules={[{ required: true, message: '请输入账号' }]}
      >
        <Input prefix={<User />} />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        required
        extra="需要同时包含小写字母、大写字母和数字"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password prefix={<KeyRound />} />
      </Form.Item>
      <Form.Item name="email" label="邮箱" cornerHint="（可选）">
        <Input prefix={<Mail />} />
      </Form.Item>

      <Button.Submit type="primary" block onClick={handleSubmit}>
        提交
      </Button.Submit>
    </Form>
  );
};

export default Demo;
