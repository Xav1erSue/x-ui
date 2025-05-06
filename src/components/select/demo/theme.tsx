import { Flex, OptionType, Select } from 'lessline';

const options: OptionType[] = [
  { label: '🇸🇦 United Arab Emirates', value: 1, description: '(+971)' },
  {
    label: '🇬🇧 United Kingdom',
    value: 2,
    description: '(+44)',
    disabled: true,
  },
  { label: '🇺🇸 United States', value: 3, description: '(+1)' },
];

const Demo: React.FC = () => {
  return (
    <Flex direction="vertical" gap="large">
      <Select status="default" placeholder="请选择" options={options} />
      <Select status="error" placeholder="请选择" options={options} />
      <Select status="success" placeholder="请选择" options={options} />
    </Flex>
  );
};

export default Demo;
