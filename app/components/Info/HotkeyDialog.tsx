import React from "react";

interface Hotkey {
	key: string[];
	description: string;
}

interface HotkeyDialogProps {
	isOpen: boolean;
  onClose: () => void;
  hotkeys: Hotkey[];
}

const HotkeyDialog: React.FC<HotkeyDialogProps> = ({ isOpen, onClose, hotkeys}) => {
	if (!isOpen) return null;

  const renderKeyCombo = (keyCombo: string[]) => {
    return keyCombo.map((key, index) => (
      <kbd key={index} className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-white border border-gray-200 rounded-md">
        {key}
      </kbd>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">鍵盤快捷鍵</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="my-4 h-px bg-gray-200" role="none" />
        <div className="grid grid-cols-2 gap-4">
          {hotkeys.map((hotkey, index) => (
            <div key={index} className="flex justify-between items-center mr-4">
              <span className="text-gray-800 text-sm">
                {hotkey.description}
              </span>
              <div className="flex gap-1">{renderKeyCombo(hotkey.key)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotkeyDialog;
