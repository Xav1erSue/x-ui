import path from 'path';
import { parse } from 'react-docgen-typescript';

/**
 * 解析组件的 props
 */
export const parseComponentProps = (componentPath: string) => {
  const fullPath = path.resolve(
    __dirname,
    '../../../src/components',
    componentPath,
  );

  const result = parse(fullPath, {
    propFilter: (prop: any) => {
      // 过滤掉 node_modules 中的 props
      if (prop.declarations !== undefined && prop.declarations.length > 0) {
        const hasPropAdditionalDescription = prop.declarations.find(
          (declaration: any) => {
            return !declaration.fileName.includes('node_modules');
          },
        );
        return Boolean(hasPropAdditionalDescription);
      }
      return true;
    },
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
  });

  if (result.length === 0) {
    return [];
  }

  // 获取第一个组件的 props
  const componentProps = result[0].props;

  // 转换为我们需要的格式
  return Object.keys(componentProps).map((propName) => {
    const prop = componentProps[propName];
    return {
      name: propName,
      type: prop.type.value
        ? prop.type.value.map((item: any) => item.value).join(' | ')
        : prop.type.name,
      defaultValue: prop.defaultValue?.value,
      required: prop.required,
      description: prop.description,
    };
  });
};

/**
 * 解析 markdown 中的属性
 */
export const parseAttributes = (
  attrs: string,
): Record<string, string | boolean> => {
  const result: Record<string, string | boolean> = {};
  const regex = /(\w+)(?:="([^"]*)")?/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(attrs)) !== null) {
    const [, key, value] = match;
    result[key] = value === undefined ? true : value;
  }

  return result;
};

/**
 * 格式化表格值
 */
export const formatValue = (value: string) => {
  if (!value) return '-';

  return value
    .replace(/[<>]/g, (match) => `&${match === '<' ? 'lt' : 'gt'};`)
    .replace(/"([^"]*)"/g, '<code>$1</code>')
    .replace(/'([^']*)'/g, '<code>$1</code>');
};
