import FieldForm from 'rc-field-form';
import type { FormRef } from 'rc-field-form/lib/interface';
import { forwardRef } from 'react';
import { getClsPrefix } from '../../utils';
import cn from 'classnames';
import { FormProps } from './types';
import { FormContext } from './context';

const clsPrefix = getClsPrefix('form');

const Form = forwardRef<FormRef, FormProps>((props, ref) => {
  const { className, size, ...rest } = props;

  return (
    <FormContext value={{ size }}>
      <FieldForm className={cn(clsPrefix, className)} ref={ref} {...rest} />
    </FormContext>
  );
});

Form.displayName = 'Form';

export default Form;
