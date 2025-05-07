export interface TimelineItem {
  /**
   * 圆点
   */
  dot?: React.ReactNode;
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 扩展信息
   */
  extra?: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
}
