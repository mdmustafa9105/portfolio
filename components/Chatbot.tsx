import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatIcon } from './icons/ChatIcon';
import { LogoIcon } from './icons/LogoIcon';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const Chatbot: React.FC<{ profileData: any }> = ({ profileData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const systemInstruction = `You are a helpful and friendly chatbot assistant for the portfolio of ${profileData.name}. 
    This portfolio showcases two personas: Mohammed Mustafa, a tech student, and Kaptaan Hermes, a content creator. 
    You are currently representing ${profileData.name}.
    Here is some information about them: ${JSON.stringify(profileData, (key, value) => key === 'icon' ? undefined : value)}. 
    Answer questions concisely based on this data.
    ${profileData.name === "Mohammed Mustafa" ? "Adopt a professional and informative tone." : "Adopt an energetic, engaging, and casual tone, like a streamer talking to their community."}
    Do not mention that you are an AI. Act as their personal assistant.`;

  useEffect(() => {
    if (isOpen && !chat) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const newChat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: { systemInstruction: systemInstruction },
        });
        setChat(newChat);
        setMessages([{
            sender: 'ai',
            text: `Hi! I'm ${profileData.name}'s assistant. Ask me anything!`
        }]);
      } catch (e) {
         console.error("Failed to initialize chatbot", e);
         setMessages([{
            sender: 'ai',
            text: `Sorry, my circuits are a bit scrambled right now. Please try again later.`
        }]);
      }
    } else if (!isOpen) {
        // Reset chat when closed to pick up new profile context if site is toggled
        setChat(null);
        setMessages([]);
    }
  }, [isOpen, profileData.name]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chat || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response: GenerateContentResponse = await chat.sendMessage({ message: input });
      const aiMessage: Message = { sender: 'ai', text: response.text };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = { sender: 'ai', text: "Sorry, I'm having trouble connecting right now." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const { color } = profileData;

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 ${color.bg} text-black w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${color.ring} transition-transform hover:scale-110`}
        aria-label="Open chatbot"
      >
        <ChatIcon className="w-8 h-8"/>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 fade-in">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
          <div className="relative w-full max-w-md h-[80vh] max-h-[700px] flex flex-col bg-[#1C1C1C] rounded-2xl shadow-2xl border border-gray-800">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <LogoIcon color={color.primary} />
                <h3 className="font-bold text-white">Ask {profileData.logoName}</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">&times;</button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'ai' && <div className="w-8 h-8 shrink-0"><LogoIcon color={color.primary}/></div>}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.sender === 'user' ? `${color.bg} text-black` : 'bg-black text-white'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                  <div className="flex items-end gap-2 justify-start">
                    <div className="w-8 h-8 shrink-0"><LogoIcon color={color.primary}/></div>
                    <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-black text-white">
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className={`w-full bg-black border border-gray-700 rounded-full py-2 px-4 text-white focus:outline-none focus:ring-2 ${color.ring}`}
                  aria-label="Chat input"
                  disabled={!chat}
                />
                <button type="submit" disabled={isLoading || !chat} className={`${color.bg} text-black p-2.5 rounded-full hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
