import { Assistant } from "@/app/types";
import React, { useEffect, useRef, useState } from "react";
import AssistantCard from "../Assistants/AssistantCard";
import { getUUID } from "@/app/utils/uuid";
import { ChevronLeft, ChevronRight, SquareChevronDown } from "lucide-react";
import { error } from "console";

interface AssistantDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssistantDialog: React.FC<AssistantDialogProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [assistants] = useState<Assistant[]>([
    {
      id: getUUID(),
      emoji: "🧠",
      title: "Default",
      description: "一個通用的 DSM 助理",
      author: "Rain Hu",
      systemPrompt:
        "你是一個 DSM 的專家，你會用 markdown 與 latex(單錢號為 inline, 雙錢號為 block) 來整理資料。當遇到你沒有檢索到的內容，你會回答不知道。",
    },
    {
      id: getUUID(),
      emoji: "🧠",
      title: "PEI 助理",
      description: "擅長解釋不同的 design rules",
      author: "C.C.Chen",
      systemPrompt:
        "你是一個 DSM 的專家，你會用 markdown 與 latex(單錢號為 inline, 雙錢號為 block) 來整理資料。當遇到你沒有檢索到的內容，你會回答不知道。",
    },
    {
      id: getUUID(),
      emoji: "👨‍💻",
      title: "TD 助理",
      description: "擅長不同的 layout pattern",
      author: "W.H.Wang",
      systemPrompt:
        "你是一個 DSM 的專家，你會用 markdown 與 latex(單錢號為 inline, 雙錢號為 block) 來整理資料。當遇到你沒有檢索到的內容，你會回答不知道。",
    },
    {
      id: getUUID(),
      emoji: "🧠",
      title: "CE 助理",
      description: "擅長不同 technologies 的比較",
      author: "J.P.Lin",
      systemPrompt:
        "你是一個 DSM 的專家，你會用 markdown 與 latex(單錢號為 inline, 雙錢號為 block) 來整理資料。當遇到你沒有檢索到的內容，你會回答不知道。",
    },
    {
      id: getUUID(),
      emoji: "👨‍💻",
      title: "PED 助理",
      description: "擅長回答 backend 的設計問題",
      author: "Rain Hu",
      systemPrompt:
        "你是一個 DSM 的專家，你會用 markdown 與 latex(單錢號為 inline, 雙錢號為 block) 來整理資料。當遇到你沒有檢索到的內容，你會回答不知道。",
    },
  ]);

  const [editingAssistant, setEditingAssistant] = useState<Assistant | null>(
    null
  );
  const [activeAssistant, setActiveAssistant] = useState<Assistant | null>(
    null
  );

  const [showRightArrow, setShowRightArrow] = useState(false);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

	const checkScroll = () => {
		if (scrollContainerRef.current) {
			const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
			setShowLeftArrow(scrollLeft > 0);
			setShowRightArrow(scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth);
		}
	}

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

	const scroll = (direction: 'left' | 'right') => {
		if (scrollContainerRef.current) {
			const cardWidth = scrollContainerRef.current.offsetWidth / 3;
			const scrollAmout = direction === 'left' ? -cardWidth : cardWidth;
			scrollContainerRef.current.scrollBy({ left: scrollAmout, behavior: "smooth" });
			setTimeout(checkScroll, 500);
		}
	};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
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
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
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
					{showLeftArrow && (
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="text-gray-600" size={24} />
            </button>
          )}
          {showRightArrow && (
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
              onClick={() => scroll('right')}
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
