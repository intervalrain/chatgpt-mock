'use client';

import Link from "next/link";
import React, { useRef, useState } from "react";
import Menu from "../ui/Menu";
import { HelpCircle, Keyboard, LogOut, Settings } from "lucide-react";

const Footer = () => {
  const [infoMenuOpen, setInfoMenuOpen] = useState(false);
  const infoButtonRef = useRef<HTMLButtonElement>(null);

  const toggleInfoMenu = () => setInfoMenuOpen(!infoMenuOpen);

  return (
    <div className="flex items-center justify-between px-4 py-1 bg-white">
      <div className="w-8" />
      <div className="text-center flex-grow">
        <div className="text-gray-400 text-xs">
          ChatGPT 可能會發生錯誤。請查核重要資訊。
        </div>
      </div>
      <div className="w-8 flex justify-end">
        <div className="relative">
          <button 
            ref={infoButtonRef}
            onClick={toggleInfoMenu}>
            <span className="w-6 h-6 text-xs text-gray-400 rounded-full border border-gray-200 flex items-center justify-center">
              ?
            </span>
          </button>
          <Menu 
            isOpen={infoMenuOpen} 
            onClose={() => setInfoMenuOpen(false)} 
            align="right"
            anchorEl={infoButtonRef.current}>
            <a href="#" className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              <HelpCircle className="mr-3 h-5 w-5" /> 說明及常見問題
            </a>
            <a href="#" className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              <HelpCircle className="mr-3 h-5 w-5" /> 版本
            </a>
            <a href="#" className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              <HelpCircle className="mr-3 h-5 w-5" /> 條款及政策
            </a>
            <a href="#" className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              <Keyboard className="mr-3 h-5 w-5" /> 鍵盤快捷鍵
            </a>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Footer;
