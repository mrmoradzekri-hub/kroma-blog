import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  server: {
    allowedHosts: true,
    host: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gasless: resolve(__dirname, 'src/posts/gasless-invoicing.html'),
        guide: resolve(__dirname, 'src/posts/guide-ultime-facturation.html'),
        toolkit: resolve(__dirname, 'src/posts/web3-freelancer-toolkit.html'),
      }
    }
  }
})