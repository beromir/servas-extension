import { resolve } from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/views/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'views/index.html'),
      },
    },
  },
})
