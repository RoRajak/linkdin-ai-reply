import React from "react";
import { createRoot } from "react-dom/client";
import App from "./content/App";

export default defineContentScript({
  matches: ["https://www.linkedin.com/*"],
  runAt: "document_end",
  main(ctx) {
    console.log("LinkedIn extension is active");
    
    const root = document.createElement('div');
    root.id = 'linkedin-ai-extension-root';
    document.body.appendChild(root);
    
    createRoot(root).render(React.createElement(App));

    return () => {
      const root = document.getElementById('linkedin-ai-extension-root');
      if (root) {
        root.remove();
      }
    };
  },
});