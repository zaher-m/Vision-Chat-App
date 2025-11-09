
import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white flex-shrink-0">
        U
    </div>
);

const ModelIcon = () => (
     <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
        </svg>
    </div>
);


const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex items-start gap-4 p-4 ${isUser ? '' : 'bg-gray-800/50'}`}>
      <div className="flex-shrink-0">
        {isUser ? <UserIcon /> : <ModelIcon />}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap break-words">
            {message.text}
        </div>
        {message.image && (
            <div className="mt-2">
                <img src={message.image} alt="User upload" className="max-w-xs rounded-lg border border-gray-600" />
            </div>
        )}
        {message.file && !message.image && (
             <div className="mt-2 p-2 bg-gray-700 rounded-lg inline-flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-gray-300">{message.file.name}</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
