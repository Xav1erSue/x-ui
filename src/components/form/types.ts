import type { FieldProps } from 'rc-field-form/es/Field';

export type ValidateStatus = 'error' | 'default' | 'success';

/** 所有表单控件都需要实现的属性 */
export interface FormItemBaseProperty {
  /**
   * 状态
   * @default 'default'
   */
  status?: ValidateStatus;
}

export interface FormItemProps extends FieldProps {
  /**
   * 标签
   */
  label?: React.ReactNode;
  /**
   * 右上角的标签提示
   */
  cornerHint?: React.ReactNode;
  /**
   * 底部额外信息
   */
  extra?: React.ReactNode;
  /**
   * 展示必填样式
   * @default false
   */
  required?: boolean;
  /**
   * 无样式
   * @default false
   */
  noStyle?: boolean;
}

export interface FormItemLayoutProps
  extends Pick<FormItemProps, 'label' | 'cornerHint' | 'extra' | 'required'> {
  errorList?: string[];
  children?: React.ReactNode;
}
