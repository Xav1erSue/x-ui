import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
  },
  resolve: {
    alias: {
      xui: path.resolve(__dirname, 'src/index.ts'),
    },
  },
});
