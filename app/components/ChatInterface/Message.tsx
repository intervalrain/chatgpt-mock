'use client';

import { Message } from '@/app/types'
import React, { useState } from 'react'
import { Copy, ThumbsUp, ThumbsDown, RefreshCcw, Check } from 'lucide-react'
import TooltipButton from './TooltipButton'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github-dark.css'

const MessagePage: React.FC<Message> = ({ id, content, role}) => {
	const [copiedCode, setCopiedCode] = useState<string | null>(null);

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
		setCopiedCode(text);
		setTimeout(() => setCopiedCode(null), 2000);
		});
	};
  	return (
		<div
			key={id}
			className={`flex mb-4 ${
				role === 'user' ? 'justify-end' : 'justify-start'
			}`}>
			<div
				className={`inline-block p-2 rounded-3xl ${
					role === 'user' && 'bg-gray-100'
				}`}>
				<div className={`${role === "assistant" && "space-y-1"} markdown-body`}>
					<ReactMarkdown
						remarkPlugins={[remarkMath, remarkGfm]}
						rehypePlugins={[rehypeKatex, rehypeHighlight]}
						components={{
							code({ node, className, children, ...props}) {
								const match = /language-(\w+)/.exec(className || '');
								const language = match ? match[1] : '';
								const codeString = String(children).replace(/\n$/, '');

								if (match && language !== 'latex') {
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
															{copiedCode === codeString ? <Check size={16} /> : <Copy size={16} />} 
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
									<code className="rounded-md p-1 bg-black text-sm text-white" {...props}>
										{children}
									</code>
								)
							}
						}}>
						{content}
					</ReactMarkdown>
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