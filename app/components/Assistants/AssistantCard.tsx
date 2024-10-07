import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { CheckCircle } from "lucide-react";
import { Assistant } from "@/app/types";

interface AssistantCardProps {
  assistant: Assistant;
  onEdit: (assistant: Assistant) => void;
  onApply: (assistant: Assistant) => void;
  isActive: boolean;
}

const AssistantCard: React.FC<AssistantCardProps> = ({
  assistant,
  onEdit,
  onApply,
  isActive,
}) => {
  const { id, emoji, title, description, author, systemPrompt } = assistant;

  return (
    <Card
      className={`w-full h-64 flex flex-col justify-between cursor-pointer transition-all duration-300
        ${isActive ? "ring-2-ring-blue-500" : "hover:shadow-lg hover:scale-105"}
        hover:bg-gray-50`}
      onClick={() =>
        onApply({ id, emoji, title, description, author, systemPrompt })
      }
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="flex items-center">
            <span className="mr-2">{emoji}</span>
            {title}
          </span>
          {isActive && <CheckCircle className="text-blue-500" size={20} />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <span className="flex items-baseline space-x-2">
          <p className="text-base font-semibold text-gray-800 mb-2">Author:</p>
          <p className="text-sm text-gray-800 mb-2">{author}</p>
        </span>
				<span>
          <p className="text-sm text-gray-500 mb-2">{description}</p>
        </span>
      </CardContent>
      <div className="p-4 mt-auto">
        <button
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onEdit({ id, emoji, title, description, author, systemPrompt });
          }}
          className="transition-colors duration-300 rounded-lg bg-blue-600 text-white text-sm p-2 hover:shadow-lg hover:scale-105"
        >
          Edit
        </button>
      </div>
    </Card>
  );
};

export default AssistantCard;
