import type MarkdownIt from 'markdown-it';
import { formatValue, parseAttributes, parseComponentProps } from './utils';

export function propsTablePlugin(md: MarkdownIt) {
  // 添加自定义的 block 规则
  md.block.ruler.before(
    'paragraph',
    'props-table',
    (state, startLine, _, silent) => {
      const start = state.bMarks[startLine] + state.tShift[startLine];
      const max = state.eMarks[startLine];
      const content = state.src.slice(start, max).trim();

      // 匹配 ::props{component="button" title="属性说明"}
      const match = content.match(/^::props\s*{([^}]*)}/);
      if (!match) {
        return false;
      }

      if (silent) {
        return true;
      }

      // 解析属性
      const attrs = parseAttributes(match[1]);
      const component = attrs.component as string;

      if (!component) {
        return false;
      }

      // 解析组件 props
      const props = parseComponentProps(component);

      const propsHtml = props
        .map(
          (prop) => `
          <tr>
            <td style="text-align: center"><strong>${prop.name}</strong></td>
            <td style="text-align: center">${formatValue(prop.type)}</td>
            <td style="text-align: center">${formatValue(
              prop.defaultValue,
            )}</td>
            <td style="text-align: center">${prop.description || '-'}</td>
          </tr>`,
        )
        .join('');

      // 创建 HTML token
      const token = state.push('html_block', '', 0);
      token.content = `
        <table>
          <thead>
            <tr>
              <th style="text-align: center">属性名</th>
              <th style="text-align: center">类型</th>
              <th style="text-align: center">默认值</th>
              <th style="text-align: center">描述</th>
            </tr>
          </thead>
          <tbody>
            ${propsHtml}
          </tbody>
        </table>`;

      // 更新行号
      state.line = startLine + 1;

      return true;
    },
  );
}
