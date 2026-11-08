import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  server: {
    port: 5173,
    // Porta fixa: o devcontainer encaminha a 5173; se estiver ocupada, falha em vez de trocar
    strictPort: true,
    // No Codespaces (CODESPACES=true) escuta em todas as interfaces para o port forwarding
    // alcançar o servidor; localmente mantém o padrão (apenas localhost).
    host: process.env.CODESPACES === 'true' ? true : undefined,
    // Domínios de port forwarding do GitHub Codespaces (o Vite 6 bloqueia hosts desconhecidos)
    allowedHosts: ['.app.github.dev'],
    // O front chama "/api" (mesma origem) e o Vite repassa para o backend.
    // Assim funciona localmente e no Codespaces sem CORS e sem expor a porta 3333.
    proxy: {
      '/api': {
        target: process.env.API_PROXY_TARGET || 'http://localhost:3333',
        changeOrigin: true,
      },
    },
  },
})
