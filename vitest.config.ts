import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [],
  optimizeDeps: {
    include: [],
  },
  resolve: {
    dedupe: [],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    // setupFiles: [fileURLToPath(new URL('./vitest.setup.ts', import.meta.url))],
    deps: {
      inline: [],
    },
  },
});
