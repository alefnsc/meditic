'use client'
import React from 'react';

import { Message } from '@/types/message';


const ChatMessage = ({ message }: { message: Message }) => (
  <div
    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
  >
    <div
      className={`max-w-3xl p-4 rounded-lg ${message.sender === 'user'
        ? 'bg-blue-600 text-white'
        : 'bg-white shadow text-gray-800'
        }`}
    >
      {message.content.split('\n').map((line, i) => (
        <p key={i} className={i > 0 ? 'mt-2' : ''}>
          {line}
        </p>
      ))}
    </div>
  </div>
);

export default ChatMessage;