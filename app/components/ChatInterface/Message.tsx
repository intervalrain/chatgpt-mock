import { Message } from '@/app/types'
import React from 'react'
import { Copy, ThumbsUp, ThumbsDown, RefreshCcw } from 'lucide-react'
import TooltipButton from './TooltipButton'

const MessagePage: React.FC<Message> = ({ id, content, role}) => {
  	return (
		<div
			key={id}
			className={`mb-4 ${
				role === 'user' ? 'text-right' : 'text-left'
			}`}>
			<div
				className={`inline-block p-2 rounded-3xl ${
					role === 'user' && 'bg-gray-100'
				}`}>
				<div className={`${role === "assistant" && "space-y-1"}`}>
					<p>{content}</p>
					{role === 'assistant' && (
						<div className="space-x-1 text-nowrap">
							<TooltipButton icon={<Copy size={16}/>} tooltip="複製" />
							<TooltipButton icon={<ThumbsUp size={16}/>} tooltip="回應良好" />
							<TooltipButton icon={<ThumbsDown size={16}/>} tooltip="回應不佳" />
							<TooltipButton icon={<RefreshCcw size={16}/>} tooltip="重新生成" />			
						</div>
					)}
				</div>
			</div>
        </div>
  	)
}

export default MessagePage