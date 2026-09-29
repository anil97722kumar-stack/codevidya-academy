import React, { useState } from 'react';
import { 
  Code2, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  Database,
  GraduationCap
} from 'lucide-react';
import { api } from '../services/api';

export default function StudentAuthBarrier({ onAuthSuccess, onOpenVerifier }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Frontend validation
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.replace(/[\s\-()]/g, '');

    if (!cleanEmail.endsWith('@gmail.com')) {
      setErrorMessage('Student email must be a valid Gmail address (ending with @gmail.com).');
      return;
    }

    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      setErrorMessage('Please enter a valid 10-digit mobile phone number (e.g. 9876543210).');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      let res;
      if (isLoginMode) {
        res = await api.login(cleanEmail, cleanPhone, password);
      } else {
        if (!name.trim()) {
          setErrorMessage('Please enter your full student name.');
          setIsLoading(false);
          return;
        }
        res = await api.register(name.trim(), cleanEmail, cleanPhone, password);
      }

      if (res && res.success) {
        setSuccessMessage(isLoginMode ? 'Sign in successful! Entering CodeVidya...' : 'Registration successful! Entering CodeVidya...');
        setTimeout(() => {
          onAuthSuccess({
            user: res.user,
            token: res.token,
            unlockedSheets: res.unlockedSheets || [],
            certificates: res.certificates || []
          });
        }, 500);
      } else {
        setErrorMessage(res.message || 'Authentication failed. Please verify credentials in MySQL.');
      }
    } catch (err) {
      setErrorMessage('Failed to connect to MySQL backend server. Ensure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoStudent = () => {
    setIsLoginMode(true);
    setEmail('aditya.sharma@gmail.com');
    setPhone('9876543210');
    setPassword('password123');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-100 font-sans relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold font-mono tracking-tight text-white">
                Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Vidya</span>
              </span>
              <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Student Access Gate
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
              <Database className="w-3.5 h-3.5" />
              <span>MySQL 8.0 Active (codevidya_db)</span>
            </div>

            {onOpenVerifier && (
              <button
                onClick={onOpenVerifier}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs text-sky-400 font-medium transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Verify Certificate</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative">
          
          {/* Header Icon */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/10">
              <GraduationCap className="w-7 h-7 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {isLoginMode ? 'Student Sign In' : 'New Student Registration'}
            </h1>
            <p className="text-xs text-slate-400 mt-1.5">
              Please enter your Gmail address, phone number, and password to access the computer science academy.
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => { setIsLoginMode(true); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                isLoginMode
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsLoginMode(false); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                !isLoginMode
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register New Account
            </button>
          </div>

          {/* Alert messages */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Full Name <span className="text-indigo-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sunil Kumar"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center justify-between">
                <span>Gmail Address <span className="text-indigo-400">*</span></span>
                <span className="text-[10px] text-slate-400 font-mono">Must end with @gmail.com</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@gmail.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center justify-between">
                <span>Phone Number <span className="text-indigo-400">*</span></span>
                <span className="text-[10px] text-slate-400 font-mono">10-Digit Mobile</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="9876543210"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                Password <span className="text-indigo-400">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password (min 6 chars)"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Connecting to MySQL...</span>
              ) : isLoginMode ? (
                <>
                  <span>Sign In to Access Academy</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Create Account & Enter</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Student Fill Button */}
          <div className="mt-5 pt-4 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={fillDemoStudent}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Click to 1-Click Auto-Fill Demo Student</span>
            </button>
            <p className="text-[11px] text-slate-500 mt-1.5 font-mono">
              Demo: aditya.sharma@gmail.com | 9876543210 | password123
            </p>
          </div>

          {/* Feature Highlights Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400">
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="block font-bold text-emerald-400">100% Free</span>
              <span>Classes & Notes</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="block font-bold text-amber-400">Practice Sheets</span>
              <span>With Code Solutions</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="block font-bold text-sky-400">Certificates</span>
              <span>SHA-256 Verified</span>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-4 text-center text-xs text-slate-500">
        <p>© 2026 CodeVidya CS Academy. All student data securely managed in MySQL 8.0.</p>
      </footer>
    </div>
  );
}
