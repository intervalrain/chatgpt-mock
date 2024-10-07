import React, { createContext, useState, useContext, useEffect } from 'react';
import { Assistant } from '@/app/types';

interface AssistantContextType {
  activeAssistant: Assistant | null;
  setActiveAssistant: (assistant: Assistant | null) => void;
  assistants: Assistant[];
  fetchAssistants: () => Promise<void>;
  isLoading: boolean;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const AssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children, ...props }) => {
  const [activeAssistant, setActiveAssistant] = useState<Assistant | null>(null);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAssistants = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/assistants");
      if (!response.ok) {
        throw new Error("Failed to fetch assistants");
      }
      const data = await response.json();
      setAssistants(data);
    } catch (error) {
      console.error("Error fetching assistants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  useEffect(() => {
    const savedAssistant = localStorage.getItem('activeAssistant');
    if (savedAssistant) {
      setActiveAssistant(JSON.parse(savedAssistant));
    } else if (assistants.length > 0) {
      setActiveAssistant(assistants[0]);
    }
  }, [assistants]);

  const updateActiveAssistant = (assistant: Assistant | null) => {
    setActiveAssistant(assistant);
    if (assistant) {
      localStorage.setItem('activeAssistant', JSON.stringify(assistant));
    } else {
      localStorage.removeItem('activeAssistant');
    }
  };

  return (
    <AssistantContext.Provider value={{ 
      activeAssistant, 
      setActiveAssistant: updateActiveAssistant, 
      assistants,
      fetchAssistants,
      isLoading 
      }}>
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