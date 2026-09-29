import React, { useState } from 'react';
import { X, Send, Bot, User, Sparkles, Code2, BookOpen } from 'lucide-react';

const QUICK_PROMPTS = [
  'What is the difference between Array and LinkedList?',
  'Explain Dijkstra Algorithm step by step.',
  'How does Virtual Memory and Paging work in OS?',
  'What are ACID properties in DBMS?'
];

export default function ChatModal({ onClose, studentName }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello ${studentName || 'Student'}! 👋 I am your CodeVidya CS Doubt Assistant. You can ask me any doubt related to DSA, Java, Python, C++, OS, DBMS, or Computer Architecture!`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getAssistantReply = (userQuery) => {
    const q = userQuery.toLowerCase();
    if (q.includes('array') && q.includes('linkedlist')) {
      return "An **Array** stores elements in contiguous memory locations with O(1) random access by index, but has fixed size and O(N) insertion/deletion. A **LinkedList** consists of nodes with data and pointers, allowing dynamic resizing and O(1) insertion at head/tail, but requires O(N) sequential search.";
    }
    if (q.includes('dijkstra')) {
      return "**Dijkstra's Algorithm** finds the shortest path from a single source node to all other nodes in a weighted graph with non-negative edge weights. It uses a Min-Heap (Priority Queue) to greedily pick the vertex with minimum distance at each step, running in O((V + E) log V) time.";
    }
    if (q.includes('acid')) {
      return "**ACID Properties** in DBMS ensure transaction reliability:\n• **Atomicity**: All or nothing transaction execution.\n• **Consistency**: Database moves from one valid state to another.\n• **Isolation**: Concurrent transactions do not interfere with each other.\n• **Durability**: Committed changes persist even after system crashes.";
    }
    if (q.includes('virtual memory') || q.includes('paging')) {
      return "**Virtual Memory** gives programs the illusion of large contiguous memory by combining RAM with disk storage. **Paging** divides virtual memory into fixed-size blocks called *pages* and physical memory into *page frames*. The MMU translates virtual page numbers to physical frame numbers using a Page Table.";
    }
    if (q.includes('time complexity') || q.includes('big o')) {
      return "**Big-O Notation** measures algorithm scalability as input size (N) grows:\n• O(1): Constant (hash table lookup)\n• O(log N): Binary Search\n• O(N): Linear scan\n• O(N log N): Merge Sort, Quick Sort (average)\n• O(N²): Bubble / Selection sort";
    }
    return `Great question regarding "${userQuery}"! In computer science, mastering this concept involves understanding memory layout, time complexity, and real-world trade-offs. You can also explore our free lecture notes and practice sheets in the course section to see full code examples in C++, Java, and Python!`;
  };

  const handleSend = (textToSend) => {
    const msgText = (textToSend || input).trim();
    if (!msgText) return;

    const userMsg = { id: Date.now(), sender: 'user', text: msgText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAssistantReply(msgText);
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl h-[580px] max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">CodeVidya CS Doubt Assistant</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">AI Live</span>
              </div>
              <p className="text-xs text-slate-400">Ask any doubt in CS, DSA, Core Subjects & Code</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-900/60">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs pl-9">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span>CS Assistant is thinking...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-500 shrink-0 font-medium">Quick doubts:</span>
          {QUICK_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your computer science doubt here..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-all shadow-md shadow-indigo-600/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
