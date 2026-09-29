import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Database
} from 'lucide-react';
import { api } from '../services/api';

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      let res;
      if (isLoginMode) {
        res = await api.login(email, password);
      } else {
        res = await api.register(name, email, password);
      }

      if (res && res.success) {
        onAuthSuccess({
          user: res.user,
          token: res.token,
          unlockedSheets: res.unlockedSheets || [],
          certificates: res.certificates || []
        });
        onClose();
      } else {
        setErrorMsg(res.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to backend API.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setIsLoginMode(true);
    setEmail('aditya@example.com');
    setPassword('password123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white">
            {isLoginMode ? 'Student Login' : 'Create Free Student Account'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Secure JWT Authentication with MySQL Database sync.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {!isLoginMode && (
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : isLoginMode ? 'Login to Dashboard' : 'Register Now'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo filler */}
        <div className="mt-4 pt-3 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[11px] text-amber-400 hover:underline font-medium"
          >
            ⚡ Click here to auto-fill sample Demo Student credentials
          </button>
        </div>

        {/* Toggle Mode */}
        <div className="mt-3 text-center text-xs text-slate-400">
          {isLoginMode ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setIsLoginMode(false); setErrorMsg(''); }}
                className="text-indigo-400 font-bold hover:underline"
              >
                Sign Up Free
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => { setIsLoginMode(true); setErrorMsg(''); }}
                className="text-indigo-400 font-bold hover:underline"
              >
                Login
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
