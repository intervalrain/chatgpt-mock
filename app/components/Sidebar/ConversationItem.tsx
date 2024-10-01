"use client";

import { Conversation } from "@/app/mock/conversationData";
import Link from "next/link";
import React, { useState } from "react";
import { Ellipsis } from "lucide-react";

interface ConversationItemProps {
  conversation: Conversation;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
}) => {
  const [showEllipsis, setShowEllipsis] = useState(false);

  return (
    <Link
      href={`/chat/${conversation.id}`}
      className="block py-2 hover:bg-gray-200 cursor-pointer rounded-md mx-4"
      onMouseEnter={() => setShowEllipsis(true)}
      onMouseLeave={() => setShowEllipsis(false)}
    >
      <div className="flex justify-between items-center">
        <div className="text-sm px-2 text-ellipsis text-nowrap overflow-hidden">
          {conversation.title}
        </div>
        <button className="py-0.5 px-2 text-gray-500 hover:text-black">
          {showEllipsis && <Ellipsis size={16} />}
        </button>
      </div>
    </Link>
  );
};

export default ConversationItem;
