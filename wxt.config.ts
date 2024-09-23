import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "LinkedIn AI Reply",
    version: "1.0.0",
    description: "AI-powered replies for LinkedIn",
    "permissions": ["activeTab"],
 

    
  },
});
