import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
          '@components': '/src/components',
          "@pages": '/src/pages',
          '@variable': '/src/variable',
          '@recoil': '/src/recoil',
          '@hooks': '/src/hooks',
          '@utils': '/src/utils',
        }
    },
    server: {
        host: true,
        port: 5173,
        watch: {
            usePolling: true,
        },
    },
});