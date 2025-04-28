import FieldForm from 'rc-field-form';
import type { FormRef } from 'rc-field-form/lib/interface';
import type { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import { forwardRef } from 'react';
import { getClsPrefix } from '../../utils';
import cn from 'classnames';

const clsPrefix = getClsPrefix('form');

const Form = forwardRef<FormRef, RcFormProps>((props, ref) => {
  const { className, ...rest } = props;

  return <FieldForm className={cn(clsPrefix, className)} ref={ref} {...rest} />;
});

Form.displayName = 'Form';

export default Form;
