"use client";

import { useState, useRef, useEffect } from "react";
import { askMathQuestion } from "@/app/actions";

type Message = { role: "user" | "assistant"; content: string };

export default function MathChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "안녕하세요! 저는 AI 수학 선생님입니다. 모르는 수학 문제가 있으면 무엇이든 물어보세요! 😊\n(예: '1부터 10까지 더하면 얼마야?', '피타고라스의 정리가 뭐야?')" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    // Only send the last 10 messages to save context limit and costs
    const apiMessages = newMessages.slice(-10).map(m => ({ role: m.role, content: m.content }));
    const res = await askMathQuestion(apiMessages);
    
    if (res.error) {
      setMessages(prev => [...prev, { role: "assistant", content: `❌ **오류 발생:**\n${res.error}` }]);
    } else if (res.result) {
      setMessages(prev => [...prev, { role: "assistant", content: res.result }]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative group">
      {/* Decorative blurred background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden flex flex-col h-[600px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center gap-4 shadow-md z-10">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm border border-white/30 shadow-sm">
            🤖
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">AI 수학 선생님</h2>
            <p className="text-blue-100 text-sm font-medium">OpenAI GPT-4o-mini 기반</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3 items-end`}>
                
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm border ${msg.role === 'user' ? 'bg-indigo-100 border-indigo-200' : 'bg-blue-100 border-blue-200'}`}>
                  {msg.role === 'user' ? '🧑‍🎓' : '👩‍🏫'}
                </div>

                {/* Message Bubble */}
                <div className={`px-5 py-4 rounded-2xl shadow-sm whitespace-pre-wrap text-sm sm:text-base leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-br-sm' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex flex-row gap-3 items-end">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-xl shadow-sm">
                  👩‍🏫
                </div>
                <div className="px-5 py-4 rounded-2xl shadow-sm bg-white border border-slate-100 rounded-bl-sm flex items-center gap-2 h-[52px]">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="수학 질문을 입력해보세요! (예: 2+2*2는?)"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner text-slate-700"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
            >
              <span>전송</span>
              <span className="text-xl">✈️</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
