import { useCallback, useEffect, useRef, useState } from "react";
import { Conversation, Message } from "../types";
import { getUUID } from "../utils/uuid";
import { useApp } from "../context/AppContext";
import { useConversation } from "../context/ConversationContext";

export const useChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { model } = useApp();
  const {
    conversations,
    currentConversationId,
    addConversation,
    addMessageToConversation,
    setCurrentConversationId,
    updateConversationTitle,
    updateMessage,
  } = useConversation();

  const currentMessages = currentConversationId 
    ? conversations.find((c) => c.id === currentConversationId)?.messages || []
    : [];

  const getTitle = (content: string): string => {
    const words = content.split(" ");
    let title = "";
    for (const word of words) {
      if (title.length > 32) {
        break;
      }
      title += " " + word;
    }
    return title.trim();
  }

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: getUUID(),
        content,
        role: "user",
      };

      let conversationId = currentConversationId;
      const title = getTitle(content);
      if (!conversationId) {
        const newConversation: Conversation = {
          id: getUUID(),
          title: title,
          messages: [userMessage],
          date: new Date(),
        };
        addConversation(newConversation);
        conversationId = newConversation.id;
        setCurrentConversationId(conversationId);
      } else {
        if (currentMessages.length === 1) {
          updateConversationTitle(conversationId, title);
        }
        addMessageToConversation(conversationId, userMessage);
      }

      setIsLoading(true);

      try {
        const response = await fetch("/api/ollama", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
            prompt: content,
            stream: true,
          }),
        });

        if (!response.body) {
          throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let assistantMessage: Message = {
          id: getUUID(),
          content: "",
          role: "assistant",
        }
        addMessageToConversation(conversationId!, assistantMessage);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.trim() === "") continue;
            const parsedLine = JSON.parse(line);
            if (parsedLine.response) {
              assistantMessage.content += parsedLine.response;
              updateMessage(currentConversationId!, assistantMessage.content);
            }
          }
        }
      } catch (error) {
        console.error("Error in text generation:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [model, currentConversationId, addConversation, addMessageToConversation, updateMessage]
  );

  return { messages: currentMessages, sendMessage, isLoading };
};

export default useChat;
