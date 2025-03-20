'use client'
import React from 'react';

import { Send } from 'lucide-react';


const InputForm = ({
  input,
  setInput,
  handleSubmit,
  isLoading
}: {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}) => (
  <form onSubmit={handleSubmit} className="flex items-center space-x-2">
    <input
      type="text"
      value={input}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
      placeholder="Ask a medical question..."
      className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
    />
    <button
      type="submit"
      disabled={isLoading || input.trim() === ''}
      className={`p-3 rounded-full ${isLoading || input.trim() === ''
        ? 'bg-gray-200 text-gray-400'
        : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
    >
      <Send size={20} />
    </button>
  </form>
);


export default InputForm;