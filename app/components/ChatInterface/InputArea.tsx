import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { getUUID } from '@/app/utils/uuid';
import useChat from '@/app/hooks/useChat';

interface InputAreaProps {
  onSendMessage: (content: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isLoading } = useChat();

  const handleSend = () => {
    if (!isLoading && input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const buttonBaseClasses = "absolute right-3 bottom-3 p-2 rounded-full transition-colors duration-200";
  const buttonActiveClasses = input.trim() 
    ? "bg-black text-white hover:bg-gray-700" 
    : "bg-gray-300 text-gray-100 cursor-not-allowed";

  return (
    <div className="px-5 bg-white">
      <div className="relative items-center justify-between">
        <textarea
          id={getUUID()}
          ref={textareaRef}
          value={input}
          placeholder="傳訊息給 DSM Bot"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full p-4 pr-12 rounded-3xl focus:outline-none resize-none bg-gray-100"
          rows={1}
        />
        <button
          onClick={handleSend}
          className={`${buttonBaseClasses} ${buttonActiveClasses}`}
          aria-label="Send message"
          disabled={!input.trim() || isLoading}
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </div>
  );
};

export default InputArea;