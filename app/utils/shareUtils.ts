import { Conversation } from '../types';

export function encodeConversation(conversation: Conversation): string {
  const jsonString = JSON.stringify(conversation);
  return encodeURIComponent(jsonString);
}

export function decodeConversation(encodedString: string): Conversation {
  try {
    const jsonString = decodeURIComponent(encodedString);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decoding conversation:', error);
    throw new Error('Invalid encoded conversation');
  }
}