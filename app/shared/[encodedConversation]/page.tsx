'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Conversation, Message as MessageType } from '../../types';
import { decodeConversation } from '../../utils/shareUtils';
import Footer from '@/app/components/layout/Footer';
import Header from '@/app/components/layout/Header';
import Message from '@/app/components/ChatInterface/Message';
import InputArea from '@/app/components/ChatInterface/InputArea';

const SharedConversationPage: React.FC = () => {
  const params = useParams();
  const encodedConversation = params.encodedConversation as string;
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [isLatexRendered, setIsLatexRendered] = useState(false);
  
  useEffect(() => {
    if (encodedConversation) {
      try {
        const decodedConversation = decodeConversation(encodedConversation);
        setConversation(decodedConversation);
      } catch (err) {
        setError('Failed to load shared conversation');
      }
    }
  }, [encodedConversation]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      const scrollHeight = messageContainerRef.current.scrollHeight;
      const height = messageContainerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      messageContainerRef.current.scrollTop =
        maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation, isLatexRendered]);

  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    if (!messageContainer) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const addedNodes = Array.from(mutation.addedNodes);
          const hasLatex = addedNodes.some(
            (node) => node instanceof Element && node.querySelector(".katex")
          );
          if (hasLatex) {
            setIsLatexRendered(true);
          }
        }
      });
      scrollToBottom();
    });

    observer.observe(messageContainer, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  const renderConversation = () => {
    if (error) {
      return <div className="p-4 text-red-500">{error}</div>;
    }

    if (!conversation) {
      return <div className="p-4">Loading shared conversation...</div>;
    }

    return (
      <>
        <h1 className="text-2xl font-bold mb-4 p-4">{conversation.title}</h1>
        <div
          ref={messageContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {conversation.messages.map((message: MessageType, index: number) => (
            <Message
              key={index}
              content={message.content}
              role={message.role}
              id={`shared-${index}`}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col">
        {renderConversation()}
      </main>
      <Footer />
    </div>
  );
};

export default SharedConversationPage;