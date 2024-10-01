export interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
}

export type LlmModel = "GPT-3.5-turbo" | "GPT-4o-for-text" | "Mistral";
