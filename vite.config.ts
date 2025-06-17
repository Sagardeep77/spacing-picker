import { defineConfig } from 'vite';
import htmlMinify from 'vite-plugin-html-minify';
import { visualizer } from 'rollup-plugin-visualizer';


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
    visualizer({
      filename: 'dist/stats.html',
      open: true, // opens the report in browser automatically
      gzipSize: true,
      brotliSize: true,
    }),
  ]
});