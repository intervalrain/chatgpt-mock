import { useCallback, useState } from "react";
import { Message } from "../types";
import { getUUID } from "../utils/uuid";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: getUUID(),
        content,
        role: "user",
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setIsLoading(true);

      try {
        const prompt =
          messages
            .map(
              (msg) =>
                `${msg.role === "user" ? "Human" : "Assistant"}: ${msg.content}`
            )
            .join("\n") + `\nHuman: ${content}\Assistant:`;

        const response = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "mistral",
            prompt: content,
            stream: true,
          }),
        });

        if (!response.body) {
          throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.trim() === "") continue;
            const parsedLine = JSON.parse(line);
            if (parsedLine.response) {
              fullResponse += parsedLine.response;
              setMessages((prevMessages) => {
                const lastMessage = prevMessages[prevMessages.length - 1];
                if (lastMessage.role === "assistant") {
                  return [
                    ...prevMessages.slice(0, -1),
                    {
                      ...lastMessage,
                      content: lastMessage.content + parsedLine.response,
                    },
                  ];
                } else {
                  return [
                    ...prevMessages,
                    {
                      id: Date.now().toString(),
                      role: "assistant",
                      content: parsedLine.response,
                    },
                  ];
                }
              });
            }
          }
        }
      } catch (error) {
        console.error("Error in text generation:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  return { messages, sendMessage, isLoading };
};

export default useChat;
