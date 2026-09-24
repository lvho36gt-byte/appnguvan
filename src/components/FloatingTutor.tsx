import React, { useState, useRef, useEffect } from 'react';
import { Bot, BookOpen, Send, X, Maximize2, Minimize2, Sparkles, User, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  time: string;
}

export const FloatingTutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'tutor',
      text: `Chào em! 🌸 Thầy/cô là **AI Tutor Ngữ văn** của Trường THCS Huỳnh Thúc Kháng.\n\nThầy/cô luôn sẵn sàng đồng hành cùng em tìm ý, dựng luận điểm, khám phá tác phẩm và hoàn thiện câu từ. Em đang có băn khoăn hay bài học nào cần gợi mở không?`,
      time: 'Vừa xong',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Giúp em hiểu đề văn này',
    'Làm sao tìm dẫn chứng văn học hay?',
    'Cách mở bài gián tiếp ấn tượng',
    'Phân biệt ẩn dụ và hoán dụ',
    'Hãy viết bài văn cho em',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/tutor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          chatHistory: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await res.json();
      const replyText =
        data.reply ||
        'Thầy/cô đã nhận được câu hỏi. Em hãy thử diễn đạt lại suy nghĩ đầu tiên của mình về đề bài nhé!';

      const tutorMsg: Message = {
        id: `t-${Date.now()}`,
        sender: 'tutor',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: `t-err-${Date.now()}`,
        sender: 'tutor',
        text: `Thầy/cô AI vẫn đang đồng hành cùng em! Với vấn đề này, trước hết em hãy tự hỏi: "Điều gì trong câu hỏi làm em chú ý nhất?". Hãy chia sẻ suy nghĩ ban đầu để chúng ta cùng mài giũa nhé!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-8 right-6 z-50 group flex items-center gap-3 bg-gradient-to-r from-[#4169F6] to-[#6750FF] hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-3 rounded-full shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Mở AI Tutor Ngữ văn"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#11B981] border-2 border-[#4169F6] rounded-full" />
          </div>
          <div className="text-left hidden sm:block pr-1">
            <p className="text-xs font-bold leading-tight">AI Tutor Ngữ văn</p>
            <p className="text-[10px] text-blue-100 font-medium">Hỏi đáp & Gợi mở tư duy</p>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
            isExpanded
              ? 'inset-4 md:inset-10'
              : 'bottom-20 md:bottom-8 right-4 md:right-6 w-[calc(100vw-2rem)] sm:w-104 h-148 max-h-[85vh]'
          }`}
        >
          {/* Top Bar */}
          <div className="bg-gradient-to-r from-[#4169F6] to-[#6750FF] text-white px-4 py-3.5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm">AI Tutor Ngữ văn THCS</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-medium">
                    Socratic
                  </span>
                </div>
                <p className="text-[11px] text-blue-100">
                  Tổ Ngữ văn - GDCD • Huỳnh Thúc Kháng
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                title={isExpanded ? 'Thu nhỏ' : 'Mở rộng'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                title="Đóng cửa sổ"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Socratic banner notice */}
          <div className="bg-blue-50 dark:bg-blue-950/30 px-3.5 py-1.5 border-b border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#4169F6] shrink-0" />
            <span>AI không viết thay em – AI gợi mở để em tự viết nên bài văn của chính mình.</span>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F8FAFC] dark:bg-slate-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[88%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 text-xs font-bold ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white'
                      : 'bg-gradient-to-br from-[#4169F6] to-[#6750FF] text-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#4169F6] text-white rounded-tr-none'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span
                    className={`text-[10px] text-slate-400 mt-1 block px-1 ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 italic bg-white dark:bg-slate-800 px-3.5 py-2.5 rounded-2xl w-fit border border-slate-200 dark:border-slate-700">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#4169F6]" />
                AI Tutor đang phân tích suy nghĩ của em…
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#4169F6] dark:hover:text-blue-400 transition-colors border border-slate-200/60 dark:border-slate-700 shrink-0 font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập suy nghĩ hoặc câu hỏi của em..."
              disabled={loading}
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2 text-xs sm:text-sm border border-transparent focus:border-[#4169F6] focus:bg-white dark:focus:bg-slate-800 outline-hidden transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#4169F6] to-[#6750FF] text-white disabled:opacity-40 hover:opacity-95 transition-all shadow-md shadow-blue-500/20"
              aria-label="Gửi tin nhắn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
