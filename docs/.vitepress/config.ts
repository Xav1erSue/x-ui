import path from 'path';
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'X-UI',
  description: '一个现代的 UI 组件库',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components', activeMatch: '/components/' },
    ],
    sidebar: {
      '/components/': {
        base: '/components/',
        items: [
          {
            text: '基础组件',
            collapsed: false,
            items: [
              { text: 'Button', link: 'button' },
              { text: 'Input', link: 'input' },
              { text: 'Select', link: 'select' },
              { text: 'Table', link: 'table' },
              { text: 'Dialog', link: 'dialog' },
            ],
          },
        ],
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  markdown: {
    config: (md) => {
      md.use(vitepressDemoPlugin, {
        demoDir: path.resolve(__dirname, '../../lib/components'),
      });
    },
  },
  vite: {
    resolve: {
      alias: {
        xui: path.resolve(__dirname, '../../lib/index.ts'),
      },
    },
  },
});
