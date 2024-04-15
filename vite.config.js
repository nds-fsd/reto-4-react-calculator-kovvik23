import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nds-fsd.github.io/reto-4-react-calculator-kovvik23/'
})
