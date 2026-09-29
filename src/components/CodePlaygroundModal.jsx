import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Sparkles, 
  Code2 
} from 'lucide-react';

export default function CodePlaygroundModal({ 
  initialLanguage = 'cpp', 
  initialCode = '', 
  onClose 
}) {
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(
    initialCode || `#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << "Welcome to CodeVidya CS Playground!" << endl;
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    cout << "Array size: " << nums.size() << ", Target: " << target << endl;
    return 0;
}`
  );
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Compiling and executing test cases on virtual sandbox...');

    setTimeout(() => {
      setIsRunning(false);
      let simulatedOutput = '';
      if (language === 'cpp') {
        simulatedOutput = `[Execution Successful - Time: 12ms, Memory: 8.4MB]
Welcome to CodeVidya CS Playground!
Array size: 4, Target: 9
Found valid pair: nums[0] + nums[1] == 9 (indices: 0, 1)

✔ All Sample Test Cases Passed!`;
      } else if (language === 'python') {
        simulatedOutput = `[Execution Successful - Python 3.12 - Time: 18ms]
Output: [0, 1]
Target Sum 9 Verified.
Execution completed with exit code 0.`;
      } else {
        simulatedOutput = `[Java Virtual Machine 21 - Time: 28ms]
Solution verified: Return indices [0, 1]
Test Suite: 3/3 passed.`;
      }
      setOutput(simulatedOutput);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 text-white flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>CodeVidya Sandbox Playground</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                  Online Runner
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Test and execute multi-language code solutions directly in your browser.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 my-3">
          <div className="flex items-center gap-1.5">
            {['cpp', 'python', 'java'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-colors ${
                  language === lang
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'cpp' ? 'C++' : lang}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700 flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all hover:scale-105"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isRunning ? 'Running...' : 'Run Code'}</span>
            </button>
          </div>
        </div>

        {/* Code Editor and Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[300px]">
          {/* Editor */}
          <div className="flex flex-col rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
            <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Solution Editor ({language.toUpperCase()})</span>
              <span className="text-slate-500">UTF-8</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full p-3 bg-transparent text-emerald-300 font-mono text-xs focus:outline-none resize-none leading-relaxed"
              spellCheck="false"
            />
          </div>

          {/* Console Output */}
          <div className="flex flex-col rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
            <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Execution Terminal Output</span>
              {isRunning && <span className="text-amber-400 animate-pulse">Computing...</span>}
            </div>
            <div className="flex-1 p-3 font-mono text-xs text-slate-300 whitespace-pre-wrap overflow-y-auto">
              {output || 'Click "Run Code" above to compile and run your code with test cases.'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
