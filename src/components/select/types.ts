import { OmitWithTypes } from '../../types/utils';
import { FormItemBaseProperty } from '../form/types';

export type RawValueType = string | number;

export interface OptionType {
  /**
   * 选项标签
   */
  label?: string;
  /**
   * 选项值
   */
  value: RawValueType;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 选项描述
   */
  description?: string;
}

export type ValueType =
  | RawValueType
  | RawValueType[]
  | OptionType
  | OptionType[]
  | undefined;

export interface SelectProps
  extends OmitWithTypes<
      React.InputHTMLAttributes<HTMLElement>,
      'value' | 'defaultValue' | 'onChange' | 'size'
    >,
    FormItemBaseProperty {
  /**
   * 选择模式：单选、多选、标签
   * @default "single"
   */
  mode?: 'single' | 'multiple' | 'tags';
  /**
   * 选项
   */
  options?: OptionType[];
  /**
   * 默认选项，用作回显使用
   */
  defaultOptions?: OptionType[];
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否加载中
   * @default false
   */
  loading?: boolean;
  /**
   * 是否将选项的 label 包装在 value 中
   * @default false
   */
  labelInValue?: boolean;
  /**
   * 是否显示搜索框
   * @default false
   */
  showSearch?: boolean;
  /**
   * 过滤选项
   * @default false
   */
  filterOption?: boolean | ((search: string, option: OptionType) => boolean);
  /**
   * 选中项的值
   */
  value?: ValueType;
  /**
   * 默认选中项的值
   */
  defaultValue?: ValueType;
  /**
   * 选中项的值改变时的回调，option 只在单选模式下生效
   */
  onChange?: (value: ValueType, option?: OptionType) => void;
  /**
   * 受控是否显示弹窗
   */
  visible?: boolean;
  /**
   * 默认显示状态
   * @default false
   */
  defaultVisible?: boolean;
  /**
   * 显示状态改变时的回调
   */
  onVisibleChange?: (visible: boolean) => void;
}

export interface SelectContextProps {
  hoveredIndex: number;
  setHoveredIndex: (index: number) => void;
  handleChange: (option: OptionType) => void;
  isSelected: (option: OptionType) => boolean;
}

export interface OptionListProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  options: OptionType[];
}

export interface OptionProps {
  index: number;
  option: OptionType;
}

export interface SelectTagProps {
  option?: OptionType;
}
