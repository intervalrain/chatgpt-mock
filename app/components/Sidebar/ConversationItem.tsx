import { Conversation } from '@/app/mock/conversationData';
import Link from 'next/link';
import React from 'react'

interface ConversationItemProps {
  conversation: Conversation;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation }) => {
  return (
    <Link href={`/chat/${conversation.id}`} className="block py-2 hover:bg-gray-200 cursor-pointer rounded-md mx-4">
      <div className="text-sm px-2">{conversation.title}</div>
    </Link>
  )
}

export default ConversationItem