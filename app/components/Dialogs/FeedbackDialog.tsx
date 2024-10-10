import React, { useState, useRef, useEffect } from "react";

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: (submitted: boolean) => void;
  onSubmit: (feedback: string) => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [feedback, setFeedback] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback("");
    onClose(true);
  };

  const handleCancel = () => {
    setFeedback("");
    onClose(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={dialogRef} className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">請提供您的回饋</h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="請告訴我們您的想法..."
          className="p-2 w-full mb-4 resize-none border border-gray-700 rounded-md"
          rows={10}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="transition-colors duration-300 rounded-lg bg-gray-300 text-black text-sm px-5 py-2 hover:bg-gray-400 mr-2"
            onClick={handleCancel}
          >
            取消
          </button>
          <button
            className="transition-colors duration-300 rounded-lg bg-blue-600 text-white text-sm px-5 py-2 hover:bg-blue-700"
            onClick={handleSubmit}
          >
            提交
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDialog;
