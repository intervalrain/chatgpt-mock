import { useCallback, useEffect, useState } from "react";
import { Message } from "../types";
import { getUUID } from "../utils/uuid";

// const mockAIResponse = async (message: string): Promise<string> => {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     return `AI response to: "${message}"`;
// };

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

  // useEffect(() => {
  //     const initialMessages: Message[] = [
  //         { id: getUUID(), content: "Hello! How can I help you today?", role: "assistant" },
  //         { id: getUUID(), content: "What services do you offer?", role: "user" },
  //         { id: getUUID(), content: "We offer a variety of services including web development, app development, and consulting.", role: "assistant" },
  //         { id: getUUID(), content: "Can you help me with React?", role: "user" },
  //         { id: getUUID(), content: "Sure! React is a powerful library for building user interfaces. What specifically would you like to know?", role: "assistant" },
  //         { id: getUUID(), content: "I'm having trouble with state management.", role: "user" },
  //         { id: getUUID(), content: "State management can be tricky. Have you tried using Redux or Context API?", role: "assistant" },
  //         { id: getUUID(), content: "I've heard of Redux, but I'm not sure how to use it.", role: "user" },
  //         { id: getUUID(), content: "Redux is a predictable state container for JavaScript apps. It helps manage the state across your entire app.", role: "assistant" },
  //         { id: getUUID(), content: "That sounds helpful! Can you show me an example?", role: "user" },
  //         { id: getUUID(), content: "Hello! How can I help you today?", role: "assistant" },
  //     ];
  //     setMessages(initialMessages);
  // }, []);

  return { messages, sendMessage, isLoading };
};

export default useChat;
