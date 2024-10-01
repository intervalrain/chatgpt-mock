import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex items-center justify-between px-4 py-1 bg-white">
      <div className="w-8" />
      <div className="text-center flex-grow">
        <div className="text-gray-400 text-xs">
          ChatGPT 可能會發生錯誤。請查核重要資訊。
        </div>
      </div>
      <div className="w-8 flex justify-end">
        {" "}
        <Link
          href="/info"
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <span className="w-6 h-6 text-xs rounded-full border border-gray-200 flex items-center justify-center">
            ?
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
