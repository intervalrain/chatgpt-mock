import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { CheckCircle, Trash2 } from "lucide-react";
import { Assistant } from "@/app/types";
import dynamic from 'next/dynamic';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface FlippableAssistantCardProps {
  assistant: Assistant;
  onEdit: (assistant: Assistant) => void;
  onApply: (assistant: Assistant) => void;
  onDelete: (assistant: Assistant) => void;
  isActive: boolean;
}

const FlippableAssistantCard: React.FC<FlippableAssistantCardProps> = ({
  assistant,
  onEdit,
  onApply,
  onDelete,
  isActive,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [editedAssistant, setEditedAssistant] = useState(assistant);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedAssistant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onEdit(editedAssistant);
    setIsFlipped(false);
  };

  const handleDelete = () => {
    onDelete(assistant);
  };

  const handleEmojiClick = (emojiObject: any) => {
    setEditedAssistant((prev) => ({ ...prev, emoji: emojiObject.emoji }));
    setShowEmojiPicker(false);
  };

  const cardClass = `w-full h-full flex flex-col justify-between cursor-pointer transition-all duration-300
    ${isActive ? "ring-2 ring-blue-500" : "hover:shadow-lg"}
    hover:bg-gray-50`;

  return (
    <div className="flip-card w-full h-[480px]">
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front side */}
        <Card
          className={`flip-card-front ${cardClass}`}
          onClick={() => onApply(assistant)}
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="flex items-center">
                <span className="mr-2 text-2xl">{assistant.emoji}</span>
                <span className="text-lg">{assistant.title}</span>
              </span>
              {isActive && <CheckCircle className="text-blue-500" size={20} />}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col space-y-4 overflow-y-auto">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Author:</p>
              <p className="text-sm text-gray-500">{assistant.author}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Description:</p>
              <p className="text-sm text-gray-500">{assistant.description}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">System Prompt:</p>
              <p className="text-sm text-gray-500">{assistant.systemPrompt}</p>
            </div>
          </CardContent>
        <button
            onClick={handleFlip}
            className="m-4 transition-colors duration-300 rounded-lg bg-blue-600 text-white text-sm p-2 hover:bg-blue-700"
        >
            Edit
        </button>
        </Card>

        {/* Back side */}
        <Card className={`flip-card-back ${cardClass}`}>
          <CardHeader>
            <CardTitle className="text-lg">Edit Assistant</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between">
            <div className="space-y-2">
              <div className="relative">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="w-full p-2 border rounded text-sm text-left"
                >
                  {editedAssistant.emoji} Choose Emoji
                </button>
                {showEmojiPicker && (
                  <div className="absolute z-10">
                    <Picker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>
              <input
                name="title"
                value={editedAssistant.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-sm"
                placeholder="Title"
              />
              <textarea
                name="description"
                value={editedAssistant.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-sm resize-none"
                placeholder="Description"
                rows={3}
              />
              <textarea
                name="systemPrompt"
                value={editedAssistant.systemPrompt}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-sm resize-none"
                placeholder="System Prompt"
                rows={5}
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleDelete}
                className="transition-colors duration-300 rounded-lg bg-red-600 text-white text-sm p-2 hover:bg-red-700"
              >
                <Trash2 size={16} />
              </button>
              <div>
                <button
                  onClick={handleFlip}
                  className="transition-colors duration-300 rounded-lg bg-gray-300 text-black text-sm p-2 hover:bg-gray-400 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="transition-colors duration-300 rounded-lg bg-blue-600 text-white text-sm p-2 hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlippableAssistantCard;