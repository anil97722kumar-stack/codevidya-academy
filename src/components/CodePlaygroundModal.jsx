import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Sparkles, 
  Code2,
  FileCode,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';

const STARTER_CODES = {
  cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << "CodeVidya C++ Online Compiler" << endl;
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    cout << "Array elements: ";
    for (int x : nums) cout << x << " ";
    cout << "\\nTarget sum: " << target << endl;
    return 0;
}`,
  python: `# CodeVidya Python Online Compiler
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []

numbers = [2, 7, 11, 15]
target = 9
print("Found pair indices:", two_sum(numbers, target))`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("CodeVidya Java Online Compiler");
        int a = 15;
        int b = 25;
        System.out.println("Sum of " + a + " + " + b + " = " + (a + b));
    }
}`,
  c: `#include <stdio.h>

int main() {
    printf("CodeVidya C Online Compiler\\n");
    int arr[] = {10, 20, 30, 40, 50};
    int n = sizeof(arr) / sizeof(arr[0]);
    for(int i = 0; i < n; i++) {
        printf("Element [%d]: %d\\n", i, arr[i]);
    }
    return 0;
}`,
  javascript: `// CodeVidya JavaScript Online Compiler
function solve() {
    const nums = [2, 7, 11, 15];
    const target = 9;
    console.log("Processing array:", nums);
    console.log("Target:", target);
    return "Complete!";
}

console.log(solve());`
};

export default function CodePlaygroundModal({ 
  initialLanguage = 'cpp', 
  initialCode = '', 
  onClose 
}) {
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(initialCode || STARTER_CODES[initialLanguage] || STARTER_CODES.cpp);
  const [customInput, setCustomInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (!initialCode || initialCode === code) {
      setCode(STARTER_CODES[newLang] || STARTER_CODES.cpp);
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Compiling and executing code on server sandbox...');

    try {
      const res = await api.executeCode({
        language,
        code,
        input: customInput
      });

      if (res && res.output) {
        setOutput(res.output);
      } else {
        setOutput('Code executed successfully with no output.');
      }
    } catch (err) {
      setOutput(`Execution Error: ${err.message || 'Failed to reach compiler.'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(STARTER_CODES[language] || STARTER_CODES.cpp);
    setOutput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-6 text-white flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">CodeVidya Real-Time Compiler</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                  Live Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Write any custom code in C, C++, Java, Python, or JS — compiles & executes live with real outputs.
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
          {/* Language Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'cpp', label: 'C++' },
              { id: 'c', label: 'C' },
              { id: 'python', label: 'Python' },
              { id: 'java', label: 'Java' },
              { id: 'javascript', label: 'JavaScript' }
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => handleLanguageChange(lang.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                  language === lang.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowInput(!showInput)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                showInput
                  ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {showInput ? 'Hide Input (stdin)' : 'Custom Input'}
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title="Reset Code Template"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isRunning ? 'Compiling...' : 'Run Code'}</span>
            </button>
          </div>
        </div>

        {/* Custom Input box (stdin) if open */}
        {showInput && (
          <div className="mb-3 p-2 bg-slate-950 border border-slate-800 rounded-xl">
            <label className="text-[11px] font-mono text-slate-400 block mb-1">
              Custom Standard Input (stdin):
            </label>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g. 10 20 or sample inputs for your program"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-600 font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}

        {/* Code Editor & Execution Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[350px]">
          {/* Editor */}
          <div className="flex flex-col rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner">
            <div className="px-3.5 py-2 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                <span>Source Editor ({language.toUpperCase()})</span>
              </span>
              <span className="text-slate-500">Live Syntax</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your custom code here..."
              className="flex-1 w-full p-3.5 bg-transparent text-emerald-300 font-mono text-xs focus:outline-none resize-none leading-relaxed"
              spellCheck="false"
            />
          </div>

          {/* Real Execution Terminal */}
          <div className="flex flex-col rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner">
            <div className="px-3.5 py-2 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Compiler & Standard Output (stdout)</span>
              </span>
              {isRunning && <span className="text-amber-400 animate-pulse">Running on Engine...</span>}
            </div>
            <div className="flex-1 p-3.5 font-mono text-xs text-slate-200 whitespace-pre-wrap overflow-y-auto leading-relaxed">
              {output || (
                <div className="text-slate-500 italic">
                  Press <strong className="text-slate-300">Run Code</strong> above to compile your code and see live terminal output.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
