import { Flex, OptionType, Select } from 'xui';

const options: OptionType[] = [
  { label: '张三', value: 1, description: '没什么本事的' },
  { label: '李四', value: 2 },
  { label: '王五', value: 3 },
];

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="large">
      <Select placeholder="请选择" options={options} onChange={console.log} />
      <Select
        placeholder="请选择"
        labelInValue
        options={options}
        onChange={console.log}
      />
      <Select
        mode="multiple"
        placeholder="请选择"
        options={options}
        onChange={console.log}
      />
      <Select
        mode="multiple"
        labelInValue
        placeholder="请选择"
        options={options}
        onChange={console.log}
      />
    </Flex>
  );
};

export default Demo;
