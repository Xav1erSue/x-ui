import { Typography } from 'lessline';

const Demo: React.FC = () => {
  return (
    <>
      <Typography component="div" size="lg" weight="bold">
        自定义元素
      </Typography>
      <Typography component="section" size="sm" weight="regular">
        自定义元素
      </Typography>
    </>
  );
};

export default Demo;
