// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import path from 'path'; // 使用 ES 模块导入






export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // 使用内置的 path 模块进行别名配置
      'path': 'path-browserify',
    },
  },
  build: {
    rollupOptions: {
      assetsInclude: ['fonts/**/*'],
      external: ['fs', 'url', 'source-map-js', 'sanitize-html'],
      output: {
        globals: {
          'sanitize-html': 'sanitizeHtml',
          'fs': 'fs',
          'url': 'url',
          'source-map-js': 'sourceMapJs',
        },
      },
    },
  },
});