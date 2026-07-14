import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "VisionAI Studio",
        short_name: "VisionAI",
        description:
          "On-device visual intelligence. Classify images and extract text entirely in your browser. No cloud. No uploads. 100% private.",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff,woff2,ttf,eot}"],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        runtimeCaching: [
          {
            // Google Fonts CSS
            urlPattern: ({ url }) => url.origin === "https://fonts.googleapis.com",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-css",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Google Fonts files
            urlPattern: ({ url }) => url.origin === "https://fonts.gstatic.com",
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // TensorFlow.js model weights and shards (storage.googleapis.com)
            urlPattern: ({ url }) =>
              url.origin === "https://storage.googleapis.com" ||
              url.href.includes("tfhub") ||
              url.href.includes("tensorflow.org"),
            handler: "CacheFirst",
            options: {
              cacheName: "tfjs-model-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Tesseract.js worker + language data (CDN)
            urlPattern: ({ url }) =>
              url.href.includes("tessdata") ||
              url.href.includes("tesseract") ||
              url.href.includes("cdn.jsdelivr.net") ||
              url.href.includes("unpkg.com/tesseract.js"),
            handler: "CacheFirst",
            options: {
              cacheName: "tesseract-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // General images
            urlPattern: /\.(?:png|jpg|jpeg|gif|webp|svg|ico)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      output: {
        manualChunks: {
          tf: ["@tensorflow/tfjs", "@tensorflow-models/mobilenet"],
          tesseract: ["tesseract.js"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
