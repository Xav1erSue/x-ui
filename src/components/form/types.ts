import type { FieldProps } from "rc-field-form/es/Field"

export interface FormItemProps extends FieldProps {
  children: React.ReactElement
  required?: boolean
}

export type ValidateStatus = "error" | "default" | "success"

/** 所有表单控件都需要实现的属性 */
export interface FormItemBaseProperty {
  status?: ValidateStatus
}
