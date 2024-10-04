"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";
import { Check, Copy } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full h-3/4">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-semibold">{title}</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						✕
					</button>
				</div>
				<div className="my-4 h-px bg-gray-200" role="none" />
        <div className="overflow-y-auto w-full max-h-[560px]">
          <div className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex, rehypeHighlight]}
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match ? match[1] : "";
                  const codeString = String(children).replace(/\n$/, "");

                  if (match && language !== "latex") {
                    return (
                      <div className="code-block">
                        <div className="code-header rounded-t-md p-3 text-xs items-center flex justify-between bg-zinc-700 text-zinc-400">
                          <span className="language">{language}</span>
                          <button
                            onClick={() => copyToClipboard(codeString)}
                            className="copy-button"
                          >
                            <div className="flex items-center px-2 space-x-1">
                              <div>
                                {copiedCode === codeString ? (
                                  <Check size={16} />
                                ) : (
                                  <Copy size={16} />
                                )}
                              </div>
                              <div>
                                <p>複製程式碼</p>
                              </div>
                            </div>
                          </button>
                        </div>
                        <pre className="rounded-b-md px-1 bg-black text-sm text-white">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    );
                  }
                  return (
                    <code
                      className="rounded-md p-1 bg-black text-sm text-white"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
