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
  content?: React.ReactNode;
  /**
   * 时间
   */
  time?: string;
  /**
   * 唯一标识
   */
  key: React.Key;
}

export interface TimelineProps<T extends TimelineItem>
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 时间轴数据
   */
  items?: T[];
  /**
   * 某些场景下需要对连续的数据进行分组，可以传入分组函数进行分组，返回值作为分组的标题进行展示
   */
  groupBy?: (item: T) => string;
  /**
   * 是否显示时间
   * @default false
   */
  showTime?: boolean;
}
