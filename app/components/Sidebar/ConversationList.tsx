import { Conversation, mockConversations } from "@/app/mock/conversationData";
import React from "react";
import ConversationItem from "./ConversationItem";

const ConversationList: React.FC = () => {
  const groupConversationsByDate = (conversations: Conversation[]) => {
    const grouped: { [key: string]: Conversation[] } = {};
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    conversations.forEach((conversation) => {
      const diffDays = Math.round(
        Math.abs((today.getTime() - conversation.date.getTime()) / oneDay)
      );

      let group: string;
      if (diffDays === 0) {
        group = "Today";
      } else if (diffDays === 1) {
        group = 'Yesterday';
      } else if (diffDays <= 7) {
        group = "Past 7 Days";
      } else if (diffDays <= 30) {
        group = "Past 30 Days";
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
  };

  const gropuedConversations = groupConversationsByDate(mockConversations);

  return (
    <div className="flex-1 overflow-y-auto space-y-6">
      {Object.entries(gropuedConversations).map(([group, conversation]) => (
        <div key={group}>
          <h3 className="px-4 py-2 text-xs font-semibold">{group}</h3>
          {conversation.map((conversation) => (
            <ConversationItem
              key={conversation.id} 
              conversation={conversation}
             />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
