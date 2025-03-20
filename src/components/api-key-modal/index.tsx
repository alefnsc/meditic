import React from 'react';

const ApiKeyModal = ({ apiKey, setApiKey, onSave }: {
    apiKey: string;
    setApiKey: (key: string) => void;
    onSave: (key: string) => void;
}) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Enter Google Gemini API Key</h2>
            <p className="text-gray-600 mb-4">
                Please enter your Google Gemini API key to enable AI functionality.
                Your key will be stored locally in your browser.
            </p>
            <input
                type="password"
                className="w-full p-2 border rounded mb-4"
                placeholder="AIzaSyA..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
            />
            <div className="flex justify-end">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => onSave(apiKey)}
                >
                    Save Key
                </button>
            </div>
        </div>
    </div>
);

export default ApiKeyModal;