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
    minify: mode === 'production',
    target: 'esnext',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      external: [],
      output: {
        manualChunks: (id) => {
          // Separar chunks de forma mais inteligente
          if (id.includes('node_modules')) {
            // Chunks de vendor menores
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            if (id.includes('gsap') || id.includes('framer-motion')) {
              return 'vendor-animation';
            }
            if (id.includes('recharts') || id.includes('fabric')) {
              return 'vendor-charts';
            }
            return 'vendor-utils';
          }
          
          // Separar componentes admin em chunk separado
          if (id.includes('/admin/')) {
            return 'admin';
          }
          
          // Separar páginas de serviços
          if (id.includes('/services/') || id.includes('/areas/')) {
            return 'pages';
          }
          
          return undefined;
        },
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          let extType = assetInfo.name.split('.').at(1) || '';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  base: "./",
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}));
