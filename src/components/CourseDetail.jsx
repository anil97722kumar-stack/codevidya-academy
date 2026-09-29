import React, { useState } from 'react';
import { 
  PlayCircle, 
  FileText, 
  Sparkles, 
  Award, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Unlock, 
  Copy, 
  Check, 
  ExternalLink, 
  Download, 
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Code2,
  Terminal,
  Zap,
  Tag
} from 'lucide-react';

export default function CourseDetail({
  course,
  onBack,
  unlockedSheets,
  onOpenPayment,
  onOpenCertificate,
  completedLectures,
  onToggleLectureComplete,
  onOpenPlayground,
  initialTab = 'classes'
}) {
  const [activeTab, setActiveTab] = useState(initialTab || 'classes'); // 'classes' | 'notes' | 'sheet' | 'certificate'
  
  // Custom uploaded PDF state for notes
  const [customPdfUrl, setCustomPdfUrl] = useState(null);
  const [customPdfName, setCustomPdfName] = useState('');
  
  // Classes state
  const [activeLectureIndex, setActiveLectureIndex] = useState(0);
  
  // Notes state
  const [activeNoteIndex, setActiveNoteIndex] = useState(0);
  const [copiedNoteCode, setCopiedNoteCode] = useState(false);

  // Practice Sheet state
  const isSheetUnlocked = unlockedSheets.includes(course.id);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [solutionLanguage, setSolutionLanguage] = useState('cpp'); // 'cpp' | 'python' | 'java'
  const [copiedSolution, setCopiedSolution] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  // Quiz / Exam state
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const activeLecture = course.lectures[activeLectureIndex] || course.lectures[0];
  const activeNote = course.notes[activeNoteIndex] || course.notes[0];
  
  const filteredQuestions = course.practiceSheet.questions.filter((q) => {
    if (difficultyFilter === 'All') return true;
    return q.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
  });

  const selectedQuestion = filteredQuestions[selectedQuestionIndex] || filteredQuestions[0];
  const canViewSolution = isSheetUnlocked || (selectedQuestion && selectedQuestion.isFreePreview);

  const handleCopy = (text, type = 'solution') => {
    navigator.clipboard.writeText(text);
    if (type === 'solution') {
      setCopiedSolution(true);
      setTimeout(() => setCopiedSolution(false), 2000);
    } else {
      setCopiedNoteCode(true);
      setTimeout(() => setCopiedNoteCode(false), 2000);
    }
  };

  const handleSelectAnswer = (questionId, optionIndex) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    course.quiz.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const isPassed = quizSubmitted && (quizScore / course.quiz.questions.length) >= 0.7;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 font-semibold">
            Free Classes & Notes
          </span>
          {isSheetUnlocked ? (
            <span className="text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-md border border-emerald-500/30 font-semibold flex items-center gap-1">
              <Unlock className="w-3 h-3" /> Practice Sheet Unlocked
            </span>
          ) : (
            <span className="text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Practice Sheet: ₹{course.pricing.sheetPrice}
            </span>
          )}
        </div>
      </div>

      {/* Course Title Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                {course.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs">
                {course.level}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" /> {course.duration}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {course.title}
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {course.description}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Instructor: <strong className="text-slate-200">{course.instructor}</strong>
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 min-w-[240px]">
            {!isSheetUnlocked && (
              <button
                onClick={() => onOpenPayment(course)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                Unlock Practice Sheet (₹{course.pricing.sheetPrice})
              </button>
            )}

            <button
              onClick={() => setActiveTab('certificate')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Award className="w-4 h-4 text-indigo-400" />
              Take Exam & Get Certified
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-px mb-8 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('classes')}
          className={`px-4 py-3 text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
            activeTab === 'classes'
              ? 'text-emerald-400 border-emerald-400 bg-slate-900/60'
              : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/30'
          }`}
        >
          <PlayCircle className="w-4 h-4" />
          <span>Free Classes ({course.lectures.length})</span>
          <span className="px-1.5 py-0.2 text-[10px] uppercase font-bold rounded bg-emerald-500/20 text-emerald-300">
            FREE
          </span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-3 text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
            activeTab === 'notes'
              ? 'text-cyan-400 border-cyan-400 bg-slate-900/60'
              : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/30'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Free Notes & Cheatsheets</span>
          <span className="px-1.5 py-0.2 text-[10px] uppercase font-bold rounded bg-cyan-500/20 text-cyan-300">
            FREE
          </span>
        </button>

        <button
          onClick={() => setActiveTab('sheet')}
          className={`px-4 py-3 text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
            activeTab === 'sheet'
              ? 'text-amber-400 border-amber-400 bg-slate-900/60'
              : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/30'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Practice Question Sheet + Solutions</span>
          <span className="px-1.5 py-0.2 text-[10px] uppercase font-bold rounded bg-amber-500/20 text-amber-300">
            {isSheetUnlocked ? 'UNLOCKED' : `₹${course.pricing.sheetPrice}`}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('certificate')}
          className={`px-4 py-3 text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
            activeTab === 'certificate'
              ? 'text-indigo-400 border-indigo-400 bg-slate-900/60'
              : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/30'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Claim Certificate</span>
        </button>
      </div>

      {/* TAB 1: FREE CLASSES */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Video Player & Lesson Description */}
          <div className="lg:col-span-2 space-y-5">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
              <iframe
                src={activeLecture.videoUrl}
                title={activeLecture.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Now Playing • 100% Free Class
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                    {activeLecture.title}
                  </h2>
                </div>

                <button
                  onClick={() => onToggleLectureComplete(course.id, activeLecture.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    completedLectures[`${course.id}-${activeLecture.id}`]
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    {completedLectures[`${course.id}-${activeLecture.id}`]
                      ? 'Marked as Completed'
                      : 'Mark as Watched'}
                  </span>
                </button>
              </div>

              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Lecture Synopsis & Learning Objectives
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeLecture.description}
                </p>
              </div>

              {/* Free resources box */}
              <div className="mt-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Revision Notes for this topic available</div>
                    <div className="text-[11px] text-slate-400">Downloadable and readable online for free</div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('notes')}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-colors"
                >
                  Read Notes
                </button>
              </div>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="space-y-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-emerald-400" />
                  Course Curriculum
                </h3>
                <span className="text-xs font-mono text-emerald-400">
                  {course.lectures.length} Free Lectures
                </span>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {course.lectures.map((lecture, idx) => {
                  const isActive = activeLectureIndex === idx;
                  const isCompleted = completedLectures[`${course.id}-${lecture.id}`];

                  return (
                    <div
                      key={lecture.id}
                      onClick={() => setActiveLectureIndex(idx)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        isActive
                          ? 'bg-indigo-600/15 border-indigo-500/50 text-white'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${
                            isActive ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {idx + 1}
                          </span>
                          <div>
                            <h4 className="text-xs font-semibold leading-snug">
                              {lecture.title}
                            </h4>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-mono">
                              <Clock className="w-3 h-3" /> {lecture.duration}
                            </span>
                          </div>
                        </div>

                        {isCompleted && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setActiveTab('sheet')}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Practice Questions with Code
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: FREE REVISION NOTES */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Notes Chapters Sidebar */}
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                Notes Chapters (Free)
              </h3>

              <div className="space-y-1.5">
                {course.notes.map((note, idx) => (
                  <button
                    key={note.id}
                    onClick={() => setActiveNoteIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all ${
                      activeNoteIndex === idx
                        ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    {note.chapter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes Reader Content */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Free CS Study Material
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {activeNote.chapter}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {/* Upload Custom PDF Notes */}
                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-xs font-medium text-cyan-300 border border-cyan-500/40 transition-colors cursor-pointer" title="Upload your own PDF note to read directly here">
                    <Download className="w-3.5 h-3.5 rotate-180" />
                    <span>Upload PDF</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setCustomPdfUrl(url);
                          setCustomPdfName(file.name);
                        }
                      }}
                    />
                  </label>

                  {customPdfUrl && (
                    <button
                      onClick={() => setCustomPdfUrl(null)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-xs text-rose-400 border border-slate-700 transition-colors"
                      title="Clear uploaded PDF"
                    >
                      Close PDF
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const printWindow = window.open('', '', 'width=800,height=600');
                      printWindow.document.write(`
                        <html>
                          <head>
                            <title>${activeNote.chapter} - CodeVidya</title>
                            <style>
                              body { font-family: sans-serif; padding: 40px; line-height: 1.6; }
                              pre { background: #f4f4f4; padding: 15px; border-radius: 5px; }
                              code { font-family: monospace; }
                            </style>
                          </head>
                          <body>
                            <h1>${course.title}</h1>
                            <h2>${activeNote.chapter}</h2>
                            <pre>${activeNote.content}</pre>
                          </body>
                        </html>
                      `);
                      printWindow.document.close();
                      printWindow.print();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Print
                  </button>
                </div>
              </div>

              {/* PDF Document Viewer if PDF is loaded, otherwise Markdown Content */}
              {customPdfUrl ? (
                <div className="space-y-3">
                  <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-xl flex items-center justify-between text-xs text-cyan-300">
                    <span className="font-semibold">📄 Viewing Custom PDF: {customPdfName}</span>
                    <a
                      href={customPdfUrl}
                      download={customPdfName || "notes.pdf"}
                      className="hover:underline flex items-center gap-1 font-bold"
                    >
                      <Download className="w-3.5 h-3.5" /> Save File
                    </a>
                  </div>
                  <iframe
                    src={customPdfUrl}
                    title="PDF Notes Viewer"
                    className="w-full h-[650px] rounded-xl border border-slate-800 bg-slate-950"
                  />
                </div>
              ) : (
                <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {activeNote.content}
                </div>
              )}

              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Want hands-on code practice for these topics?</span>
                <button
                  onClick={() => setActiveTab('sheet')}
                  className="text-amber-400 hover:underline font-semibold flex items-center gap-1"
                >
                  View Practice Sheet <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: PRACTICE QUESTION SHEET (PAID WITH CODE SOLUTIONS) */}
      {activeTab === 'sheet' && (
        <div className="space-y-6">
          
          {/* Paid Header / Paywall Alert Banner */}
          {!isSheetUnlocked ? (
            <div className="bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Premium Interview Coding Sheet
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {course.practiceSheet.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                    Classes & Notes are 100% Free! Unlock this complete sheet with <strong className="text-white">full C++, Python, and Java code solutions</strong>, step-by-step logic, complexity analysis, and FAANG company tags.
                  </p>
                  
                  {/* Features list */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 text-xs text-slate-200">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{course.practiceSheet.totalQuestions}+ Problems</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>C++, Java & Python Code</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Optimal Space & Time</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-5 rounded-xl border border-amber-500/30 text-center min-w-[220px]">
                  <div className="text-xs text-slate-400 line-through">
                    ₹{course.pricing.originalPrice}
                  </div>
                  <div className="flex items-baseline justify-center gap-1 my-1">
                    <span className="text-3xl font-black text-amber-400">
                      ₹{course.pricing.sheetPrice}
                    </span>
                    <span className="text-xs text-emerald-400 font-bold">
                      ({course.pricing.discount})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mb-3">
                    One-time payment • Lifetime access
                  </div>

                  <button
                    onClick={() => onOpenPayment(course)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
                  >
                    <Unlock className="w-4 h-4" />
                    Unlock Sheet Now
                  </button>
                  <p className="text-[10px] text-slate-500 mt-2">
                    Tip: Use coupon <code className="text-amber-300 font-mono">CS50</code> for extra discount
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Premium Sheet Unlocked!
                  </h4>
                  <p className="text-xs text-emerald-300">
                    You have lifetime access to all {course.practiceSheet.totalQuestions} questions with multi-language code solutions.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold rounded-lg">
                PRO ACTIVE
              </span>
            </div>
          )}

          {/* Difficulty filter & Question selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Questions list (4 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Problems ({filteredQuestions.length})
                </span>

                {/* Difficulty pills */}
                <div className="flex items-center gap-1">
                  {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => {
                        setDifficultyFilter(diff);
                        setSelectedQuestionIndex(0);
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                        difficultyFilter === diff
                          ? 'bg-slate-700 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {filteredQuestions.map((q, idx) => {
                  const isSelected = selectedQuestionIndex === idx;
                  const isLocked = !isSheetUnlocked && !q.isFreePreview;

                  return (
                    <div
                      key={q.id}
                      onClick={() => setSelectedQuestionIndex(idx)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${
                            isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {idx + 1}
                          </span>
                          <div>
                            <h4 className="text-xs font-bold line-clamp-1">
                              {q.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-[10px] font-bold uppercase px-1.5 py-0.2 rounded ${
                                q.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                                q.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                                'bg-rose-500/20 text-rose-400'
                              }`}>
                                {q.difficulty}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {q.tags.slice(0, 2).join(', ')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Lock / Free Preview Tag */}
                        <div>
                          {isLocked ? (
                            <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[10px] flex items-center gap-1 font-semibold">
                              <Lock className="w-3 h-3 text-amber-400" /> Locked
                            </span>
                          ) : q.isFreePreview && !isSheetUnlocked ? (
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold">
                              FREE PREVIEW
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-[10px] font-bold">
                              UNLOCKED
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Problem Statement & Code Solution Viewer (7 cols) */}
            <div className="lg:col-span-7">
              {selectedQuestion ? (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
                  
                  {/* Problem header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                          selectedQuestion.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                          selectedQuestion.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-rose-500/20 text-rose-400'
                        }`}>
                          {selectedQuestion.difficulty}
                        </span>
                        {selectedQuestion.isFreePreview && !isSheetUnlocked && (
                          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Free Preview Question
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {selectedQuestion.title}
                      </h3>
                    </div>

                    {/* Companies */}
                    <div className="flex flex-wrap gap-1">
                      {selectedQuestion.companies.map((c) => (
                        <span key={c} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Problem description */}
                  <div className="mt-4">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Problem Statement
                    </h5>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {selectedQuestion.problemStatement}
                    </p>

                    <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                      <div><strong className="text-indigo-400">Input:</strong> {selectedQuestion.exampleInput}</div>
                      <div><strong className="text-emerald-400">Output:</strong> {selectedQuestion.exampleOutput}</div>
                    </div>
                  </div>

                  {/* Solution Area (Locked vs Unlocked) */}
                  <div className="mt-6 pt-5 border-t border-slate-800">
                    {canViewSolution ? (
                      <div>
                        {/* Approach & Complexity */}
                        <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-4 mb-4">
                          <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                            Optimal Solution Approach
                          </h5>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {selectedQuestion.solutionApproach}
                          </p>

                          <div className="flex items-center gap-4 mt-2.5 text-xs font-mono">
                            <span className="text-emerald-400">
                              Time Complexity: <strong>{selectedQuestion.timeComplexity}</strong>
                            </span>
                            <span className="text-amber-400">
                              Space Complexity: <strong>{selectedQuestion.spaceComplexity}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Multi-language selector tabs */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setSolutionLanguage('cpp')}
                              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                                solutionLanguage === 'cpp'
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              C++
                            </button>
                            <button
                              onClick={() => setSolutionLanguage('python')}
                              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                                solutionLanguage === 'python'
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              Python
                            </button>
                            <button
                              onClick={() => setSolutionLanguage('java')}
                              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                                solutionLanguage === 'java'
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              Java
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onOpenPlayground(
                                solutionLanguage,
                                selectedQuestion.solutions[solutionLanguage] || ''
                              )}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 border border-slate-700 font-medium flex items-center gap-1.5 transition-colors"
                            >
                              <Terminal className="w-3.5 h-3.5" />
                              Run in Playground
                            </button>

                            <button
                              onClick={() => handleCopy(selectedQuestion.solutions[solutionLanguage] || '')}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 font-medium flex items-center gap-1.5 transition-colors"
                            >
                              {copiedSolution ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy Code</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Code box */}
                        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto font-mono text-xs text-emerald-300 leading-relaxed max-h-[350px]">
                          <pre>{selectedQuestion.solutions[solutionLanguage] || '// Solution not available'}</pre>
                        </div>
                      </div>
                    ) : (
                      /* Paywall Lock Box */
                      <div className="p-8 rounded-2xl bg-slate-950 border border-amber-500/30 text-center flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                          <Lock className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-bold text-white">
                          This Question & Code Solution is Locked
                        </h4>
                        <p className="text-xs text-slate-400 max-w-md mt-1 mb-4">
                          Classes and Notes are completely free! To unlock this full practice question sheet with complete C++, Java & Python code solutions, please get the sheet.
                        </p>
                        <button
                          onClick={() => onOpenPayment(course)}
                          className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
                        >
                          <Unlock className="w-4 h-4" />
                          Unlock for ₹{course.pricing.sheetPrice}
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-sm">
                  Select a question from the left to view statement and code solution.
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 4: CERTIFICATION EXAM & CLAIM CERTIFICATE */}
      {activeTab === 'certificate' && (
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">
              Official Course Certification
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl mx-auto">
              Test your knowledge in {course.title}. Score <strong className="text-indigo-400">70% or higher</strong> to instantly generate and download your verified, shareable industry certificate!
            </p>
          </div>

          {/* Quiz Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Multiple Choice Assessment ({course.quiz.questions.length} Questions)
              </span>
              <span className="text-xs text-indigo-400 font-semibold">
                Passing Marks: {course.quiz.passingPercentage}%
              </span>
            </div>

            <div className="space-y-6">
              {course.quiz.questions.map((q, idx) => {
                const selected = userAnswers[q.id];
                const isCorrect = selected === q.correctAnswer;

                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-left">
                    <p className="text-sm font-semibold text-white mb-3">
                      {idx + 1}. {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80';
                        if (userAnswers[q.id] === optIdx) {
                          btnStyle = 'bg-indigo-600/30 border-indigo-500 text-white font-medium';
                        }
                        if (quizSubmitted) {
                          if (optIdx === q.correctAnswer) {
                            btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-300 font-semibold';
                          } else if (userAnswers[q.id] === optIdx && optIdx !== q.correctAnswer) {
                            btnStyle = 'bg-rose-600/30 border-rose-500 text-rose-300';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            disabled={quizSubmitted}
                            className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIdx === q.correctAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="mt-3 p-2.5 rounded-lg bg-slate-900 text-xs text-slate-400">
                        <strong className="text-slate-300">Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit / Result Section */}
            {!quizSubmitted ? (
              <button
                onClick={handleQuizSubmit}
                disabled={Object.keys(userAnswers).length < course.quiz.questions.length}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all"
              >
                Submit Exam & Evaluate Score
              </button>
            ) : (
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
                <div className="text-2xl font-black text-white">
                  Your Score: {quizScore} / {course.quiz.questions.length} (
                  {Math.round((quizScore / course.quiz.questions.length) * 100)}%)
                </div>

                {isPassed ? (
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Congratulations! You Passed!
                    </div>
                    <p className="text-xs text-slate-300 mb-4">
                      You are eligible for the verified certificate for {course.title}.
                    </p>
                    <button
                      onClick={() => onOpenCertificate(course)}
                      className="py-3 px-8 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 inline-flex items-center gap-2"
                    >
                      <Award className="w-5 h-5" />
                      View & Download Verified Certificate
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mb-2">
                      <AlertCircle className="w-4 h-4" />
                      Passing requirement is 70%
                    </div>
                    <p className="text-xs text-slate-400 mb-3">
                      Review the free lecture videos and notes before retaking the test.
                    </p>
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setUserAnswers({});
                      }}
                      className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                    >
                      Retake Exam
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
