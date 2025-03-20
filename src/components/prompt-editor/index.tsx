'use client'
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { DEFAULT_SYSTEM_PROMPT } from '@/lib/constants';

const PromptEditor = ({
    systemPrompt,
    setSystemPrompt,
    isExpanded,
    setIsExpanded
}: {
    systemPrompt: string;
    setSystemPrompt: (prompt: string) => void;
    isExpanded: boolean;
    setIsExpanded: (expanded: boolean) => void;
}) => (
    <div className="border-t border-gray-200">
        <div
            className="p-3 bg-gray-50 flex justify-between items-center cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <h3 className="font-medium text-gray-700">System Prompt Settings</h3>
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {isExpanded && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                    Customize the system prompt that guides AI responses:
                </p>
                <textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="w-full h-48 p-3 border rounded text-sm font-mono text-gray-800"
                />
                <div className="flex justify-end mt-2">
                    <button
                        className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        onClick={() => {
                            // Reset to default prompt
                            setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
                        }}
                    >
                        Reset to Default
                    </button>
                </div>
            </div>
        )}
    </div>
);

export default PromptEditor;