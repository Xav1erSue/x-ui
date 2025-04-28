import { getClsPrefix } from '../../utils';
import { Flex } from '../flex';
import { FormItemLayoutProps } from './types';
import cn from 'classnames';

const clsPrefix = getClsPrefix('form-item');

const FormItemLayout: React.FC<FormItemLayoutProps> = (props) => {
  const { children, label, cornerHint, extra, required, errorList } = props;
  return (
    <Flex
      direction="vertical"
      gap="small"
      className={cn(clsPrefix, { required })}
    >
      <Flex
        className={cn(`${clsPrefix}__header`)}
        align="center"
        justify="space-between"
      >
        <div className={cn(`${clsPrefix}__header__label`)}>{label}</div>
        <div className={cn(`${clsPrefix}__header__corner-hint`)}>
          {cornerHint}
        </div>
      </Flex>
      <div className={cn(`${clsPrefix}__content`)}>{children}</div>
      <div className={cn(`${clsPrefix}__footer`)}>
        {errorList?.length ? (
          <div className={cn(`${clsPrefix}__footer__item`, 'error')}>
            {errorList}
          </div>
        ) : null}
        {extra ? (
          <div className={cn(`${clsPrefix}__footer__item`)}>{extra}</div>
        ) : null}
      </div>
    </Flex>
  );
};

export default FormItemLayout;
