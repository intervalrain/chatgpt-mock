"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Menu from "../ui/Menu";
import { HelpCircle, Keyboard } from "lucide-react";
import { useConversation } from "@/app/context/ConversationContext";
import { useSidebar } from "@/app/context/SidebarContext";
import HotkeyDialog from "../Dialogs/HotkeyDialog";
import VersionDialog from "../Dialogs/VersionDialog";
import PolicyDialog from "../Dialogs/PolicyDialog";
import ManualDialog from "../Dialogs/ManualDialog";
import { useDialog } from "@/app/context/DialogContext";
import { opendir } from "fs";

const Footer = () => {
  const [infoMenuOpen, setInfoMenuOpen] = useState(false);
  const infoButtonRef = useRef<HTMLButtonElement>(null);
  const { openDialog } = useDialog();
  const toggleInfoMenu = () => setInfoMenuOpen(!infoMenuOpen);

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-1 bg-white">
        <div className="w-8" />
        <div className="text-center flex-grow">
          <div className="text-gray-400 text-xs">
            DSM Bot 可能會發生錯誤。請查核重要資訊。
          </div>
        </div>
        <div className="w-8 flex justify-end">
          <div className="relative">
            <button ref={infoButtonRef} onClick={toggleInfoMenu}>
              <span className="w-6 h-6 text-xs text-gray-400 rounded-full border border-gray-200 flex items-center justify-center">
                ?
              </span>
            </button>
            <Menu
              isOpen={infoMenuOpen}
              onClose={() => setInfoMenuOpen(false)}
              align="right"
              anchorEl={infoButtonRef.current}
            >
              <button
                onClick={() => {
                  openDialog("manual")
                  setInfoMenuOpen(false);
                }}
                className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 w-11/12"
              >
                <HelpCircle className="mr-3 h-5 w-5" /> 說明及常見問題
              </button>
              <button
                onClick={() => {
                  openDialog("version");
                  setInfoMenuOpen(false);
                }}
                className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 w-11/12"
              >
                <HelpCircle className="mr-3 h-5 w-5" /> 版本
              </button>
              <button
                onClick={() => {
                  openDialog("policy");
                  setInfoMenuOpen(false);
                }}
                className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 w-11/12"
              >
                <HelpCircle className="mr-3 h-5 w-5" /> 條款及政策
              </button>
              <button
                onClick={() => {
                  openDialog("hotkey");
                  setInfoMenuOpen(false);
                }}
                className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 w-11/12"
              >
                <Keyboard className="mr-3 h-5 w-5" /> 鍵盤快捷鍵
              </button>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
