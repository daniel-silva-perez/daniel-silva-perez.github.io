import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://daniel-silva-perez.github.io',
  outDir: './dist',
  build: {
    format: 'file'
  }
});
