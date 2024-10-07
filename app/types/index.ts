export interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
}

export interface Conversation {
    id: string;
    title: string;
    messages: Message[];
    date: Date;
    archived?: boolean;
  }

export type LlmModel = "mistral"; // | "llama2";

export interface Assistant {
  id: string;
  emoji?: string;
  title: string;
  description: string;
  author: string;
  systemPrompt: string;
}