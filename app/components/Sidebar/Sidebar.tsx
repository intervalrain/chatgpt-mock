import Link from "next/link";
import React from "react";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  SquarePlus,
  LoaderPinwheel,
  LayoutGrid,
} from "lucide-react";
import ConversationList from "./ConversationList";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-100 text-black text-sm h-screen flex flex-col">
      <div className="flex justify-between px-2 py-1.5">
        <button className="p-2 hover:bg-gray-200 rounded-md">
          <ArrowLeftToLine className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded-md">
          <SquarePlus className="text-gray-600" />
        </button>
      </div>
      <div className="p-2">
        <div className="flex items-center px-2 space-x-3 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
          <LoaderPinwheel className="text-gray-600" />
          <p>ChatGPT</p>
        </div>
        <div className="flex items-center px-2 space-x-3 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
          <LayoutGrid className="text-gray-600" />
          <p>Explore GPT</p>
        </div>
      </div>
			<ConversationList />
    </aside>
  );
};

export default Sidebar;
