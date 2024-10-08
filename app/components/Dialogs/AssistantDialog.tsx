import { Assistant } from "@/app/types";
import React, { useEffect, useRef, useState } from "react";
import FlippableAssistantCard from "../Assistants/FlippableAssistantCard";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useAssistant } from "@/app/context/AssistantContext";
import { Card } from "@/app/components/ui/Card";
import { useAuth } from "@/app/context/AuthContext";

interface AssistantDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssistantDialog: React.FC<AssistantDialogProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [loading, setLoading] = useState(false);
  const { activeAssistant, setActiveAssistant, assistants, setAssistants } = useAssistant();
  const [editingAssistant, setEditingAssistant] = useState<Assistant | null>(null);

  const { user } = useAuth();

  const [showRightArrow, setShowRightArrow] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleEdit = (updatedAssistant: Assistant) => {
    setAssistants(prevAssistants => 
      prevAssistants.map(a => a.id === updatedAssistant.id ? updatedAssistant : a)
    );
  };

  const handleApply = (assistant: Assistant) => {
    setActiveAssistant(assistant);
  };

  const handleDelete = (assistantToDelete: Assistant) => {
    setAssistants(prevAssistants => prevAssistants.filter(a => a.id !== assistantToDelete.id));
  };

  const handleAddNewAssistant = () => {
    const newAssistant: Assistant = {
      id: Date.now().toString(),
      author: user?.userName as string,
      emoji: "😊",
      title: "New Assistant",
      description: "",
      systemPrompt: "",
    };
    setAssistants(prevAssistants => [...prevAssistants, newAssistant]);
    setEditingAssistant(newAssistant);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth / 3;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div ref={dialogRef} className="bg-white rounded-2xl p-6 w-[90vw] max-w-[1200px] h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">我的助理</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
        <div className="my-4 h-px bg-gray-200" role="none" />
        <div className="relative flex-grow overflow-hidden">
          {loading ? (
            <div className="text-center py-4">Loading assistants...</div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="h-full p-4 flex space-x-6 overflow-x-auto scrollbar-hide"
              onScroll={checkScroll}
            >
              {assistants.map((assistant) => (
                <div key={assistant.id} className="flex-shrink-0 w-1/3 max-w-[350px]">
                  <FlippableAssistantCard
                    assistant={assistant}
                    onEdit={handleEdit}
                    onApply={handleApply}
                    onDelete={handleDelete}
                    isActive={assistant.id === activeAssistant?.id}
                  />
                </div>
              ))}
              <div className="flex-shrink-0 w-1/3 max-w-[350px]">
                <Card
                  className="w-full h-[480px] flex items-center justify-center cursor-pointer hover:bg-gray-50"
                  onClick={handleAddNewAssistant}
                >
                  <Plus size={48} className="text-gray-400" />
                </Card>
              </div>
            </div>
          )}

          {showLeftArrow && (
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="text-gray-600" size={24} />
            </button>
          )}
          {showRightArrow && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="text-gray-600" size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssistantDialog;