import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    {
      name: "multi-page-rewrite",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url) {
            const url = req.url
            if (url.startsWith("/admin")) {
              req.url = "/admin.html"
            } else if (url.startsWith("/pc")) {
              req.url = "/pc.html"
            }
          }
          next()
        })
      },
    },
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        admin: resolve(__dirname, "admin.html"),
        pc: resolve(__dirname, "pc.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5551,
  },
  resolve: {
    alias: {
      "@": "/src",
      "~": "/src/shared",
    },
  },
})
