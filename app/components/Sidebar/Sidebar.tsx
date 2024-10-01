"use client";

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
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/app/context/SidebarContext";
import SidebarItem from "./SidebarItem";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { isCollpased, toggleSidebar } = useSidebar();

  if (isCollpased) {
    return (
      <aside className={`bg-gray-100 text-black text-sm h-screen flex flex-col transition-all duration-300 w-0`} />
    );
  }

  return (
    <aside className={`bg-gray-100 text-black text-sm h-screen flex flex-col transition-all duration-300 w-64`}>
      <div className="flex justify-between px-2 py-1.5">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-200 rounded-md"
        >
          <ArrowLeftToLine className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded-md">
          <SquarePlus className="text-gray-600" />
        </button>
      </div>
      <div className="p-2">
        <SidebarItem icon={<LoaderPinwheel size={20}/>} text="ChatGPT" onClick={() => navigate("../")} />
        <SidebarItem icon={<LayoutGrid size={20}/>} text="Explore GPT" onClick={() => {}} />
      </div>
      <ConversationList />
    </aside>
  );
};

export default Sidebar;
