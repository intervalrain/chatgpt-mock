import { useState } from 'react';
import { useConversation } from '../context/ConversationContext';
import { encodeConversation } from '../utils/shareUtils';

export const useShareConversation = () => {
  const { conversations } = useConversation();
  const [sharedLink, setSharedLink] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shareConversation = async (conversationId: string) => {
    setIsSharing(true);
    setError(null);

    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) {
      setError('Conversation not found');
      setIsSharing(false);
      return;
    }

    try {
      const encodedConversation = encodeConversation(conversation);
      const link = `${window.location.origin}/shared/${encodedConversation}`;
      setSharedLink(link);
    } catch (err) {
      setError('Failed to share conversation');
    } finally {
      setIsSharing(false);
    }
  };

  return { shareConversation, sharedLink, isSharing, error };
};