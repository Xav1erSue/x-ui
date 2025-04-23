import { Field } from "rc-field-form"
import { cloneElement } from "react"
import { FormItemProps, ValidateStatus } from "./types"

const FormItem: React.FC<FormItemProps> = (props) => {
  const { children, required, ...restProps } = props
  return (
    <Field {...restProps}>
      {(control, context) => {
        const status: ValidateStatus = context.errors.length
          ? "error"
          : "default"
        const extra = context.errors[0]
        const childProps = { required, status, extra, ...control }
        return cloneElement(children, childProps)
      }}
    </Field>
  )
}

export { FormItem }
