export const PREFIX = 'xui';

export const getClsPrefix = (name?: string) => {
  return [PREFIX, name].filter(Boolean).join('-');
};
