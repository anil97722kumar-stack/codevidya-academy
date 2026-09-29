import React, { useState } from 'react';
import { 
  PlayCircle, 
  FileText, 
  Sparkles, 
  Award, 
  Users, 
  Clock, 
  Star, 
  ChevronRight,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function CourseCatalog({ 
  courses, 
  onSelectCourse, 
  unlockedSheets, 
  searchQuery 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All', 
    'Programming Languages', 
    'DSA & Coding', 
    'Core Computer Science', 
    'Databases & Backend', 
    'Web Development', 
    'AI & Data Science'
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = 
      !searchQuery || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="courses-section">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Computer Science Curriculum
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Explore All Computer Science Courses
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Choose a subject to watch free video lectures, read notes, solve interview sheets with code solutions, and claim your certificate.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-base">No courses found matching your criteria.</p>
          <button 
            onClick={() => setSelectedCategory('All')}
            className="mt-3 text-sm text-indigo-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isSheetUnlocked = unlockedSheets.includes(course.id);

            return (
              <div
                key={course.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-xl hover:shadow-indigo-950/20 transition-all flex flex-col group"
              >
                {/* Thumbnail Header */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur border border-slate-700 text-[11px] font-semibold text-slate-200">
                      {course.category}
                    </span>
                    {course.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-600/90 text-white text-[11px] font-bold shadow">
                        {course.badge}
                      </span>
                    )}
                  </div>

                  {/* Rating / Enrolled overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded-md backdrop-blur">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-white">{course.rating}</span>
                      <span className="text-slate-400">({course.reviewsCount})</span>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded-md backdrop-blur text-slate-300">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{course.studentsCount}</span>
                    </div>
                  </div>
                </div>

                {/* Course Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Instructor & Duration */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pb-3 border-b border-slate-800/80">
                      <span className="truncate max-w-[180px]">By {course.instructor}</span>
                      <span className="flex items-center gap-1 font-mono text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {course.duration}
                      </span>
                    </div>

                    {/* What's Free vs Paid Breakdown */}
                    <div className="space-y-1.5 mt-3 text-xs">
                      <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
                          <PlayCircle className="w-3.5 h-3.5" />
                          Video Lectures ({course.lectures.length} Classes)
                        </span>
                        <span className="font-extrabold text-emerald-400 uppercase tracking-wider text-[11px]">
                          100% FREE
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                          <FileText className="w-3.5 h-3.5" />
                          Handcrafted Revision Notes
                        </span>
                        <span className="font-extrabold text-cyan-400 uppercase tracking-wider text-[11px]">
                          FREE
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-amber-500/10 border border-amber-500/25">
                        <span className="flex items-center gap-1.5 text-amber-300 font-medium truncate">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          {course.practiceSheet.totalQuestions}+ Questions + Solutions
                        </span>
                        <span className="font-extrabold text-amber-400 text-[11px] whitespace-nowrap">
                          {isSheetUnlocked ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> UNLOCKED
                            </span>
                          ) : (
                            `₹${course.pricing.sheetPrice}`
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                        <span className="flex items-center gap-1.5 text-indigo-300 font-medium">
                          <Award className="w-3.5 h-3.5" />
                          Official Industry Certificate
                        </span>
                        <span className="font-bold text-indigo-400 text-[11px]">
                          INCLUDED
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-5 pt-3 border-t border-slate-800">
                    <button
                      onClick={() => onSelectCourse(course.id, 'classes')}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/20 group/btn"
                    >
                      <span>Open Course (Free Classes & Notes)</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
