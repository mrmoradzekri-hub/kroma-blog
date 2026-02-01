import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

// Helper function to get all HTML files in a directory
function getHtmlFiles(dir, files = {}) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      getHtmlFiles(fullPath, files);
    } else if (entry.name.endsWith('.html')) {
      // Create a unique key for the file
      const relativePath = fullPath.replace(resolve(__dirname), '').replace(/^\//, '');
      const key = relativePath.replace(/\.html$/, '').replace(/\//g, '_');
      files[key] = fullPath;
    }
  }
  return files;
}

const postFiles = getHtmlFiles(resolve(__dirname, 'src/posts'));

export default defineConfig({
  server: {
    allowedHosts: true,
    host: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'product.html'),
        docs: resolve(__dirname, 'docs.html'),
        ...postFiles
      }
    }
  }
})
