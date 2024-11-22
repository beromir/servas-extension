import {resolve} from 'path'
import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [svelte(), tailwindcss()],
    base: './',
    build: {
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'views/popup.html'),
                settings: resolve(__dirname, 'views/settings.html'),
            },
        },
        assetsDir: 'assets',
    },
})
