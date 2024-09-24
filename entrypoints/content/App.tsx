import React, { useState, useCallback, useEffect, useRef } from 'react';
import AIIcon from './components/AiIcon';
import Modal from './components/Model';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeInputId, setActiveInputId] = useState<string | null>(null);
  const rootsRef = useRef<Map<string, HTMLElement>>(new Map());

  const addAIIcon = (input: HTMLElement, inputId: string) => {
    removeAIIcon(inputId);

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'ai-icon-wrapper absolute -bottom-2 right-1 z-50';
    iconWrapper.style.display = 'inline-block'; 
    input.appendChild(iconWrapper); 
    // Save the wrapper to remove it later if needed
    rootsRef.current.set(inputId, iconWrapper);

    const root = createRoot(iconWrapper);
    root.render(
      <AIIcon
        onClick={() => {
          setIsModalOpen(true);
          setActiveInputId(inputId); 
        }}
      />
    );
  };

  // Function to remove the AI icon from the input
  const removeAIIcon = (inputId: string) => {
    const wrapper = rootsRef.current.get(inputId);
    if (wrapper) {
      wrapper.remove(); 
      rootsRef.current.delete(inputId);
    }
  };


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
            removeAIIcon(inputId); 
          }, 200);
        });

        input.dataset.aiIconAdded = 'true'; 
      }
    });
  }, []);


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
      rootsRef.current.forEach(wrapper => wrapper.remove()); 
      rootsRef.current.clear(); 
    };
  }, [setupListeners]);


  const handleInsert = (text: string) => {
    if (activeInputId) {
      const activeInput = document.querySelector(`[data-input-id="${activeInputId}"] p`) as HTMLElement;
      if (activeInput) {
        activeInput.innerText += text;

        const inputEvent = new Event('input', { bubbles: true });
        activeInput.dispatchEvent(inputEvent);// Trigger input event
      }
    }
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInsert={handleInsert}
      />
    </>
  );
};

export default App;
