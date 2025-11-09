
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import WelcomeScreen from './components/WelcomeScreen';
import { Message } from './types';
import { generateContent } from './services/geminiService';

// Helper to convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

// Helper to read text file content
const readTextFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = useCallback(async (prompt: string, file?: File) => {
        if (!prompt.trim() && !file) return;

        setIsLoading(true);
        setError(null);
        
        const userMessageId = Date.now().toString();
        const userMessage: Message = { id: userMessageId, sender: 'user', text: prompt };

        if (file) {
            userMessage.file = { name: file.name, type: file.type };
            if (file.type.startsWith("image/")) {
                userMessage.image = URL.createObjectURL(file);
            }
        }
        
        setMessages(prev => [...prev, userMessage]);

        try {
            let modelResponseText: string;
            
            if (file) {
                 if (file.type.startsWith("image/")) {
                    const base64Data = await fileToBase64(file);
                    const fileData = { mimeType: file.type, data: base64Data };
                    modelResponseText = await generateContent(prompt, fileData);
                 } else {
                    // Handle text files for RAG-like behavior
                    const fileContent = await readTextFile(file);
                    const combinedPrompt = `Based on the following document content, please answer the user's question.
                    
                    Document: "${file.name}"
                    ---
                    ${fileContent}
                    ---
                    Question: ${prompt}`;
                    modelResponseText = await generateContent(combinedPrompt);
                 }
            } else {
                modelResponseText = await generateContent(prompt);
            }
            
            const modelMessage: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'model',
                text: modelResponseText,
            };
            setMessages(prev => [...prev, modelMessage]);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(`Failed to get a response: ${errorMessage}`);
            const errorResponse: Message = {
              id: (Date.now() + 1).toString(),
              sender: 'model',
              text: `Sorry, something went wrong. ${errorMessage}`
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <Header />
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {messages.length === 0 ? (
                        <WelcomeScreen />
                    ) : (
                        <div>
                            {messages.map(msg => (
                                <ChatMessage key={msg.id} message={msg} />
                            ))}
                            {isLoading && (
                               <div className="flex items-start gap-4 p-4 bg-gray-800/50">
                                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="pt-1.5">
                                        <div className="w-4 h-4 bg-gray-600 rounded-full animate-pulse"></div>
                                    </div>
                               </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>
                    )}
                </div>
            </main>
            {error && <div className="max-w-4xl mx-auto w-full p-2 text-red-400 bg-red-900/50 text-center text-sm">{error}</div>}
            <div className="sticky bottom-0">
                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default App;
