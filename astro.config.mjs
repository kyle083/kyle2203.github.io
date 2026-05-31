// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://kyle083.github.io',
  base: '/kyle2203.github.io',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), mdx()],
});
