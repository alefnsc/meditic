'use client'
import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

import Sidebar from '@/components/sidebar';
import WelcomeScreen from '@/components/welcome-screen';
import ChatMessage from '@/components/chat-message';
import InputForm from '@/components/input-form';
import LoadingIndicator from '@/components/loading-indicator';
import PromptEditor from '@/components/prompt-editor';
import ApiKeyModal from '@/components/api-key-modal';

// Types

import { Message } from '@/types/message';
import { GeminiResponse } from '@/types/geminiResponse';

import { DEFAULT_SYSTEM_PROMPT } from '@/lib/constants';

export default function MedicalAIInterface(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);
  const [systemPrompt, setSystemPrompt] = useState<string>(DEFAULT_SYSTEM_PROMPT);
  const [isPromptEditorExpanded, setIsPromptEditorExpanded] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Check for API key on mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    } else {
      setShowApiKeyModal(true);
    }

    // Also check for saved custom prompt
    const storedPrompt = localStorage.getItem('medical_system_prompt');
    if (storedPrompt) {
      setSystemPrompt(storedPrompt);
    }
  }, []);

  // Function to save API key
  const handleSaveApiKey = (key: string): void => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  // Save system prompt when changed
  useEffect(() => {
    localStorage.setItem('medical_system_prompt', systemPrompt);
  }, [systemPrompt]);

  // Function to send messages to Gemini API
  const callGemini = async (prompt: string): Promise<string> => {
    if (!apiKey) {
      setShowApiKeyModal(true);
      return "Please provide a Google Gemini API key to continue.";
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: systemPrompt }]
            },
            {
              role: 'model',
              parts: [{
                text: "I understand my role as a medical AI assistant. I'll provide evidence-based information while respecting the guidelines."
              }]
            },
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
            topP: 0.95,
            topK: 40
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_ONLY_HIGH"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data: GeminiResponse = await response.json();

      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      return `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
    }
  };

  // Send message to AI
  const sendMessage = async (text: string): Promise<void> => {
    setIsLoading(true);
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', content: text }]);

    try {
      const aiResponse = await callGemini(text);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        content: aiResponse
      }]);
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        content: 'Sorry, I encountered an error processing your request. Please try again.'
      }]);
    }

    setIsLoading(false);
    setInput('');
  };

  // Handle form submission
  const handleSubmit = async (e?: React.FormEvent): Promise<void> => {
    e?.preventDefault();
    if (input.trim() === '') return;
    await sendMessage(input);
  };

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Head>
        <title>Medical AI Assistant</title>
        <meta name="description" content="Medical AI Assistant powered by Google Gemini" />
      </Head>

      {showApiKeyModal && (
        <ApiKeyModal
          apiKey={apiKey}
          setApiKey={setApiKey}
          onSave={handleSaveApiKey}
        />
      )}

      <Sidebar onShowApiKeyModal={() => setShowApiKeyModal(true)} />

      <div className="flex-1 flex flex-col">
        <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <LoadingIndicator />}
            </div>
          )}
        </div>

        <PromptEditor
          systemPrompt={systemPrompt}
          setSystemPrompt={setSystemPrompt}
          isExpanded={isPromptEditorExpanded}
          setIsExpanded={setIsPromptEditorExpanded}
        />

        <div className="border-t p-4 bg-white">
          <InputForm
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}