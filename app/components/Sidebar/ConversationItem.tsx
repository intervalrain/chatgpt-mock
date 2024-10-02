"use client";

import { Conversation } from "@/app/types";
import React, { useRef, useState } from "react";
import { Ellipsis, Package2, Pencil, Share, Trash2 } from "lucide-react";
import Menu from "../ui/Menu";
import { useConversation } from "@/app/context/ConversationContext";
import { RenameButton } from "../ui/RenameButton";
import { ShareButton } from "../ui/ShareButton";

interface ConversationItemProps {
  conversation: Conversation;
  onClick: () => void;
  active?: boolean;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  onClick,
  active,
}) => {
  const [showEllipsis, setShowEllipsis] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ellipsisRef = useRef<HTMLButtonElement>(null);
  const { removeConversation, archiveConversation } = useConversation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div
      className={`block py-2 hover:bg-gray-200 rounded-md mx-4 ${
        active && "bg-gray-200"
      }`}
      onMouseEnter={() => setShowEllipsis(true)}
      onMouseLeave={() => setShowEllipsis(false)}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div className="text-sm px-2 text-ellipsis text-nowrap overflow-hidden">
          {conversation.title}
        </div>
        <button
          ref={ellipsisRef}
          onClick={toggleMenu}
          className="py-0.5 px-2 text-gray-500 hover:text-black"
        >
          {showEllipsis && <Ellipsis size={16} />}
        </button>
        <Menu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          align="left"
          anchorEl={ellipsisRef.current}
        >
          <ShareButton 
            conversationId={conversation.id}
            className="flex w-11/12 items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            <Share className="mr-3 h-5 w-5" /> 分享
          </ShareButton>
          <RenameButton
            conversationId={conversation.id}
            currentTitle={conversation.title}
            className="flex w-11/12 items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            <Pencil className="mr-3 h-5 w-5" /> 重新命名
          </RenameButton>
          <button
            onClick={() => archiveConversation(conversation.id)}
            className="flex w-11/12 items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            <Package2 className="mr-3 h-5 w-5" /> {conversation.archived ? "放棄封存" : "封存"}
          </button>
          <button
            onClick={() => {
              if (window.confirm("確定要刪除這個對話嗎？"))
                removeConversation(conversation.id);
            }}
            className="flex w-11/12 items-center m-2 px-2 py-2 rounded-md text-sm text-red-600 hover:bg-gray-100"
            role="menuitem"
          >
            <Trash2 className="mr-3 h-5 w-5" /> 刪除
          </button>
        </Menu>
      </div>
    </div>
  );
};

export default ConversationItem;
