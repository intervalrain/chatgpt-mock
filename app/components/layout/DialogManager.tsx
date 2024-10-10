import React, { useCallback, useEffect } from "react";
import { useDialog } from "@/app/context/DialogContext";

import AssistantDialog from "../Dialogs/AssistantDialog";
import SettingsDialog from "../Dialogs/SettingsDialog";
import HotkeyDialog from "../Dialogs/HotkeyDialog";
import VersionDialog from "../Dialogs/VersionDialog";
import PolicyDialog from "../Dialogs/PolicyDialog";
import ManualDialog from "../Dialogs/ManualDialog";
import DocumentDialog from "../Dialogs/DocumentDialog";
import { useConversation } from "../../context/ConversationContext";
import { useSidebar } from "../../context/SidebarContext";

const DialogManager: React.FC = () => {
  const { isDialogOpen, openDialog, closeDialog } = useDialog();
  const { toggleSidebar } = useSidebar();

  const {
    conversations,
    createNewChat,
    removeConversation,
    currentConversationId,
    setCurrentConversationId,
    setInput,
  } = useConversation();

  const isMac =
    typeof window !== "undefined" &&
    navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const cmd = isMac ? "⌘" : "Ctrl";
  const del = isMac ? "⌫" : "Backspace";

  const hotkeys = [
    {
      key: [cmd, "Shift", "O"],
      description: "開啟新交談",
      action: createNewChat,
    },
    {
      key: [cmd, "Shift", "A"],
      description: "開啟我的助理",
      action: () => openDialog("assistant"),
    },
    {
      key: [cmd, "Shift", "S"],
      description: "切換側邊欄",
      action: toggleSidebar,
    },
    {
      key: [cmd, "Shift", del],
      description: "刪除交談",
      action: () => {
        if (window.confirm("確定要刪除這個對話嗎？")) {
          removeConversation(currentConversationId as string);
          if (conversations.length > 0)
            setCurrentConversationId(conversations[conversations.length - 1].id);
        }
      },
    },
    {
      key: [cmd, "Shift", "↑"],
      description: "複製上一次輸入",
      action: () => {
        const conv = conversations.find(
          (conversation) => conversation.id === currentConversationId
        );
        if (conv && conv.messages.length >= 2) {
          setInput(conv.id, conv.messages[conv.messages.length - 2].content);
        }
      },
    },
    {
      key: [cmd, "Shift", "D"],
      description: "開啟 DSM Documents",
      action: () => openDialog("document"),
    },
    {
      key: [cmd, "/"],
      description: "顯示快捷鍵",
      action: () => openDialog("hotkey"),
    },
    {
      key: [cmd, "Esc"],
      description: "開啟設定",
      action: () => openDialog("settings"),
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
          if (k === "Esc") return event.key === "Escape";
          if (k == "↑") return event.key === "ArrowUp";
          if (k == "↓") return event.key === "ArrowDown";
          if (k == "→") return event.key === "ArrowRight";
          if (k == "←") return event.key === "ArrowLeft";
          return event.key.toLowerCase() === k.toLowerCase();
        });

        if (allKeysPressed) {
          event.preventDefault();
          hotkey.action();
        } else if (event.key === "Escape") {
					closeDialog();
				}
      });

      
    },
    [cmd, del, hotkeys]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div>
      <AssistantDialog
        isOpen={isDialogOpen("assistant")}
        onClose={() => closeDialog()}
      />
      <SettingsDialog
        isOpen={isDialogOpen("settings")}
        onClose={() => closeDialog()}
      />
      <HotkeyDialog
        isOpen={isDialogOpen("hotkey")}
        onClose={() => closeDialog()}
        hotkeys={hotkeys}
      />
      <VersionDialog
        isOpen={isDialogOpen("version")}
        onClose={() => closeDialog()}
      />
      <PolicyDialog
        isOpen={isDialogOpen("policy")}
        onClose={() => closeDialog()}
      />
      <ManualDialog
        isOpen={isDialogOpen("manual")}
        onClose={() => closeDialog()}
      />
      <DocumentDialog 
        isOpen={isDialogOpen("document")}
        onClose={() => closeDialog()}
      />
    </div>
  );
};

export default DialogManager;
