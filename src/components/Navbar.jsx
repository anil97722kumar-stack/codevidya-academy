import React, { useState } from 'react';
import { 
  Code2, 
  BookOpen, 
  FileText, 
  Award, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  User, 
  GraduationCap, 
  Sun, 
  MessageSquare,
  LogOut,
  Database
} from 'lucide-react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  unlockedSheets, 
  earnedCertificates, 
  onOpenVerifier, 
  onOpenDashboard, 
  onFilterMode,
  onOpenChat,
  currentUser, 
  onSignOut,
  theme = 'dark', 
  onToggleTheme, 
  searchQuery, 
  setSearchQuery 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveView('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-indigo-400 group-hover:text-pink-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white font-mono">
                  Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Vidya</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  CS Academy
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Free Classes & Notes • Paid Practice Sheets • Verified Certificates
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeView !== 'home') setActiveView('home');
                }}
                placeholder="Search DSA, OS, DBMS, Web..."
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveView('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'home' 
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              All Courses
            </button>

            <button
              onClick={() => onFilterMode ? onFilterMode('notes') : setActiveView('home')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Free Notes
              <span className="px-1.5 py-0.2 bg-cyan-500/20 text-cyan-300 text-[10px] rounded-full font-semibold">FREE</span>
            </button>

            <button
              onClick={() => onFilterMode ? onFilterMode('sheets') : setActiveView('home')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Practice Sheets
              <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-[10px] rounded-full font-semibold">PAID</span>
            </button>

            <button
              onClick={onOpenVerifier}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              Verify Certificate
            </button>
          </nav>

          {/* Right Action buttons: strictly Chat icon and Sun icon at top */}
          <div className="flex items-center gap-2">
            
            {/* Top Chat Icon */}
            <button
              onClick={onOpenChat}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-indigo-500 hover:bg-indigo-600/15 text-indigo-400 transition-all flex items-center justify-center relative group"
              title="Open CS Doubt Chat Assistant"
              aria-label="CS Doubt Assistant"
            >
              <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-400"></span>
            </button>

            {/* Top Sun Icon */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-amber-500 hover:bg-amber-500/10 text-amber-400 transition-all flex items-center justify-center group"
              title="Theme Toggle"
              aria-label="Sun Theme Icon"
            >
              <Sun className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </button>

            {/* Dashboard Button */}
            <button
              onClick={onOpenDashboard}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-slate-200 text-xs font-medium transition-all"
            >
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>Dashboard</span>
              {(unlockedSheets.length > 0 || earnedCertificates.length > 0) && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </button>

            {/* Student Profile & Sign Out */}
            {currentUser && (
              <div className="flex items-center gap-1.5 pl-1">
                <div 
                  className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300"
                  title={`Logged in as ${currentUser.name} (${currentUser.email})`}
                >
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="font-semibold max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                </div>
                <button
                  onClick={onSignOut}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/40 border border-slate-700/80 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Sign Out of Academy"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 lg:hidden"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-4 space-y-2">
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subjects..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
            />
          </div>
          <button
            onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
          >
            All Courses
          </button>
          <button
            onClick={() => { onOpenDashboard(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            My Dashboard
          </button>
          <button
            onClick={() => { onOpenChat(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-indigo-400 hover:bg-slate-800 flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            CS Doubt Assistant
          </button>
          <button
            onClick={() => { onOpenVerifier(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-sky-400 hover:bg-slate-800 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            Verify Any Certificate
          </button>
          {currentUser && (
            <button
              onClick={() => { onSignOut(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-400 hover:bg-slate-800 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out ({currentUser.name})
            </button>
          )}
        </div>
      )}
    </header>
  );
}
