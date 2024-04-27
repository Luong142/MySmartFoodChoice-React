import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Import the visualizer with a different method
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react()],
})
