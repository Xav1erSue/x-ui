import fs from 'fs';
import path from 'path';
import { createInterface } from 'readline';
import { pascal, dash } from 'radash';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/* ----------------------------------- 模板 ----------------------------------- */

/**
 * 组件模板
 * @param {string} componentName
 * @returns string
 */
const componentTemplate = (componentName) => {
  const pascalName = pascal(componentName);
  const kebabName = dash(componentName);

  return `import cn from 'classnames';
import { ${pascalName}Props } from './types';
import { getClsPrefix } from '../../utils';

const clsPrefix = getClsPrefix('${kebabName}');

const ${pascalName}: React.FC<${pascalName}Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <div {...rest} className={cn(clsPrefix, className)}>
      ${pascalName}
    </div>
  );
};

export default ${pascalName};`;
};

/**
 * 类型定义模板
 * @param {string} componentName
 * @returns {string}
 */
const typesTemplate = (componentName) => {
  const pascalName = pascal(componentName);

  return `export interface ${pascalName}Props extends React.HTMLAttributes<HTMLElement> {
  // 在这里添加组件的 props
}`;
};

/**
 * 样式模板
 * @param {string} componentName
 * @returns {string}
 */
const lessTemplate = (componentName) => {
  const kebabName = dash(componentName);

  return `.@{prefix}-${kebabName} {
  /* 在这里添加样式 */
}
`;
};

/**
 * demo 模板
 * @param {string} componentName
 * @returns {string}
 */
const demoTemplate = (componentName) => {
  const pascalName = pascal(componentName);

  return `import { ${pascalName} } from 'lessline';
import React from 'react';

const Demo: React.FC = () => {
  return <${pascalName} />;
};

export default Demo;`;
};

/**
 * 入口文件模板
 * @param {string} componentName
 * @returns {string}
 */
const indexTemplate = (componentName) => {
  const pascalName = pascal(componentName);
  const kebabName = dash(componentName);

  return `export { default as ${pascalName} } from './${kebabName}';
export * from './types';`;
};

/* ----------------------------------- 主函数 ---------------------------------- */

/**
 * 创建组件
 * @param {string} componentName
 */
async function createComponent(componentName) {
  const kebabName = dash(componentName);

  const componentIndexDir = path.join(process.cwd(), 'src', 'components');

  const componentDir = path.join(process.cwd(), 'src', 'components', kebabName);

  // 创建组件目录
  if (fs.existsSync(componentDir)) {
    console.error('❌ 组件已存在！');
    rl.close();
    return;
  } else {
    fs.mkdirSync(componentDir, { recursive: true });
    fs.mkdirSync(path.join(componentDir, 'styles'), { recursive: true });
    fs.mkdirSync(path.join(componentDir, 'demo'), { recursive: true });
  }

  // 创建组件文件
  fs.writeFileSync(
    path.join(componentDir, `${kebabName}.tsx`),
    componentTemplate(componentName),
  );

  // 创建 less 文件
  fs.writeFileSync(
    path.join(componentDir, `styles/index.less`),
    lessTemplate(componentName),
  );

  // 创建 demo 文件
  fs.writeFileSync(
    path.join(componentDir, `demo/base.tsx`),
    demoTemplate(componentName),
  );

  // 创建入口文件
  fs.writeFileSync(
    path.join(componentDir, 'index.ts'),
    indexTemplate(componentName),
  );

  // 创建 types 文件
  fs.writeFileSync(
    path.join(componentDir, 'types.ts'),
    typesTemplate(componentName),
  );

  // 添加样式引入
  fs.appendFileSync(
    path.join(componentIndexDir, 'styles.less'),
    `@import './${kebabName}/styles/index.less';\n`,
  );

  // 添加组件引入
  fs.appendFileSync(
    path.join(componentIndexDir, 'index.ts'),
    `export * from './${kebabName}';\n`,
  );

  console.log(`✅ 组件 ${componentName} 创建成功！`);
  console.log(`📁 位置: ${componentDir}`);
}

// 主函数
async function main() {
  rl.question('请输入组件名称: ', async (componentName) => {
    if (!componentName) {
      console.error('❌ 组件名称不能为空！');
      rl.close();
      return;
    }

    if (!/^[a-zA-Z]+$/.test(componentName)) {
      console.error('❌ 组件名称只能包含字母');
      rl.close();
      return;
    }

    try {
      await createComponent(componentName);
    } catch (error) {
      console.error('❌ 创建组件时出错:', error);
    }
    rl.close();
  });
}

main();
