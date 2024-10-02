import { useState } from 'react';
import { useConversation } from '../context/ConversationContext';

export const useRenameConversation = () => {
  const { updateConversationTitle } = useConversation();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const startRenaming = (currentTitle: string) => {
    setIsRenaming(true);
    setNewTitle(currentTitle);
  };

  const cancelRenaming = () => {
    setIsRenaming(false);
    setNewTitle('');
  };

  const confirmRenaming = (conversationId: string) => {
    if (newTitle.trim()) {
      updateConversationTitle(conversationId, newTitle.trim());
      setIsRenaming(false);
      setNewTitle('');
    }
  };

  return { isRenaming, newTitle, setNewTitle, startRenaming, cancelRenaming, confirmRenaming };
};