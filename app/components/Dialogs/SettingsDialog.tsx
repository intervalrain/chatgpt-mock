import React, { useState, useRef, useEffect } from "react";
import Menu from "../ui/Menu";
import { Check, ChevronDown } from "lucide-react";
import { languages, themes } from "@/app/types";
import { useConversation } from "@/app/context/ConversationContext";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<"zh-TW" | "en">("zh-TW");
  const [temperature, setTemperature] = useState<number>(0.1);
  const [topK, setTopK] = useState<number>(5);
  const [maxTokens, setMaxTokens] = useState<number>(4000);
  const [history, setHistory] = useState<number>(30);

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);

  const { conversations, archiveConversation, removeConversation } =
    useConversation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleArchiveAll = () => {
    conversations.forEach((conversation) => {
      if (!conversation.archived) {
        archiveConversation(conversation.id);
      }
    });
  };

  const handleUnarchiveAll = () => {
    conversations.forEach((conversation) => {
      if (conversation.archived) {
        archiveConversation(conversation.id);
      }
    });
  };

  const handleDeleteAllConversations = () => {
    if (window.confirm("確定要刪除這個對話嗎？")) {
      conversations.forEach((conversation) => {
        if (!conversation.archived) {
          removeConversation(conversation.id);
        }
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={dialogRef}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full h-1/2 overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">設定</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="my-4 h-px bg-gray-200" role="none" />

        <div className="space-y-4">
          <div className="flex space-x-4 border-b">
            <button
              className={`py-2 px-4 ${
                activeTab === "general" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setActiveTab("general")}
            >
              一般
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "advanced" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setActiveTab("advanced")}
            >
              進階
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "management" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setActiveTab("management")}
            >
              對話管理
            </button>
          </div>

          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="flex justify-between text-nowrap items-center">
                <p className="font-semibold">主題</p>
                <button
                  ref={themeButtonRef}
                  className="flex items-center justify-between w-auto p-2 font-semibold text-gray-600 rounded-md hover:bg-gray-100"
                  onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                >
                  <div className="flex items-center">
                    <span className="mr-2">
                      {themes.find((option) => option.value === theme)?.label}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
                <Menu
                  isOpen={themeMenuOpen}
                  onClose={() => setThemeMenuOpen(false)}
                  align="left"
                  anchorEl={themeButtonRef.current}
                >
                  {themes.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setTheme(option.value as "light" | "dark");
                        setThemeMenuOpen(false);
                      }}
                      className="flex w-11/12 items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex w-full items-center justify-between">
                        <div>{option.label}</div>
                        <div>
                          {option.value === theme && (
                            <Check className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </Menu>
              </div>
              <div className="flex justify-between text-nowrap items-center">
                <span className="font-semibold">語言</span>
                <button
                  ref={languageButtonRef}
                  className="flex items-center justify-between w-auto p-2 font-semibold text-gray-600 rounded-md hover:bg-gray-100"
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                >
                  <div className="flex items-center">
                    <span className="mr-2">
                      {
                        languages.find((option) => option.value === language)
                          ?.label
                      }
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
                <Menu
                  isOpen={languageMenuOpen}
                  onClose={() => setLanguageMenuOpen(false)}
                  align="left"
                  anchorEl={languageButtonRef.current}
                >
                  {languages.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setLanguage(option.value as "zh-TW" | "en");
                        setLanguageMenuOpen(false);
                      }}
                      className="flex w-11/12 items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex w-full items-center justify-between">
                        <div>{option.label}</div>
                        <div>
                          {option.value === language && (
                            <Check className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </Menu>
              </div>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium">隨機性 (Temperature)</h4>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full"
                />
                <p className="mt-1 text-sm text-gray-500">{temperature}</p>
              </div>
              <div>
                <h4 className="mb-2 font-medium">Top-K</h4>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="1"
                  value={topK}
                  onChange={(e) => setTopK(parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="mt-1 text-sm text-gray-500">{topK}</p>
              </div>
              <div>
                <h4 className="mb-2 font-medium">Max Tokens</h4>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="200"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="mt-1 text-sm text-gray-500">{maxTokens}</p>
              </div>
            </div>
          )}

          {activeTab === "management" && (
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium">保留對話天數</h4>
                <input
                  type="range"
                  min="1"
                  max="90"
                  step="1"
                  value={history}
                  onChange={(e) => setHistory(parseFloat(e.target.value))}
                  className="w-full"
                />
                <p className="mt-1 text-sm text-gray-500">{history}</p>
              </div>
              <div>
                <h4 className="mb-2 font-medium">管理對話</h4>
                <div className="space-y-2">
                  <button
                    onClick={handleArchiveAll}
                    className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    封存全部對話
                  </button>

                  <button
                    onClick={handleUnarchiveAll}
                    className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    取消全部封存對話
                  </button>

                  <button
                    onClick={handleDeleteAllConversations}
                    className="w-full py-2 px-4 bg-red-500 text-white hover:bg-red-600 rounded"
                  >
                    刪除全部未封存對話
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;
