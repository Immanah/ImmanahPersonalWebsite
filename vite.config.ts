import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "client", "src"),
            "@shared": path.resolve(__dirname, "shared"),
        },
    },
    root: path.resolve(__dirname, "client"), // Ensure 'client' is the root
    base: '/client/',  // Adjust base for deployment
    build: {
        outDir: path.resolve(__dirname, "../dist"), // Output build files to the root 'dist' folder
        emptyOutDir: true,
    },
});
