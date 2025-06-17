import { defineConfig } from 'vite';
import htmlMinify from 'vite-plugin-html-minify';


export default defineConfig({
  build: {
    minify: 'esbuild', // Explicit minification
    cssCodeSplit: true, // Extract CSS
    lib: {
      entry: 'src/main.ts',
      name: 'SpacingPicker',
      formats: ['es'],
      fileName: 'main'
    },
    rollupOptions: {
      // Externalize deps if needed
    }
  },
  plugins: [
    htmlMinify({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
    }),
  ]
});