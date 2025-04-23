import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'lib/index.ts',
      formats: ['es'],
    },
  },
  resolve: {
    alias: {
      xui: path.resolve(__dirname, 'lib/index.ts'),
    },
  },
});
