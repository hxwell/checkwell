import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
    ],
    // --- Add this section ---
    server: {
        cors: true, // Allows the Laravel app to fetch assets from Vite
        hmr: {
            host: 'localhost',
        },
        proxy: {
            // If you're calling a separate API service from your React components
            '/api/external': {
                target: 'https://external-service.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/external/, ''),
            },
        },
    },
    // -----------------------
    esbuild: {
        jsx: 'automatic',
    },
});