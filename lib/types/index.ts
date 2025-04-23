export interface BaseComponentProps<T extends Element = Element> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<T>;
}
