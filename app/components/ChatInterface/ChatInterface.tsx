"use client";

import React, { useState, useEffect, useRef } from "react";
import InputArea from "./InputArea";
import useChat from "@/app/hooks/useChat";
import Message from "./Message";

const ChatInterface: React.FC = () => {
  const { messages, sendMessage } = useChat();
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [isLatexRendered, setIsLatexRendered] = useState(false);

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

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
  }, [messages, isLatexRendered]);

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

  return (
    <div className="flex flex-col h-full">
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <Message
            key={index}
            content={message.content}
            role={message.role}
            id={message.id}
          />
        ))}
      </div>
      <div className="mt-auto">
        <InputArea onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;
