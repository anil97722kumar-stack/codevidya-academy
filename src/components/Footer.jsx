import React, { useState } from 'react';
import { 
  Code2, 
  PlayCircle, 
  FileText, 
  Sparkles, 
  Award, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Heart,
  ShieldCheck
} from 'lucide-react';

export default function Footer({ onOpenVerifier }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Kya video classes sach mein 100% free hain?",
      a: "Haan! Saare video lectures bina kisi subscription ya hidden charges ke 100% free hain. Aap bina pay kiye poori curriculum dekh sakte hain."
    },
    {
      q: "Kya notes download karne ke paise lagte hain?",
      a: "Bilkul nahi! Saare handcrafted revision notes, diagrams, aur cheat-sheets poori tarah free hain. Aap inhein online padh sakte hain ya printable PDF format mein download kar sakte hain."
    },
    {
      q: "Practice Question Sheets paid kyun hain?",
      a: "Practice sheets mein 100-180 high-yield FAANG & Tier-1 interview problems curated hain. Inke har ek question ke C++, Java, aur Python code solutions, time & space complexity, aur intuition likhne mein hamari expert team ne mehnat ki hai. Isliye yeh affordable fees (₹99 - ₹199) mein lifetime access ke saath provide ki jaati hain."
    },
    {
      q: "Certificate kaise milega aur kya yeh verified hai?",
      a: "Har course ke end mein ek 5-question comprehensive assessment test hota hai. Agar aap 70% ya usse zyada score karte hain, toh aapka official certificate turant generate ho jata hai jismein unique verification ID aur official seal hoti hai. Koi bhi recruiter ya college isse hamari website pe verify kar sakta hai!"
    }
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-20">
      
      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Aapke Sawal, Hamare Jawab
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 font-bold text-white flex items-center justify-between gap-4 text-xs sm:text-sm hover:text-indigo-400 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 shrink-0 text-indigo-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />
                )}
              </button>

              {openFaq === idx && (
                <div className="px-4 pb-4 pt-1 text-slate-300 text-xs leading-relaxed border-t border-slate-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Col 1: Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white font-mono">
                  CodeVidya <span className="text-indigo-400">CS Academy</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Bharat ka leading Computer Science learning portal. 100% Free Video Lectures, Handcrafted Study Notes, Verified Certificates, and Premium Interview Practice Sheets with multi-language code solutions.
              </p>
              
              <div className="flex items-center gap-2 mt-4 text-[11px] text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>All certificates verified via cryptographic identification hash</span>
              </div>
            </div>

            {/* Col 2: Free Features */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Free Education
              </h4>
              <ul className="space-y-2">
                <li><span className="text-emerald-400">✔</span> Free Video Lectures</li>
                <li><span className="text-emerald-400">✔</span> Free Downloadable Notes</li>
                <li><span className="text-emerald-400">✔</span> Free Cheat Sheets & Formulas</li>
                <li><span className="text-emerald-400">✔</span> Free Sample Practice Questions</li>
              </ul>
            </div>

            {/* Col 3: Premium Sheets & Certs */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Premium & Certs
              </h4>
              <ul className="space-y-2">
                <li><span className="text-amber-400">★</span> SDE Cracker Sheets (₹99 - ₹199)</li>
                <li><span className="text-amber-400">★</span> C++, Python & Java Solutions</li>
                <li><span className="text-amber-400">★</span> Time & Space Complexity</li>
                <li>
                  <button 
                    onClick={onOpenVerifier}
                    className="text-sky-400 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    <span>Verify Any Certificate</span>
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <div>
              © 2026 CodeVidya CS Academy. Built with passion for CS engineering students.
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              Made for Computer Science Engineers
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
