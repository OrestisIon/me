import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Serve from root path (change to '/subpath/' if deploying to subdirectory)
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist', // Changed from 'build' to 'dist' (AWS Amplify default)
    sourcemap: false, // Disabled for production (reduces bundle size)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          chakra: ['@chakra-ui/react', '@emotion/react', '@emotion/styled']
        }
      }
    }
  },
  define: {
    'process.env': {}
  }
})
