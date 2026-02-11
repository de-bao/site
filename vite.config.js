import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-index-files',
      closeBundle() {
        // 复制 index_files 文件夹到 dist
        const srcDir = resolve(__dirname, 'index_files')
        const destDir = resolve(__dirname, 'dist', 'index_files')
        if (existsSync(srcDir)) {
          try {
            execSync(`cp -r "${srcDir}" "${destDir}"`, { stdio: 'inherit' })
          } catch (e) {
            console.error('Failed to copy index_files:', e)
          }
        }
      }
    }
  ],
  base: process.env.NODE_ENV === 'production' ? '/site/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: false,
  },
  publicDir: false,
})
