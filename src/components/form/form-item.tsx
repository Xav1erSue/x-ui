import { Field } from 'rc-field-form';
import { cloneElement } from 'react';
import { FormItemProps, ValidateStatus } from './types';
import FormItemLayout from './form-item-layout';

const FormItem: React.FC<FormItemProps> = (props) => {
  const {
    children,
    required,
    noStyle,
    label,
    cornerHint,
    extra,
    ...restProps
  } = props;
  return (
    <Field {...restProps}>
      {(control, context, form) => {
        if (!children) return null;

        const status: ValidateStatus = context.errors.length
          ? 'error'
          : 'default';

        const childProps = { required, status, ...control };

        const childNode =
          typeof children === 'function'
            ? children(control, context, form)
            : cloneElement(children, childProps);

        return noStyle ? (
          childNode
        ) : (
          <FormItemLayout
            label={label}
            cornerHint={cornerHint}
            extra={extra}
            required={required}
            errorList={context.errors}
          >
            {childNode}
          </FormItemLayout>
        );
      }}
    </Field>
  );
};

FormItem.displayName = 'Form.Item';

export default FormItem;
