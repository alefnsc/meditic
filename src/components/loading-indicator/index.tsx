'use client'
import React from 'react';

const LoadingIndicator = () => (
  <div className="flex justify-start">
    <div className="max-w-3xl p-4 rounded-lg bg-white shadow">
      <div className="flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  </div>
);

export default LoadingIndicator;