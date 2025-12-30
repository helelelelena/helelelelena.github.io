import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages deployment
  // For username.github.io, use '/' as the base
  // This ensures all assets load correctly from the root domain
  base: '/',
})
