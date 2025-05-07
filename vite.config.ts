import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      name: 'lessline',
      entry: {
        index: 'src/index.ts',
        style: 'src/index.less',
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // 确保外部化处理那些
      // 你不想打包进库的依赖
      external: ['react', 'react-dom'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          exports: undefined,
          dir: path.resolve(__dirname, `es`),
          preserveModulesRoot: 'src',
        },
        // CommonJS 模块格式的编译
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: path.resolve(__dirname, `lib`),
          preserveModulesRoot: 'src',
        },
      ],
    },
  },
  resolve: {
    alias: {
      lessline: path.resolve(__dirname, 'src/index.ts'),
    },
  },
});
