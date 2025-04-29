import path from 'path';
import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    [
      'script',
      {
        src: 'https://plausible.xav1er.com/js/script.js',
        defer: 'true',
        'data-domain': 'docs.xav1er.com',
      },
    ],
  ],
  title: 'X-UI',
  description: '一个现代的 UI 组件库',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Components',
        link: 'components',
        activeMatch: '/components/',
      },
    ],
    sidebar: {
      '/components/': {
        base: '/components/',
        items: [
          {
            text: '组件总览',
            base: '/components',
            link: '/',
          },
          {
            text: '通用',
            base: '/components',
            collapsed: false,
            items: [{ text: 'Button 按钮', link: '/button' }],
          },
          {
            text: '布局',
            base: '/components',
            collapsed: false,
            items: [{ text: 'Flex 弹性布局', link: '/flex' }],
          },
          {
            text: '表单组件',
            base: '/components',
            collapsed: false,
            items: [
              { text: 'Form 表单', link: '/form' },
              { text: 'Input 输入框', link: '/input' },
              { text: 'Select 选择器', link: '/select' },
            ],
          },
        ],
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Xav1erSue/x-ui' },
    ],
  },
  markdown: {
    config: (md) => {
      md.use(vitepressDemoPlugin, {
        demoDir: path.resolve(__dirname, '../../src/components'),
      });
    },
  },
  vite: {
    resolve: {
      alias: {
        xui: path.resolve(__dirname, '../../src/index.ts'),
      },
    },
  },
});
