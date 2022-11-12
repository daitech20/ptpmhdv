import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({mode}) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd() + '/../')}

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
          '@': fileURLToPath(new URL('../', import.meta.url))
      },
      dedupe: ['vue']
    }
  })
}