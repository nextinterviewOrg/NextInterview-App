// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // <<--- Enable Vitest's global test APIs
    environment: "jsdom", // <<--- Needed for testing browser-based code
    setupFiles: ["./src/setupTests.js"],
    // or wherever you put your test setup file
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          tinymce: ['tinymce', '@tinymce/tinymce-react']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['tinymce', '@tinymce/tinymce-react']
  },
  server: {
    fs: {
      strict: false
    }
  }
});
