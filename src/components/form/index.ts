import { Form as InternalForm, useForm } from "./form"
import { FormItem as InternalFormItem } from "./form-item"

type Form = typeof InternalForm & {
  Item: typeof InternalFormItem
  useForm: typeof useForm
}

const Form = InternalForm as Form
Form.Item = InternalFormItem
Form.useForm = useForm

export { Form }
