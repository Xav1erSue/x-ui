import { Typography } from 'lessline';

const Demo: React.FC = () => {
  return (
    <div>
      <Typography.Link
        href="https://xav1er.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://xav1er.com
      </Typography.Link>
      <br />
      <Typography.Link disabled href="https://xav1er.com">
        禁用态链接
      </Typography.Link>
    </div>
  );
};

export default Demo;
