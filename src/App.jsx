import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseCatalog from './components/CourseCatalog';
import CourseDetail from './components/CourseDetail';
import CertificateModal from './components/CertificateModal';
import CertificateVerifier from './components/CertificateVerifier';
import PaymentModal from './components/PaymentModal';
import CodePlaygroundModal from './components/CodePlaygroundModal';
import DashboardModal from './components/DashboardModal';
import DatabaseModal from './components/DatabaseModal';
import StudentAuthBarrier from './components/StudentAuthBarrier';
import ChatModal from './components/ChatModal';
import Footer from './components/Footer';
import { COURSES_DATA } from './data/coursesData';

function App() {
  const [activeView, setActiveView] = useState('home'); // 'home' | courseId
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Database Modal state
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);

  // Chat Modal state
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Theme state ('dark' | 'light')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('cv_theme') || 'dark';
  });

  // Current authenticated student (Stored from MySQL login/register)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('cv_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  // Persisted student state
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('cv_student_name') || 'Aditya Sharma';
  });

  const [unlockedSheets, setUnlockedSheets] = useState(() => {
    try {
      const stored = localStorage.getItem('cv_unlocked_sheets');
      return stored ? JSON.parse(stored) : ['dsa-mastery', 'java-mastery'];
    } catch (e) {
      return ['dsa-mastery', 'java-mastery'];
    }
  });

  const [earnedCertificates, setEarnedCertificates] = useState(() => {
    try {
      const stored = localStorage.getItem('cv_earned_certificates');
      return stored ? JSON.parse(stored) : [
        {
          id: 'CV-2026-DSA-8912',
          courseId: 'dsa-mastery',
          courseTitle: 'Data Structures & Algorithms (DSA Mastery)',
          studentName: 'Aditya Sharma',
          issueDate: 'January 14, 2026'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [completedLectures, setCompletedLectures] = useState(() => {
    try {
      const stored = localStorage.getItem('cv_completed_lectures');
      return stored ? JSON.parse(stored) : {
        'dsa-mastery-l1': true,
        'dsa-mastery-l2': true
      };
    } catch (e) {
      return {};
    }
  });

  // Modals state
  const [paymentModalCourse, setPaymentModalCourse] = useState(null);
  const [certificateModalCourse, setCertificateModalCourse] = useState(null);
  const [isVerifierOpen, setIsVerifierOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [playgroundConfig, setPlaygroundConfig] = useState(null); // { language, code }

  // Sync theme to document element
  useEffect(() => {
    localStorage.setItem('cv_theme', theme);
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('cv_student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('cv_unlocked_sheets', JSON.stringify(unlockedSheets));
  }, [unlockedSheets]);

  useEffect(() => {
    localStorage.setItem('cv_earned_certificates', JSON.stringify(earnedCertificates));
  }, [earnedCertificates]);

  useEffect(() => {
    localStorage.setItem('cv_completed_lectures', JSON.stringify(completedLectures));
  }, [completedLectures]);

  const [selectedCourseTab, setSelectedCourseTab] = useState('classes');

  // Handlers
  const handleSelectCourse = (courseId, tab = 'classes') => {
    setSelectedCourseId(courseId);
    setSelectedCourseTab(tab);
    setActiveView(courseId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlockSheetSuccess = (courseId) => {
    if (!unlockedSheets.includes(courseId)) {
      setUnlockedSheets((prev) => [...prev, courseId]);
    }
  };

  const handleSaveCertificate = (newCert) => {
    setEarnedCertificates((prev) => {
      const exists = prev.find((c) => c.id === newCert.id);
      if (exists) return prev;
      return [newCert, ...prev];
    });
  };

  const handleToggleLectureComplete = (courseId, lectureId) => {
    const key = `${courseId}-${lectureId}`;
    setCompletedLectures((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleOpenPlayground = (language, code) => {
    setPlaygroundConfig({ initialLanguage: language, initialCode: code });
  };

  const handleAuthSuccess = ({ user, unlockedSheets: userSheets, certificates: userCerts }) => {
    setCurrentUser(user);
    setStudentName(user.name);
    localStorage.setItem('cv_user', JSON.stringify(user));
    if (userSheets && userSheets.length > 0) {
      setUnlockedSheets((prev) => Array.from(new Set([...prev, ...userSheets])));
    }
    if (userCerts && userCerts.length > 0) {
      setEarnedCertificates((prev) => [...userCerts, ...prev]);
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('cv_user');
  };

  const selectedCourse = COURSES_DATA.find((c) => c.id === selectedCourseId);

  // Requirement: Every student must first sign in with Gmail, Phone, and Password before accessing the website
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950">
        <StudentAuthBarrier
          onAuthSuccess={handleAuthSuccess}
          onOpenVerifier={() => setIsVerifierOpen(true)}
        />
        {isVerifierOpen && (
          <CertificateVerifier
            onClose={() => setIsVerifierOpen(false)}
            earnedCertificates={earnedCertificates}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Navigation: Retaining only Chat and Sun icons at the top */}
      <Navbar
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          if (view === 'home') setSelectedCourseId(null);
        }}
        unlockedSheets={unlockedSheets}
        earnedCertificates={earnedCertificates}
        onOpenVerifier={() => setIsVerifierOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onFilterMode={(mode) => {
          if (activeView !== 'home') {
            setActiveView('home');
            setSelectedCourseId(null);
          }
          setTimeout(() => {
            const el = document.getElementById('courses-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
        onOpenChat={() => setIsChatOpen(true)}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeView === 'home' || !selectedCourse ? (
          <>
            <Hero
              onExploreCourses={(mode) => {
                const el = document.getElementById('courses-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenVerifier={() => setIsVerifierOpen(true)}
            />

            <CourseCatalog
              courses={COURSES_DATA}
              onSelectCourse={handleSelectCourse}
              unlockedSheets={unlockedSheets}
              searchQuery={searchQuery}
            />
          </>
        ) : (
          <CourseDetail
            course={selectedCourse}
            initialTab={selectedCourseTab}
            onBack={() => {
              setActiveView('home');
              setSelectedCourseId(null);
            }}
            unlockedSheets={unlockedSheets}
            onOpenPayment={(crs) => setPaymentModalCourse(crs)}
            onOpenCertificate={(crs) => setCertificateModalCourse(crs)}
            completedLectures={completedLectures}
            onToggleLectureComplete={handleToggleLectureComplete}
            onOpenPlayground={handleOpenPlayground}
          />
        )}
      </main>

      {/* Modals */}
      {paymentModalCourse && (
        <PaymentModal
          course={paymentModalCourse}
          onClose={() => setPaymentModalCourse(null)}
          onUnlockSuccess={handleUnlockSheetSuccess}
        />
      )}

      {certificateModalCourse && (
        <CertificateModal
          course={certificateModalCourse}
          onClose={() => setCertificateModalCourse(null)}
          studentName={studentName}
          setStudentName={setStudentName}
          onSaveCertificate={handleSaveCertificate}
        />
      )}

      {isVerifierOpen && (
        <CertificateVerifier
          onClose={() => setIsVerifierOpen(false)}
          earnedCertificates={earnedCertificates}
        />
      )}

      {isDashboardOpen && (
        <DashboardModal
          onClose={() => setIsDashboardOpen(false)}
          studentName={studentName}
          setStudentName={setStudentName}
          unlockedSheets={unlockedSheets}
          earnedCertificates={earnedCertificates}
          completedLectures={completedLectures}
          courses={COURSES_DATA}
          onSelectCourse={(courseId) => {
            handleSelectCourse(courseId);
          }}
          onViewCertificate={(course) => {
            setCertificateModalCourse(course);
          }}
        />
      )}

      {playgroundConfig && (
        <CodePlaygroundModal
          initialLanguage={playgroundConfig.initialLanguage}
          initialCode={playgroundConfig.initialCode}
          onClose={() => setPlaygroundConfig(null)}
        />
      )}

      {isDbModalOpen && (
        <DatabaseModal onClose={() => setIsDbModalOpen(false)} />
      )}

      {isChatOpen && (
        <ChatModal
          studentName={currentUser?.name}
          onClose={() => setIsChatOpen(false)}
        />
      )}

      {/* Global Footer */}
      <Footer onOpenVerifier={() => setIsVerifierOpen(true)} />

    </div>
  );
}

export default App;
