import {resolve} from 'path'
import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
    plugins: [svelte()],
    base: './',
    build: {
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'views/popup.html'),
            },
        },
        assetsDir: 'assets',
    },
})
