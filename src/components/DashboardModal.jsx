import React from 'react';
import { 
  X, 
  GraduationCap, 
  Award, 
  Sparkles, 
  PlayCircle, 
  FileText, 
  CheckCircle2, 
  Download, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

export default function DashboardModal({
  onClose,
  studentName,
  setStudentName,
  unlockedSheets,
  earnedCertificates,
  completedLectures,
  courses,
  onSelectCourse,
  onViewCertificate
}) {
  const completedCount = Object.keys(completedLectures).filter(k => completedLectures[k]).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Student Learning Dashboard
              </h2>
              <p className="text-xs text-slate-400">
                Track your course lectures, unlocked practice sheets, and credentials.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400">Student Name:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">Free Courses</div>
            <div className="text-2xl font-black text-white mt-1">{courses.length}</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">100% Free Access</div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">Lectures Watched</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{completedCount}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Completed</div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">Unlocked Sheets</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{unlockedSheets.length}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Practice Sheets</div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400">Certificates</div>
            <div className="text-2xl font-black text-indigo-400 mt-1">{earnedCertificates.length}</div>
            <div className="text-[10px] text-indigo-300 mt-0.5">Verified & Saved</div>
          </div>
        </div>

        {/* Earned Certificates List */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-400" />
            Earned Certificates ({earnedCertificates.length})
          </h3>

          {earnedCertificates.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 text-center">
              You haven't earned any certificates yet. Complete a course and pass the 70% exam to get certified!
            </div>
          ) : (
            <div className="space-y-2">
              {earnedCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{cert.courseTitle}</h4>
                      <div className="text-[11px] text-slate-400 font-mono">
                        ID: {cert.id} • Issued: {cert.issueDate}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const courseObj = courses.find((c) => c.id === cert.courseId) || courses[0];
                      onViewCertificate(courseObj);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-300 border border-slate-700 flex items-center gap-1.5"
                  >
                    <span>View / Print</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Unlocked Practice Sheets List */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Unlocked Practice Sheets ({unlockedSheets.length})
          </h3>

          {unlockedSheets.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 text-center">
              No sheets unlocked yet. You can preview free sample questions or unlock sheets for ₹99 - ₹199 each!
            </div>
          ) : (
            <div className="space-y-2">
              {unlockedSheets.map((courseId) => {
                const courseObj = courses.find((c) => c.id === courseId);
                if (!courseObj) return null;

                return (
                  <div
                    key={courseId}
                    className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          {courseObj.practiceSheet.title}
                        </h4>
                        <div className="text-[11px] text-emerald-400">
                          {courseObj.practiceSheet.totalQuestions}+ Questions with Full Solutions Unlocked
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectCourse(courseId, 'sheet');
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-xs font-bold text-amber-300 border border-amber-500/40 flex items-center gap-1.5"
                    >
                      <span>Open Sheet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
