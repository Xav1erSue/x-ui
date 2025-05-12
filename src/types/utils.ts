export type OmitWithTypes<T, K extends keyof T> = Omit<T, K>;

export type MakePickRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  OmitWithTypes<T, K>;
