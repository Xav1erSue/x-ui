import { useForm, useWatch } from 'rc-field-form';
import InternalForm from './form';
import InternalFormItem from './form-item';

type Form = typeof InternalForm & {
  Item: typeof InternalFormItem;
  useForm: typeof useForm;
  useWatch: typeof useWatch;
};

const Form = InternalForm as Form;

Form.Item = InternalFormItem;
Form.useForm = useForm;
Form.useWatch = useWatch;

export { Form };
