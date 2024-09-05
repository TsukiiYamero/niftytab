import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    resolve: {
        alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
    },
    build: {
        emptyOutDir: false,
        rollupOptions: {
            input: {
                background: 'src/workers/background.ts'
            },
            output: {
                entryFileNames: 'workers/[name].js'
            }
        }
    }
});
