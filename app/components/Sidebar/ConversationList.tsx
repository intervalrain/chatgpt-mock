import { Conversation } from "@/app/types";
import React, { useMemo } from "react";
import ConversationItem from "./ConversationItem";
import { useConversation } from "@/app/context/ConversationContext";

const ConversationList: React.FC = () => {
  const { conversations, switchConversation, currentConversationId } = useConversation();
  
  const groupConversationsByDate = useMemo(() => {
    const grouped: { [key: string]: Conversation[] } = {};
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    const sortedConversations = [...conversations].sort((a, b) => 
      b.date.getTime() - a.date.getTime()
    );

    sortedConversations.forEach((conversation) => {
      const diffDays = Math.round(
        Math.abs((today.getTime() - conversation.date.getTime()) / oneDay)
      );

      let group: string;
      if (conversation.archived) { 
        group = "已封存";
      } else if (diffDays === 0) {
        group = "今天";
      } else if (diffDays === 1) {
        group = "昨天";
      } else if (diffDays <= 7) {
        group = "過去 7 天";
      } else if (diffDays <= 30) {
        group = "過去 30 天";
      } else {
        group = conversation.date.toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        });
      }

      if (!grouped[group]) {
        grouped[group] = [];
      }
      grouped[group].push(conversation);
    });

    return grouped;
  }, [conversations]);

  const sortedGroups = useMemo(() => {
    const groupOrder = ["已封存", "今天", "昨天", "過去 7 天", "過去 30 天"];
    return Object.keys(groupConversationsByDate).sort((a, b) => {
      const indexA = groupOrder.indexOf(a);
      const indexB = groupOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return b.localeCompare(a);
    });
  }, [groupConversationsByDate]);

  return (
    <div className="flex-1 overflow-y-auto space-y-6">
      {sortedGroups.map((group) => (
        <div key={group}>
          <h3 className="px-4 py-2 text-xs font-semibold">{group}</h3>
          {groupConversationsByDate[group].map((conversation) => (
            <ConversationItem
              key={conversation.id} 
              conversation={conversation}
              onClick={() => switchConversation(conversation.id)}
              active={currentConversationId === conversation.id}
             />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ConversationList;