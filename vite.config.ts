import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  // No GitHub Pages o site é servido em /<nome-do-repo>/.
  // O workflow de deploy define VITE_BASE com esse valor; local fica em "/".
  base: process.env.VITE_BASE ?? '/',
})
