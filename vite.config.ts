import { defineConfig } from 'vite'
import ViteFonts from 'vite-plugin-fonts'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), ViteFonts({
    google: {
      families: []
    },
  })]
})
