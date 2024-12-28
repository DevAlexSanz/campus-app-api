import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@database': path.resolve(__dirname, './src/database'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@server': path.resolve(__dirname, './src/server'),
      '@core': path.resolve(__dirname, './src/core'),
      '@config': path.resolve(__dirname, './src/core/config'),
      '@appTypes': path.resolve(__dirname, './src/core/types'),
      '@utils': path.resolve(__dirname, './src/core/utils'),
    }
  }
});
