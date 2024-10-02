export interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
}

export type LlmModel = "mistral"; // | "llama2";
