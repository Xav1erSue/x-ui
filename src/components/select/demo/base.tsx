import { Flex, OptionType, Select } from 'xui';

const options: OptionType[] = [
  { label: '🇸🇦 United Arab Emirates', value: 1, description: '(+971)' },
  {
    label: '🇬🇧 United Kingdom',
    value: 2,
    description: '(+44)',
    disabled: true,
  },
  { label: '🇺🇸 United States', value: 3, description: '(+1)' },
  { label: '🇨🇳 China', value: 4, description: '(+86)' },
  { label: '🇯🇵 Japan', value: 5, description: '(+81)' },
  { label: '🇰🇷 South Korea', value: 6, description: '(+82)' },
  {
    label:
      '超长文案超长文案超长文案超长文案超长文案超长文案超长文案超长文案超长文案超长文案超长文案超长文案超长文案超长文案超长文案',
    value: -1,
  },
];

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="large">
      <Select placeholder="单选" options={options} onChange={console.log} />
      <Select
        placeholder="单选 labelInValue"
        labelInValue
        options={options}
        onChange={console.log}
      />
      <Select
        mode="multiple"
        placeholder="多选"
        options={options}
        onChange={console.log}
      />
      <Select
        mode="multiple"
        labelInValue
        placeholder="多选 labelInValue"
        options={options}
        onChange={console.log}
      />
      <Select
        showSearch
        filterOption
        placeholder="搜索"
        options={options}
        onChange={console.log}
      />
      <Select
        mode="multiple"
        showSearch
        filterOption
        placeholder="搜索多选"
        options={options}
        onChange={console.log}
      />
      <Select
        mode="tags"
        showSearch
        filterOption
        placeholder="标签"
        options={options}
        onChange={console.log}
      />
    </Flex>
  );
};

export default Demo;
