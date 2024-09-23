import React, { useState, useCallback, useLayoutEffect } from 'react';
import { createRoot, Root } from 'react-dom/client';
import AIIcon from './components/AiIcon';
import Modal from './components/Model';

const App: React.FC = () => {
  console.log("App loaded");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeInputId, setActiveInputId] = useState<string | null>(null);
  const rootsRef = React.useRef<Map<string, Root>>(new Map());

  const setupListeners = useCallback(() => {
    const messageInputs = document.querySelectorAll('.msg-form__contenteditable') as NodeListOf<HTMLElement>;

    messageInputs.forEach((input, index) => {
      if (!input.dataset.aiIconAdded) {
        const inputId = `msg-input-${index}`;
        input.setAttribute('data-input-id', inputId);

        input.addEventListener('focus', () => {
          setActiveInputId(inputId);
          addAIIcon(input, inputId);
        });

        input.addEventListener('blur', () => {
          setTimeout(() => {
            if (activeInputId !== inputId) {
              removeAIIcon(inputId);
            }
          }, 200);
        });

        input.dataset.aiIconAdded = 'true';
      }
    });

    console.log("Event listeners set up for message inputs");
  }, [activeInputId]);

  const addAIIcon = (input: HTMLElement, inputId: string) => {
    removeAIIcon(inputId);

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'ai-icon-wrapper absolute -bottom-2 right-1 z-50 ';
    input.appendChild(iconWrapper);

    const root = createRoot(iconWrapper);
    rootsRef.current.set(inputId, root);

    root.render(
      <AIIcon 
         
        onClick={() => {
          setIsModalOpen(true);
          setActiveInputId(inputId);
        }} 
      />
    );
  };

  const removeAIIcon = (inputId: string) => {
    const root = rootsRef.current.get(inputId);
    if (root) {
      root.unmount();
      rootsRef.current.delete(inputId);
      const input = document.querySelector(`[data-input-id="${inputId}"]`);
      const iconWrapper = input?.querySelector('.ai-icon-wrapper');
      iconWrapper?.remove();
    }
  };

  useEffect(() => {
    setupListeners();

    const observer = new MutationObserver(() => {
      setupListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      
      rootsRef.current.forEach(root => root.unmount());
      rootsRef.current.clear();
    };
  }, [setupListeners]);

  const handleInsert = (text: string) => {
    if (activeInputId) {
      const activeInput = document.querySelector(`[data-input-id="${activeInputId}"] p`) as HTMLElement;
      if (activeInput) {
        activeInput.innerText += text;
        // Trigger input event to ensure LinkedIn's JS updates
        const inputEvent = new Event('input', { bubbles: true });
        activeInput.dispatchEvent(inputEvent);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onInsert={handleInsert}
    />
  );
};

export default App;