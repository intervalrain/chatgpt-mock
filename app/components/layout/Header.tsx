"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Avatar from "@/app/utils/Avatar";
import {
  ChevronDown,
  Settings,
  LogOut,
  PanelLeft,
  PenSquare,
  UserPen,
  Bot,
  BookPlus,
  Check,
} from "lucide-react";
import { mockUser } from "@/app/mock/userData";
import { useSidebar } from "@/app/context/SidebarContext";
import Menu from "../ui/Menu";
import { useApp } from "@/app/context/AppContext";
import { LlmModel } from "@/app/types";
import { useConversation } from "@/app/context/ConversationContext";
import { useNavigate } from "react-router-dom";
import AssistantDialog from "../Dialogs/AssistantDialog";
import SettingsDialog from "../Dialogs/SettingsDialog";
import { useHeader } from "@/app/context/HeaderContext";

const Header: React.FC = () => {
  const {
    assistantDialogOpen,
    settingsDialogOpen,
    openAssistantDialog,
    closeAssistantDialog,
    openSettingsDialog,
    closeSettingsDialog,
  } = useHeader();

  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isCollpased, toggleSidebar } = useSidebar();
  const modelButtonRef = useRef<HTMLButtonElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const { model, setModel } = useApp();
  const navigate = useNavigate();

  const toggleModelMenu = () => setModelMenuOpen(!modelMenuOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const llmOptions: LlmModel[] = ["mistral"]; // 'llama2'];

  const handleModelSelect = (model: LlmModel) => {
    setModel(model);
    setModelMenuOpen(false);
  };

  const { createNewChat } = useConversation();

  const handleNewChat = () => {
    createNewChat();
    navigate("/");
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeAssistantDialog();
      closeSettingsDialog();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex justify-between items-center relative">
      <div className="relative flex">
        <div className="flex justify-start mx-3">
          {isCollpased && (
            <div>
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-200 rounded-md"
              >
                <PanelLeft className="text-gray-600" />
              </button>
              <button
                onClick={handleNewChat}
                className="p-2 hover:bg-gray-200 rounded-md"
              >
                <PenSquare className="text-gray-600" />
              </button>
            </div>
          )}
          <button
            ref={modelButtonRef}
            className="flex items-center p-2 font-semibold text-gray-600 rounded-md hover:bg-gray-100"
            onClick={toggleModelMenu}
          >
            <Bot className="mr-3 h-5 w-5" />
            <h2 className="text-xl text-gray-500">DSM Bot ({model})</h2>
            <ChevronDown className="ml-2" />
          </button>
          <Menu
            isOpen={modelMenuOpen}
            onClose={() => setModelMenuOpen(false)}
            align="left"
            anchorEl={modelButtonRef.current}
          >
            {llmOptions.map((currentModel) => (
              <button
                key={currentModel}
                onClick={() => handleModelSelect(currentModel)}
                className="flex w-11/12 items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <div className="flex w-full items-center justify-between">
                  <div>{currentModel}</div>
                  <div>
                    {currentModel === model && <Check className="h-4 w-4" />}
                  </div>
                </div>
              </button>
            ))}
          </Menu>
        </div>
      </div>
      <div className="relative">
        <button ref={avatarButtonRef} onClick={toggleUserMenu} className="p-4">
          <Avatar className="p-1 rounded-full" name={mockUser.userName} />
        </button>
        <Menu
          isOpen={userMenuOpen}
          onClose={() => setUserMenuOpen(false)}
          align="right"
          anchorEl={avatarButtonRef.current}
        >
          {/* <a href="#" className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <UserPen className="mr-3 h-5 w-5" /> 我的 GPT
          </a> */}
          <button
            onClick={() => {
              openAssistantDialog();
              setUserMenuOpen(false);
            }}
            className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 w-11/12"
          >
            <Bot className="mr-3 h-5 w-5" /> 我的助理
          </button>

          <button
            onClick={() => {
              openSettingsDialog();
              setUserMenuOpen(false);
            }}
            className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 w-11/12"
          >
            <Settings className="mr-3 h-5 w-5" /> 設定
          </button>

          {/* <div className="my-1 h-px bg-gray-200" role="none" /> */}
          {/* <a href="#" className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <BookPlus className="mr-3 h-5 w-5" /> 申請文件
          </a> */}
          {/* <div className="my-1 h-px bg-gray-200" role="none" />
          <a href="#" className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <LogOut className="mr-3 h-5 w-5" /> 登出
          </a> */}
        </Menu>
      </div>
      <AssistantDialog
        isOpen={assistantDialogOpen}
        onClose={closeAssistantDialog}
      />
      <SettingsDialog
        isOpen={settingsDialogOpen}
        onClose={closeSettingsDialog}
      />
    </div>
  );
};

export default Header;
