import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        media: resolve(__dirname, 'media.html'),
        form: resolve(__dirname, 'form.html'),
        login: resolve(__dirname, 'login.html'),
      },
    }
  },
  publicDir: './src/public'
}
