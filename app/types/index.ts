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
  }

export type LlmModel = "mistral"; // | "llama2";
