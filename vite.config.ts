import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // load .env, .env.local etc for the current mode
  const env = loadEnv(mode, process.cwd(), "");

  // For client-side secrets, Vite requires variables to start with VITE_.
  // But prefer not to expose real secrets in the client. See notes below.
  const clientApiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || "";

  return {
    // Important for Vercel static hosting so assets use relative paths
    base: "./",

    // Build output folder (Vite default is "dist" but being explicit helps)
    build: {
      outDir: "dist",
    },

    // Development server (kept for local dev)
    server: {
      port: 3000,
      host: "0.0.0.0",
    },

    plugins: [react()],

    define: {
      // If you really need to expose this to client code (not recommended for secrets),
      // use import.meta.env.VITE_GEMINI_API_KEY in your code instead of process.env.
      // We still provide a fallback for legacy usage:
      "process.env.GEMINI_API_KEY": JSON.stringify(clientApiKey)
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
