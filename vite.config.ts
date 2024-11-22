import { defineConfig } from 'vite';
import { quasar } from '@quasar/vite-plugin';

export default defineConfig({
  plugins: [
    quasar(),
  ],
  define: {
    'process.env': process.env,
  },
});
