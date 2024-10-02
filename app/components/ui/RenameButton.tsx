import React from 'react';
import { Pencil, Check, X } from 'lucide-react'; 
import { useRenameConversation } from '@/app/hooks/useRenameConversation';

interface RenameButtonProps {
  conversationId: string;
  currentTitle: string;
  children: React.ReactNode;
  className?: string;
}

export const RenameButton: React.FC<RenameButtonProps> = ({ conversationId, currentTitle, className, children }) => {
  const { 
    isRenaming, 
    newTitle, 
    setNewTitle, 
    startRenaming, 
    cancelRenaming, 
    confirmRenaming 
  } = useRenameConversation();

  if (!isRenaming) {
    return (
      <button
        onClick={() => startRenaming(currentTitle)}
        className={className}
        role="menuitem"
      >
        {children}
      </button>
    );
  }

  return (
    <div className="flex w-11/12 items-center m-2 px-2 py-2 rounded-md text-sm">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="flex-grow w-3/4 mr-2 px-2 py-1 border rounded"
        autoFocus
      />
      <button
        onClick={() => confirmRenaming(conversationId)}
        className="p-1 rounded-full text-green-600 hover:bg-green-100"
      >
        <Check className="h-5 w-5" />
      </button>
      <button
        onClick={cancelRenaming}
        className="p-1 rounded-full text-red-600 hover:bg-red-100"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};