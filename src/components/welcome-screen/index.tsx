'use client'
import React from 'react';

import { FileText } from 'lucide-react';

const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <div className="w-24 h-24 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <FileText size={40} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Medical AI Assistant</h2>
        <p className="max-w-md mb-6">
            Ask medical questions to get AI-powered assistance.
        </p>
        <p className="text-sm text-gray-400">
            Powered by Google Gemini
        </p>
    </div>
);

export default WelcomeScreen;