'use client';

import React, { useState } from 'react';
import { Share } from 'lucide-react';
import { useConversation } from '@/app/context/ConversationContext';
import { encodeConversation } from '@/app/utils/shareUtils';

interface ShareButtonProps {
  conversationId: string;
  children: React.ReactNode;
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ conversationId, children, className }) => {
  const { conversations } = useConversation();
  const [sharedLink, setSharedLink] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string>('');

  const handleShare = async () => {
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

  const copyToClipboard = async () => {
    if (!sharedLink) return;

    if (!navigator.clipboard) {
      setCopySuccess('Clipboard not supported');
      return;
    }
    try {
      await navigator.clipboard.writeText(sharedLink);
      setCopySuccess('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopySuccess('Failed to copy');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className={className}
        disabled={isSharing}
      >
        {children}
      </button>
      {sharedLink && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-white border rounded shadow-lg">
          <p className="mb-2">分享鏈接：</p>
          <input 
            type="text" 
            value={sharedLink} 
            readOnly 
            className="w-full p-1 border rounded"
          />
          <button 
            onClick={copyToClipboard}
            className="mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            複製鏈接
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};