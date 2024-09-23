// entrypoints/background.ts
import { defineBackground } from 'wxt/sandbox';

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
  
  // Listen for messages from the content script
  browser.runtime.onMessage.addListener((message, sender) => {
    if (message.action === 'toggleModal' && sender.tab?.id) {
      // Send a message back to the content script to toggle the modal
      browser.tabs.sendMessage(sender.tab.id, { action: 'toggleModal' });
    }
  });
});