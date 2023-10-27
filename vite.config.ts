import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      // 如果您使用npm安装了uni-ui，可以将路径替换为实际的路径
      "uni-ui": "@/uni_modules/uni-ui",
    },
  },
  css: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  optimizeDeps: {
    include: ["uni-ui"],
  },
  define: {
    "process.env.UNI_PLATFORM": "vue",
  },
  server: {
    open: true,
    host: "0.0.0.0",
    port: 7080,
    proxy: {
      "^/mes/": {
        // target: 'http://192.168.110.25:7878/',//邓
        // target: "http://192.168.110.218:7878/", //王
        target: "http://192.168.110.22:7878/", //吕
        changeOrigin: true,
      },
    },
  },
});
