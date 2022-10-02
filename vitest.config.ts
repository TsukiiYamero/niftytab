import { defineConfig } from 'vite'
import viteConfigA from './vite.config'

export default defineConfig({
    ...viteConfigA,
    test: {
        environment: "happy-dom"
    }, 
})