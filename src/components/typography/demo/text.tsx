import { Typography, TypographySize, TypographyWeight } from 'lessline';
import './styles.less';

const SIZE_LIST: TypographySize[] = ['xs', 'sm', 'base', 'lg', 'xl', '2xl'];

const WEIGHT_LIST: TypographyWeight[] = [
  'regular',
  'medium',
  'semibold',
  'bold',
];

const Demo: React.FC = () => {
  return (
    <div className="typography-text-demo">
      {WEIGHT_LIST.map((weight) =>
        SIZE_LIST.map((size) => (
          <Typography.Text weight={weight} size={size}>
            {`${weight} ${size}`}
          </Typography.Text>
        )),
      )}
    </div>
  );
};

export default Demo;
