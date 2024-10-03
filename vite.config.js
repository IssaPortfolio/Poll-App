import { defineConfig, loadEnv } from 'vite'; // Import Vite functions to define configuration and load environment variables
import react from '@vitejs/plugin-react'; // Import Vite plugin for React support

// Export the Vite configuration
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // Load environment variables based on the current mode

  return {
    plugins: [react()], // Register the React plugin for Vite
    root: 'public', // Specify the root directory for the Vite server and build
    build: {
      outDir: 'dist', // Specify the output directory for the build
      rollupOptions: { // Configuration options for Rollup
        input: {
          main: 'public/index.html', // Specify the entry point of the application
        },
      },
    },
    server: {
      host: '0.0.0.0',  // Allows Vite to listen on all network interfaces, making it accessible externally
      port: 5173,       // Set the port for the Vite server
      strictPort: true, // Ensures that Vite does not fallback to other ports if 5173 is already in use
    },
    
    define: {
      'process.env': env, // Define environment variables to be used in the application
    },
  };
});
