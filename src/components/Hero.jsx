import React from 'react';
import { 
  PlayCircle, 
  FileText, 
  Sparkles, 
  Award, 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  Code, 
  ArrowRight,
  Star,
  Users
} from 'lucide-react';

export default function Hero({ onExploreCourses, onOpenVerifier }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-10 pb-16 border-b border-slate-800/80">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md text-xs sm:text-sm text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-400">100% Free Classes & Notes</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-300 font-medium">Affordable Practice Question Sheets with Solutions</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Computer Science Sikho <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Free Mein</span>, Practice Karo <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500">Pro Ki Tarah!</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Full CS Curriculum (DSA, OS, DBMS, Web Dev, AI) with <strong className="text-white">Free Video Lectures</strong> & <strong className="text-white">Free Revision Notes</strong>. Master coding interviews with our <strong className="text-amber-400">Premium Curated Practice Sheets</strong> containing complete multi-language code solutions & get <strong className="text-sky-400">Industry-Verified Certificates</strong>!
          </p>

          {/* 4 Pillars Card Row (Interactive) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-8 max-w-4xl mx-auto">
            
            {/* Pillar 1: Free Classes */}
            <button
              onClick={() => onExploreCourses && onExploreCourses('classes')}
              className="bg-slate-900/80 backdrop-blur border border-emerald-500/30 rounded-xl p-3.5 text-left relative overflow-hidden group hover:border-emerald-500/80 hover:bg-slate-900 transition-all hover:scale-105 cursor-pointer shadow-md"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <PlayCircle className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="font-bold text-white text-sm">Video Classes</h3>
                <span className="px-1.5 py-0.2 text-[10px] font-black uppercase rounded bg-emerald-500 text-slate-950">
                  FREE
                </span>
              </div>
              <p className="text-xs text-slate-400">Structured HD lectures from top engineers.</p>
            </button>

            {/* Pillar 2: Free Notes */}
            <button
              onClick={() => onExploreCourses && onExploreCourses('notes')}
              className="bg-slate-900/80 backdrop-blur border border-cyan-500/30 rounded-xl p-3.5 text-left relative overflow-hidden group hover:border-cyan-500/80 hover:bg-slate-900 transition-all hover:scale-105 cursor-pointer shadow-md"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="font-bold text-white text-sm">Revision Notes</h3>
                <span className="px-1.5 py-0.2 text-[10px] font-black uppercase rounded bg-cyan-500 text-slate-950">
                  FREE
                </span>
              </div>
              <p className="text-xs text-slate-400">High-yield cheat sheets, diagrams & formulas.</p>
            </button>

            {/* Pillar 3: Practice Sheets (PAID) */}
            <button
              onClick={() => onExploreCourses && onExploreCourses('sheets')}
              className="bg-slate-900/80 backdrop-blur border border-amber-500/40 rounded-xl p-3.5 text-left relative overflow-hidden group hover:border-amber-500/80 hover:bg-slate-900 transition-all hover:scale-105 ring-1 ring-amber-500/20 cursor-pointer shadow-md"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="font-bold text-white text-sm">Practice Sheets</h3>
                <span className="px-1.5 py-0.2 text-[10px] font-black uppercase rounded bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950">
                  PAID
                </span>
              </div>
              <p className="text-xs text-slate-400">100+ FAANG questions with C++, Java & Python code.</p>
            </button>

            {/* Pillar 4: Certificates */}
            <button
              onClick={onOpenVerifier}
              className="bg-slate-900/80 backdrop-blur border border-indigo-500/30 rounded-xl p-3.5 text-left relative overflow-hidden group hover:border-indigo-500/80 hover:bg-slate-900 transition-all hover:scale-105 cursor-pointer shadow-md"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Award className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="font-bold text-white text-sm">Certificates</h3>
                <span className="px-1.5 py-0.2 text-[10px] font-black uppercase rounded bg-indigo-500 text-slate-950">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400">Official certificate with unique QR verification ID.</p>
            </button>

          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onExploreCourses}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <PlayCircle className="w-4 h-4" />
              Start Free Learning Now
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenVerifier}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              Verify a Certificate
            </button>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">180,000+</div>
              <div className="text-xs text-slate-400">Students Learning</div>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">100% Free</div>
              <div className="text-xs text-slate-400">All Lectures & Notes</div>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <div className="text-xl sm:text-2xl font-black text-amber-400">650+</div>
              <div className="text-xs text-slate-400">Solved Coding Problems</div>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div className="flex items-center gap-1.5">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <div className="text-left">
                <div className="text-base sm:text-lg font-black text-white leading-tight">4.9 / 5.0</div>
                <div className="text-[11px] text-slate-400">Course Rating</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
