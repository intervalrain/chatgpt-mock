"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Menu from "../ui/Menu";
import { HelpCircle, Keyboard, LogOut, Settings } from "lucide-react";
import { useConversation } from "@/app/context/ConversationContext";
import { useSidebar } from "@/app/context/SidebarContext";
import HotkeyDialog from "../Dialogs/HotkeyDialog";
import VersionDialog from "../Dialogs/VersionDialog";
import PolicyDialog from "../Dialogs/PolicyDialog";
import ManualDialog from "../Dialogs/ManualDialog";

const Footer = () => {
  const [infoMenuOpen, setInfoMenuOpen] = useState(false);
  const infoButtonRef = useRef<HTMLButtonElement>(null);
  const [hotkeyDialogOpen, setHotkeyDialogOpen] = useState(false);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);
  const [manualDialogOpen, setManualDialogOpen] = useState(false);
  const [policyDialogOpen, setPolicyDialogOpen] = useState(false);
  const {
    conversations,
    createNewChat,
    removeConversation,
    currentConversationId,
    setCurrentConversationId,
  } = useConversation();
  const { toggleSidebar } = useSidebar();

  const isMac =
    typeof window !== "undefined" &&
    navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const cmd = isMac ? "⌘" : "Ctrl";
  const del = isMac ? "⌫" : "Backspace";

  const toggleInfoMenu = () => setInfoMenuOpen(!infoMenuOpen);

  const hotkeys = [
    {
      key: [cmd, "Shift", "O"],
      description: "開啟新交談",
      action: () => createNewChat(),
    },
    // { key: [cmd, "Shift", "I"], description: "設定自訂指令", action: () => {} },
    // { key: ["Shift", "Esc"], description: "專注於交談輸入", action: () => {} },
    {
      key: [cmd, "Shift", "S"],
      description: "切換側邊欄",
      action: toggleSidebar,
    },
    // { key: [cmd, "Shift", ";"], description: "複製最後的程式碼區塊", action: () => {} },
    {
      key: [cmd, "Shift", del],
      description: "刪除交談",
      action: () => {
        removeConversation(currentConversationId as string);
        if (conversations.length > 0)
          setCurrentConversationId(conversations[conversations.length - 1].id);
      },
    },
    // { key: [cmd, "Shift", "C"], description: "複製最後的回應", action: () => {} },
    {
      key: [cmd, "/"],
      description: "顯示快捷鍵",
      action: () => setHotkeyDialogOpen(!hotkeyDialogOpen),
    },
  ];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      hotkeys.forEach((hotkey) => {
        const isCommandKey =
          hotkey.key.includes(cmd) && (event.metaKey || event.ctrlKey);
        const isShiftKey = hotkey.key.includes("Shift") && event.shiftKey;
        const isRegularKey = hotkey.key.some(
          (k) =>
            k !== cmd &&
            k !== "Shift" &&
            k !== del &&
            k.toLowerCase() === event.key.toLowerCase()
        );
        const isDeleteKey =
          hotkey.key.includes(del) &&
          (event.key === "Backspace" || event.key === "Delete");

        const allKeysPressed = hotkey.key.every((k) => {
          if (k === cmd) return event.metaKey || event.ctrlKey;
          if (k === "Shift") return event.shiftKey;
          if (k === del)
            return event.key === "Backspace" || event.key === "Delete";
          return event.key.toLowerCase() === k.toLowerCase();
        });

        if (allKeysPressed) {
          event.preventDefault();
          hotkey.action();
        }
      });

      if (event.key === "Escape") {
        setHotkeyDialogOpen(false);
        setVersionDialogOpen(false);
        setManualDialogOpen(false);
        setPolicyDialogOpen(false);
      }
    },
    [cmd, del, hotkeys]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const renderKeyCombo = (keyCombo: string[]) => {
    return keyCombo.map((key, index) => (
      <kbd
        key={index}
        className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-white border border-gray-200 rounded-md"
      >
        {key}
      </kbd>
    ));
  };

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
                  setManualDialogOpen(true);
                  setInfoMenuOpen(false);
                }}
                className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 w-11/12"
              >
                <HelpCircle className="mr-3 h-5 w-5" /> 說明及常見問題
              </button>
              <button
                onClick={() => {
                  setVersionDialogOpen(true);
                  setInfoMenuOpen(false);
                }}
                className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 w-11/12"
              >
                <HelpCircle className="mr-3 h-5 w-5" /> 版本
              </button>
              <button
                onClick={() => {
                  setPolicyDialogOpen(true);
                  setInfoMenuOpen(false);
                }}
                className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 w-11/12"
              >
                <HelpCircle className="mr-3 h-5 w-5" /> 條款及政策
              </button>
              <button
                onClick={() => {
                  setHotkeyDialogOpen(true);
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
      <HotkeyDialog
        isOpen={hotkeyDialogOpen}
        onClose={() => setHotkeyDialogOpen(false)}
        hotkeys={hotkeys}
      />
      <VersionDialog
        isOpen={versionDialogOpen}
        onClose={() => setVersionDialogOpen(false)}
      />
      <PolicyDialog
        isOpen={policyDialogOpen}
        onClose={() => setPolicyDialogOpen(false)}
      />
      <ManualDialog
        isOpen={manualDialogOpen}
        onClose={() => setManualDialogOpen(false)}
      />
    </div>
  );
};

export default Footer;
