import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

const getBase = () => {
  // If custom domain CNAME is present (fillthegapnl.ca), the site lives at root '/'
  const hasCname = fs.existsSync(path.resolve(__dirname, 'CNAME')) || fs.existsSync(path.resolve(__dirname, 'public/CNAME'));
  if (hasCname) {
    return '/';
  }
  // If BASE_URL is set (e.g. from GitHub Actions steps.pages.outputs.base_path)
  if (process.env.BASE_URL) {
    return process.env.BASE_URL.endsWith('/') ? process.env.BASE_URL : `${process.env.BASE_URL}/`;
  }
  // If running inside GitHub Actions without custom domain
  if (process.env.GITHUB_REPOSITORY) {
    const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
    return `/${repo}/`;
  }
  // Default to relative base
  return './';
};

const gitHubPagesSpaPlugin = (): Plugin => ({
  name: 'github-pages-spa-plugin',
  closeBundle() {
    try {
      const rootDir = __dirname;
      const distDir = path.resolve(rootDir, 'dist');
      const docsDir = path.resolve(rootDir, 'docs');
      const rootAssetsDir = path.resolve(rootDir, 'assets');
      const indexPath = path.join(distDir, 'index.html');

      if (fs.existsSync(indexPath)) {
        // 1. Ensure .nojekyll in dist and root to prevent GitHub Jekyll from ignoring files
        fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf-8');
        fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf-8');

        // 2. Ensure CNAME in dist and root
        const cnameContent = 'fillthegapnl.ca\n';
        fs.writeFileSync(path.join(distDir, 'CNAME'), cnameContent, 'utf-8');
        fs.writeFileSync(path.join(rootDir, 'CNAME'), cnameContent, 'utf-8');

        // 3. Duplicate index.html to 404.html in dist and root
        const indexHtml = fs.readFileSync(indexPath, 'utf-8');
        fs.writeFileSync(path.join(distDir, '404.html'), indexHtml, 'utf-8');
        fs.writeFileSync(path.join(rootDir, '404.html'), indexHtml, 'utf-8');

        // 4. Mirror dist/assets directly into root assets/ so root index.html can load them
        const distAssetsDir = path.join(distDir, 'assets');
        if (fs.existsSync(distAssetsDir)) {
          if (!fs.existsSync(rootAssetsDir)) {
            fs.mkdirSync(rootAssetsDir, { recursive: true });
          }
          fs.cpSync(distAssetsDir, rootAssetsDir, { recursive: true });
        }

        // 5. Mirror entire dist to docs/ so "Deploy from a branch" -> /docs works out of the box
        if (!fs.existsSync(docsDir)) {
          fs.mkdirSync(docsDir, { recursive: true });
        }
        fs.cpSync(distDir, docsDir, { recursive: true });
      }
    } catch (err) {
      console.warn('[GitHub Pages Plugin] Notice:', err);
    }
  },
});

export default defineConfig(() => {
  return {
    base: getBase(),
    plugins: [react(), tailwindcss(), gitHubPagesSpaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/index.js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'assets/index.css';
            }
            return 'assets/[name].[ext]';
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
