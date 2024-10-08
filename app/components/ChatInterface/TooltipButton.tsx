import { useState } from "react";

interface TooltipButtonProps {
  icon: React.ReactNode;
  tooltip: string;
  onClick: () => void;
  isActive?: boolean;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({ icon, tooltip, onClick, isActive }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className={`hover:bg-gray-100 p-2 rounded-md ${isActive ? 'bg-blue-200' : ''}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={onClick}
      >
        {icon}
      </button>
      {showTooltip && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-xs font-medium text-white bg-gray-900 rounded-md shadow-sm opacity-100 transition-opacity duration-300">
          {tooltip}
          <svg
            className="absolute text-gray-900 h-2 w-full left-0 bottom-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,255 127.5,127.5 255,255" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default TooltipButton;
