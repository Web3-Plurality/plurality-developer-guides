import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
      plugins: [react()],

      server: {
        port: parseInt(process.env.VITE_PORT, 10) || 5173, // Default to 5173 if VITE_PORT is not set
      },
  });
}

