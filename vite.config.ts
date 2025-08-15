import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: 'esbuild', // Changed from terser to esbuild to avoid hoisting issues
    target: 'es2020',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        format: 'es',
        generatedCode: 'es2015', // Ensure proper code generation
        manualChunks: (id) => {
          // Better chunk splitting to avoid circular dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            return 'vendor';
          }
          // Keep related modules together
          if (id.includes('/hooks/')) {
            return 'hooks';
          }
          if (id.includes('/components/')) {
            return 'components';
          }
          if (id.includes('/pages/')) {
            return 'pages';
          }
        },
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return `assets/[name].[hash][extname]`;
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name].[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name].[hash][extname]`;
          }
          return `assets/[name].[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
      },
    },
  },
  base: "./",
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  esbuild: {
    target: 'es2020',
  },
}));
