import React from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, onClick }) => {
  return (
    <div
      className="flex items-center p-2 space-x-3 hover:bg-gray-200 rounded-md cursor-pointer transition-colors duration-200 ease-in-out"
      onClick={onClick}
    >
      <div className="flex-shrink-0 text-gray-600">
				{icon}
			</div>
      <div className="flex-grow min-w-0">
				<p className="truncate text-sm">{text}</p>
			</div>
    </div>
  );
};

export default SidebarItem;