'use client'

import React, { useState } from "react";
import InputArea from "./InputArea";
import useChat from "@/app/hooks/useChat";
import Message from "./Message";

const ChatInterface: React.FC = () => {
	const { messages, sendMessage } = useChat();

	const handleSendMessage = (content: string) => {
		sendMessage(content);
	}

  	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.map((message, index) => 
					<Message key={index} content={message.content} role={message.role} id={message.id} />
				)}
			</div>
			<InputArea onSendMessage={handleSendMessage} />
		</div>
	);
};

export default ChatInterface;
