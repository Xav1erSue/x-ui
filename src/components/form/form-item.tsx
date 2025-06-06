import { Field } from 'rc-field-form';
import { cloneElement, useContext } from 'react';
import { FormContext } from './context';
import FormItemLayout from './form-item-layout';
import { FormItemProps, ValidateStatus } from './types';

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

  const { size } = useContext(FormContext);

  return (
    <Field {...restProps}>
      {(control, context, form) => {
        if (!children) return null;

        const status: ValidateStatus = context.errors.length
          ? 'error'
          : 'default';

        const defaultPlaceholder = label ? `请输入${label}` : '请输入';

        const childProps = {
          required,
          status,
          placeholder: defaultPlaceholder,
          size,
          ...control,
        };

        const childNode =
          typeof children === 'function'
            ? children(control, context, form)
            : cloneElement(children, childProps);

        if (noStyle) return childNode;

        return (
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
