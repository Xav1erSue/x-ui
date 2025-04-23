import { FlexProps } from './types';
import cn from 'classnames';
import { getClsPrefix } from '../../utils';

const prefix = getClsPrefix('flex');

const Flex: React.FC<FlexProps> = (props) => {
  const {
    direction,
    justify,
    align,
    wrap,
    gap,
    children,
    className,
    style,
    ...rest
  } = props;

  return (
    <div
      className={cn(prefix, className, {
        [`${prefix}--gap-${gap}`]: typeof gap === 'string',
        [`${prefix}--${direction}`]: direction,
      })}
      style={{
        ...style,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...(typeof gap === 'number' && { gap: `${gap}px` }),
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Flex;
