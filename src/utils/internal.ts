export const PREFIX = 'lessline';

export const getClsPrefix = (name?: string) => {
  return [PREFIX, name].filter(Boolean).join('-');
};
