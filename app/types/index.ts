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
    input?: string;
  }

export type LlmModel = "mistral"; 

export interface Assistant {
  id: string;
  emoji?: string;
  title: string;
  description: string;
  author: string;
  systemPrompt: string;
}

export const themes = [
  { value: 'light', label: '淺色' },
  { value: 'dark', label: '深色' }
];

export const languages = [
  { value: 'zh-TW', label: '繁體中文'},
  { value: 'en', label: 'English' }
]

