import React, { useEffect, useRef, useState } from "react";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  align?: "left" | "right";
  anchorEl?: HTMLElement | null;
}

const Menu: React.FC<MenuProps> = ({
  isOpen,
  onClose,
  children,
  align = "left",
  anchorEl,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        event.target !== anchorEl
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, anchorEl]);

  useEffect(() => {
    if (isOpen && menuRef.current && anchorEl) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const anchorRect = anchorEl.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = anchorRect.bottom + window.scrollY;
      let left: number;

      if (align === "left") {
        left = anchorRect.left;
        if (left + menuRect.width > viewportWidth) {
          left = viewportWidth - menuRect.width - 10;
        }
      } else {
        left = anchorRect.right - menuRect.width;

        if (left < 0) {
          left = anchorRect.left;
        }

        if (left + menuRect.width > viewportWidth) {
          left = viewportWidth - menuRect.width - 10;
        }
      }

      if (top + menuRect.height > viewportHeight) {
        top = Math.max(anchorRect.top - menuRect.height, window.scrollY + 10);
      }

      setMenuStyle({
        position: "fixed",
        top: `${top}px`,
        left: `${left}px`,
        visibility: "visible",
        opacity: 1,
      });
    }
  }, [isOpen, align, anchorEl]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className={`fixed z-10 w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out`}
      style={menuStyle}
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {children}
      </div>
    </div>
  );
};

export default Menu;
