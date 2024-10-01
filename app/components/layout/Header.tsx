'use client';

import React, { useState, useRef, useEffect } from 'react';
import Avatar from '@/app/utils/Avatar';
import { ChevronDown, Settings, HelpCircle, LogOut, ArrowRightToLine, ArrowLeftToLine, SquarePlus } from 'lucide-react';
import { mockUser } from '@/app/mock/userData';
import { useSidebar } from '@/app/context/SidebarContext';
import Menu from '../ui/Menu';

const Header: React.FC = () => {
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isCollpased, toggleSidebar } = useSidebar();
  const chatButtonRef = useRef<HTMLButtonElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);

  const toggleChatMenu = () => setChatMenuOpen(!chatMenuOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  return (
    <div className="flex justify-between items-center relative">
      <div className="relative flex">
        <div className="flex justify-start mx-3">
          {isCollpased && (
            <div>
              <button 
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-200 rounded-md">
                <ArrowRightToLine className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-md">
                <SquarePlus className="text-gray-600" />
              </button>
            </div>
          )}
          <button 
            ref={chatButtonRef}
            className="flex items-center p-2 font-semibold text-gray-600 rounded-md hover:bg-gray-100"
            onClick={toggleChatMenu}
          >
            ChatGPT
            <ChevronDown className="ml-2" />
          </button>
          <Menu 
            isOpen={chatMenuOpen} 
            onClose={() => setChatMenuOpen(false)} 
            align="left"
            anchorEl={chatButtonRef.current}>
            <a href="#" className="block m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" role="menuitem">New chat</a>
            <a href="#" className="block m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Clear conversations</a>
            <a href="#" className="block m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Upgrade to Plus</a>
          </Menu>
        </div>
      </div>
      <div className="relative">
        <button 
          ref={avatarButtonRef}
          onClick={toggleUserMenu} 
          className="p-4">
          <Avatar className="p-1 rounded-full" name={mockUser.userName}/>
        </button>
        <Menu 
          isOpen={userMenuOpen} 
          onClose={() => setUserMenuOpen(false)} 
          align="right"
          anchorEl={avatarButtonRef.current}>
          <a href="#" className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <Settings className="mr-3 h-5 w-5" /> Settings
          </a>
          <a href="#" className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <HelpCircle className="mr-3 h-5 w-5" /> Help
          </a>
          <a href="#" className="flex items-center m-2 px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <LogOut className="mr-3 h-5 w-5" /> Log out
          </a>
        </Menu>
      </div>
    </div>
  );
};

export default Header;