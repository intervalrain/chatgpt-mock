import { Assistant } from "@/app/types";
import React, { useEffect, useRef, useState } from "react";
import AssistantCard from "../Assistants/AssistantCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAssistant } from "@/app/context/AssistantContext";

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
  const { activeAssistant, setActiveAssistant, assistants } = useAssistant();
  const [editingAssistant, setEditingAssistant] = useState<Assistant | null>(
    null
  );

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
      const { scrollWidth, clientWidth, scrollLeft } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(
        scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth
      );
    }
  };

  const handleEdit = (assistant: Assistant) => {
    setEditingAssistant(assistant);
  };

  const handleApply = (assistant: Assistant) => {
    setActiveAssistant(assistant);
    console.log(`Applying Assistant: ${assistant.title}`);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth / 3;
      const scrollAmout = direction === "left" ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmout,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div ref={dialogRef} className="bg-white rounded-2xl p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">我的助理</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="my-4 h-px bg-gray-200" role="none" />
        <div className="relative">
          {loading ? (
            <div className="text-center py-4">Loading assistants...</div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="p-2 flex space-x-4 overflow-x-auto scrollbar-hide"
              onScroll={() => {
                if (scrollContainerRef.current) {
                  const { scrollWidth, clientWidth, scrollLeft } =
                    scrollContainerRef.current;
                  setShowRightArrow(
                    scrollWidth > clientWidth &&
                      scrollLeft < scrollWidth - clientWidth
                  );
                }
              }}
            >
              {assistants.map((assistant) => (
                <div key={assistant.id} className="flex-shrink-0 w-1/3">
                  <AssistantCard
                    assistant={assistant}
                    onEdit={handleEdit}
                    onApply={handleApply}
                    isActive={assistant.id === activeAssistant?.id}
                  />
                </div>
              ))}
            </div>
          )}

          {showLeftArrow && (
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="text-gray-600" size={24} />
            </button>
          )}
          {showRightArrow && (
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
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
