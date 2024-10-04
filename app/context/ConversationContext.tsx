'use client';

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Conversation, Message } from "../types";
import { getUUID } from "../utils/uuid";
import { useApp } from "./AppContext";

interface ConversationContextType {
  conversations: Conversation[];
  currentConversationId: string | null;
  addConversation: (conversation: Conversation) => void;
  setCurrentConversationId: (id: string) => void;
  updateConversationTitle: (id: string, title: string) => void;
  switchConversation: (id: string) => void;
  addMessageToConversation: (id: string, message: Message) => void;
  updateMessage: (id: string, content: string) => void;
  removeConversation: (id: string) => void;
  createNewChat: () => void;
  archiveConversation: (id: string) => void;
  cleanUpOldConversations: () => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);
const LOCAL_STORAGE_KEY = "dsmbot_conversations";

export const ConversationProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
	const [conversations, setConversations] = useState<Conversation[]>(() => {
    if (typeof window !== 'undefined') {
      const storedConversations = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedConversations) {
        return JSON.parse(storedConversations, (key, value) => {
          return key === 'date' 
            ? new Date(value)
            : value;
        })
      }
    }
    return [];
  });
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const { maxConversations, setMaxConversations } = useApp();

  const addConversation = useCallback((conversation: Conversation) => {
		setConversations(prev => [...prev, conversation]);
		setCurrentConversationId(conversation.id);
	}, []);

  const updateConversationTitle = useCallback((id: string, title: string) => {
    setConversations(prev => prev.map(conv => conv.id === id ? { ...conv, title } : conv));
  }, []);

  const switchConversation = useCallback((id: string) => {
    setCurrentConversationId(id);
  }, []);

  const addMessageToConversation = useCallback((id: string, message: Message) => {
    setConversations(prev => prev.map(conv => 
			conv.id === id ? { ...conv, messages: [...conv.messages, message] } : conv
		));
	}, []);

  const updateMessage = useCallback((id: string, content: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? {
        ...conv,
        messages: conv.messages.map((msg, index) => 
          index === conv.messages.length - 1 ? { ...msg, content } : msg
        )
      } : conv
    ));
  }, []);

  const removeConversation = useCallback((id: string) => {
    setConversations(prevConversations => 
      prevConversations.filter(conversation => conversation.id !== id)
    );
  }, []);

  const createNewChat = useCallback(() => {
    const newConversation: Conversation = {
      id: getUUID(),
      title: "新的對話",
      messages: [{
        id: getUUID(),
        content: "哈囉！有什麼我可以幫您的嗎？",
        role: "assistant",
      }],
      date: new Date(),
    };
    addConversation(newConversation);
  }, [addConversation]);

  const archiveConversation = useCallback((id: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? {...conv, archived: !conv.archived } : conv
    ));
  }, []);

  const cleanUpOldConversations = useCallback(() => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() - 30);

    setConversations(prev =>
      prev.filter(conv => new Date(conv.date) > dueDate && !conv.archived)
          .slice(-maxConversations)
    );
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

  useEffect(() => {
    if (conversations.length === 0) {
      createNewChat();
    } else if (!currentConversationId) {
      setCurrentConversationId(conversations[conversations.length-1].id);
    }
  }, [conversations, currentConversationId, createNewChat]);

  return (
    <ConversationContext.Provider value={{
      conversations,
      currentConversationId,
      addConversation,
      setCurrentConversationId,
      updateConversationTitle,
      switchConversation,
      addMessageToConversation,
      updateMessage,
      removeConversation,
      createNewChat,
      archiveConversation,
      cleanUpOldConversations,
    }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
};