import { OmitWithTypes } from '../../types';
import { FormItemBaseProperty } from '../form/types';

export interface SwitchProps
  extends OmitWithTypes<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    FormItemBaseProperty {
  /**
   * 当前是否被选中
   * @default false
   */
  checked?: boolean;
  /**
   * 默认是否被选中
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * 选中状态变化时触发
   */
  onChange?: (checked: boolean) => void;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
}
