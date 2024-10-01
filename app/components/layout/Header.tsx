'use client';

import React, { useState, useRef, useEffect } from 'react';
import Avatar from '@/app/utils/Avatar';
import { ChevronDown, Settings, HelpCircle, LogOut } from 'lucide-react';
import { mockUser } from '@/app/mock/userData';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  align: 'left' | 'right';
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose, children, align }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className={`absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ${align === 'left' ? 'left-0' : 'right-0'}`}
    >
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {children}
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleChatMenu = () => setChatMenuOpen(!chatMenuOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  return (
    <div className="flex justify-between items-center relative">
      <div className="relative">
        <button 
          className="flex items-center p-2 m-3 font-semibold text-gray-600 rounded-md hover:bg-gray-100"
          onClick={toggleChatMenu}
        >
          ChatGPT
          <ChevronDown className="ml-2" />
        </button>
        <Menu isOpen={chatMenuOpen} onClose={() => setChatMenuOpen(false)} align="left">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">New chat</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Clear conversations</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Upgrade to Plus</a>
        </Menu>
      </div>
      <div className="relative">
        <button onClick={toggleUserMenu} className="p-4">
          <Avatar className="p-1 rounded-full" name={mockUser.userName}/>
        </button>
        <Menu isOpen={userMenuOpen} onClose={() => setUserMenuOpen(false)} align="right">
          <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <Settings className="mr-3 h-5 w-5" /> Settings
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <HelpCircle className="mr-3 h-5 w-5" /> Help
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <LogOut className="mr-3 h-5 w-5" /> Log out
          </a>
        </Menu>
      </div>
    </div>
  );
};

export default Header;