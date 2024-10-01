import { useCallback, useEffect, useState } from "react";
import { Message } from "../types";
import { getUUID } from "../utils/uuid";

const mockAIResponse = async (message: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `AI response to: "${message}"`;
};

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = useCallback(async (content: string) => {
        const userMessage: Message = {
            id: getUUID(),
            content,
            role: "user"
        };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        try {
            const aiResponse = await mockAIResponse(content);
            const aiMessage: Message = {
                id: getUUID(),
                content: aiResponse,
                role: "assistant"
            };
            setMessages(prevMessages => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error getting AI response:', error);
        }
    }, []);

    useEffect(() => {
        const initialMessages: Message[] = [
            { id: getUUID(), content: "Hello! How can I help you today?", role: "assistant" },
            { id: getUUID(), content: "What services do you offer?", role: "user" },
            { id: getUUID(), content: "We offer a variety of services including web development, app development, and consulting.", role: "assistant" },
            { id: getUUID(), content: "Can you help me with React?", role: "user" },
            { id: getUUID(), content: "Sure! React is a powerful library for building user interfaces. What specifically would you like to know?", role: "assistant" },
            { id: getUUID(), content: "I'm having trouble with state management.", role: "user" },
            { id: getUUID(), content: "State management can be tricky. Have you tried using Redux or Context API?", role: "assistant" },
            { id: getUUID(), content: "I've heard of Redux, but I'm not sure how to use it.", role: "user" },
            { id: getUUID(), content: "Redux is a predictable state container for JavaScript apps. It helps manage the state across your entire app.", role: "assistant" },
            { id: getUUID(), content: "That sounds helpful! Can you show me an example?", role: "user" },
            { id: getUUID(), content: "Hello! How can I help you today?", role: "assistant" },
        ];
        setMessages(initialMessages);
    }, []);
    

    return { messages, sendMessage };
}

export default useChat;