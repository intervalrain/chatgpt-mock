import React, { createContext, useState, useContext, useEffect } from 'react';
import { Assistant } from '@/app/types';

interface AssistantContextType {
  activeAssistant: Assistant | null;
  setActiveAssistant: (assistant: Assistant | null) => void;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const AssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeAssistant, setActiveAssistant] = useState<Assistant | null>(null);

  useEffect(() => {
    const savedAssistant = localStorage.getItem('activeAssistant');
    if (savedAssistant) {
      setActiveAssistant(JSON.parse(savedAssistant));
    }
  }, []);

  const updateActiveAssistant = (assistant: Assistant | null) => {
    setActiveAssistant(assistant);
    if (assistant) {
      localStorage.setItem('activeAssistant', JSON.stringify(assistant));
    } else {
      localStorage.removeItem('activeAssistant');
    }
  };

  return (
    <AssistantContext.Provider value={{ activeAssistant, setActiveAssistant: updateActiveAssistant }}>
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (context === undefined) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};