import React, { useState, useRef, useEffect } from "react";
import arrow from "@/assets/arrow.svg";
import downArrow from "@/assets/downArrow.svg";
import regenrate from "@/assets/regenrate.svg";
import "../../popup/style.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (text: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onInsert }) => {
  const [command, setCommand] = useState("");
  const [prompt, SetPrompt] = useState("");
  const [response, setResponse] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setResponse("");
        SetPrompt("");
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleGenerate = () => {
    setResponse(
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    );
    setCommand(prompt);
    SetPrompt("");
  };

  const handleInsert = () => {
    onInsert(response);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-[455px] h-auto mr-11 p-6">
        {response && (
          <div className="flex flex-col gap-y-4 mb-2 h-auto">
            <div className="self-end bg-gray-200 w-[55%] text-gray-500 rounded-lg text-wrap p-2 font-normal text-2xl">
             {command}
            </div>
            <div className="bg-[#DBEAFE] text-gray-500 p-4 w-[70%] rounded mb-4">
              <p className="text-2xl font-normal">{response}</p>
            </div>
            
          </div>
        )}
        <div className="mb-2">
          <input
            type="text"
            
            value={prompt}
            onChange={(e) => SetPrompt(e.target.value)}
            placeholder="Prompt"
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <div className="flex justify-end gap-x-8">
            {response && (
              <button
                onClick={handleInsert}
                className="button-border text-grat-500 bg-white px-4 py-2 rounded-xl flex items-center gap-x-3 "
              >
                <img src={downArrow} alt="icon" className="size-4" />
                <p className="text-2xl font-semibold">Insert</p>
              </button>
            )}
            <button
            disabled={response !== ""}
              onClick={handleGenerate}
              className=" bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 flex items-center gap-x-2"
            >
              {response ? (
                <>
                  <img src={regenrate} alt="icon" className="size-6" />
                  <p className="text-2xl text-white place-self-center font-semibold">
                    Regenerate
                  </p>
                </>
              ) : (
                <>
                  <img src={arrow} alt="icon" className="size-6" />
                  <p className="text-2xl text-white place-self-center font-semibold">
                    Generate
                  </p>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
