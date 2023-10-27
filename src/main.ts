import { createSSRApp } from "vue";
import App from "./App.vue";
import "../tailwind.css";

export function createApp() {
  const app = createSSRApp(App);
  app.config.rememberPwd = false;
  return {
    app,
  };
}

// console.log(process.env);
