import React, { useState, useEffect } from 'react';
import { 
  X, 
  Award, 
  Download, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  Share2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

export default function CertificateModal({ 
  course, 
  onClose, 
  studentName, 
  setStudentName,
  onSaveCertificate 
}) {
  const [name, setName] = useState(studentName || 'Aditya Sharma');
  const [certId, setCertId] = useState('');
  const [issueDate, setIssueDate] = useState('');

  useEffect(() => {
    // Generate clean unique ID
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const code = (course ? course.id.substring(0, 3).toUpperCase() : 'CS');
    const id = `CV-2026-${code}-${randomHex}`;
    setCertId(id);

    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setIssueDate(today);

    // Save to backend database API asynchronously
    if (course) {
      api.issueCertificate({
        studentName: name,
        courseId: course.id,
        courseTitle: course.title,
        scorePercentage: 90
      }).then(res => {
        if (res && res.certificate && res.certificate.cert_id) {
          setCertId(res.certificate.cert_id);
        }
      }).catch(() => {});
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  }, [course]);

  const handlePrint = () => {
    // Save to user earned list
    if (onSaveCertificate && course) {
      onSaveCertificate({
        id: certId,
        courseId: course.id,
        courseTitle: course.title,
        studentName: name,
        issueDate: issueDate
      });
    }

    const printContents = document.getElementById('printable-certificate-area').innerHTML;
    const printWindow = window.open('', '', 'width=1000,height=750');
    printWindow.document.write(`
      <html>
        <head>
          <title>Certificate - ${name} - ${course?.title}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;600;700&display=swap');
            body {
              margin: 0;
              padding: 20px;
              background-color: #f8fafc;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: 'Inter', sans-serif;
            }
            .cert-box {
              width: 900px;
              height: 620px;
              background: #ffffff;
              border: 12px double #b45309;
              padding: 40px;
              box-sizing: border-box;
              position: relative;
              text-align: center;
              box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            }
            .cert-title {
              font-family: 'Cinzel', serif;
              font-size: 34px;
              letter-spacing: 4px;
              color: #1e293b;
              margin: 10px 0 5px;
              text-transform: uppercase;
            }
            .cert-sub {
              font-size: 14px;
              color: #b45309;
              letter-spacing: 2px;
              text-transform: uppercase;
              font-weight: 700;
            }
            .cert-name {
              font-family: 'Cinzel', serif;
              font-size: 38px;
              color: #0f172a;
              border-bottom: 2px solid #b45309;
              display: inline-block;
              padding: 5px 30px;
              margin: 20px 0 10px;
              font-weight: 800;
            }
            .cert-body {
              font-size: 15px;
              color: #475569;
              max-width: 650px;
              margin: 10px auto;
              line-height: 1.6;
            }
            .cert-course {
              font-size: 22px;
              font-weight: 800;
              color: #1e293b;
              margin: 8px 0;
            }
            .cert-footer {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              margin-top: 40px;
              padding: 0 40px;
            }
            .cert-sign {
              text-align: center;
              border-top: 1px solid #94a3b8;
              padding-top: 6px;
              font-size: 12px;
              color: #64748b;
              width: 180px;
            }
            .gold-seal {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              border: 3px solid #d97706;
              background: #fef3c7;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 11px;
              font-weight: bold;
              color: #92400e;
              text-align: center;
              text-transform: uppercase;
            }
            .cert-id {
              font-family: monospace;
              font-size: 11px;
              color: #64748b;
            }
            @media print {
              body { padding: 0; background: none; }
              .cert-box { box-shadow: none; border-color: #b45309; }
            }
          </style>
        </head>
        <body>
          <div class="cert-box">
            <div class="cert-sub">CodeVidya • Academy of Computer Science</div>
            <div class="cert-title">Certificate of Achievement</div>
            <div style="font-size: 13px; color: #64748b; margin-top: 5px;">This is officially presented to</div>
            
            <div class="cert-name">${name}</div>

            <div class="cert-body">
              for successfully mastering the curriculum, passing the comprehensive technical examination, and completing all coursework in
              <div class="cert-course">${course?.title || 'Data Structures & Algorithms'}</div>
              demonstrating profound proficiency in Computer Science principles & problem solving.
            </div>

            <div class="cert-footer">
              <div class="cert-sign">
                <div style="font-family: 'Cinzel', serif; font-size: 14px; color: #1e293b; font-weight: bold;">
                  ${course?.instructor || 'Director of Education'}
                </div>
                Course Instructor
              </div>

              <div class="gold-seal">
                Official<br/>Certified<br/>2026
              </div>

              <div class="cert-sign">
                <div style="font-family: 'Cinzel', serif; font-size: 14px; color: #1e293b; font-weight: bold;">
                  Dr. K. S. Rao
                </div>
                Academic Board Chairman
              </div>
            </div>

            <div style="margin-top: 25px; display: flex; justify-content: space-between; align-items: center; padding: 0 40px; font-size: 11px; color: #64748b;">
              <div>Issue Date: <strong>${issueDate}</strong></div>
              <div class="cert-id">Credential Verification ID: <strong>${certId}</strong></div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold mb-2">
              <CheckCircle2 className="w-4 h-4" />
              Verified Industry Credential
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Official Course Completion Certificate
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              Download / Print PDF
            </button>
          </div>
        </div>

        {/* Name input customization */}
        <div className="my-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs text-slate-300 font-medium">
            Recipient Full Name (Shown on certificate):
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (setStudentName) setStudentName(e.target.value);
            }}
            placeholder="Enter your full name"
            className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 min-w-[260px]"
          />
        </div>

        {/* Certificate Visual Preview */}
        <div
          id="printable-certificate-area"
          className="relative bg-gradient-to-br from-amber-50 via-slate-50 to-orange-50 text-slate-900 rounded-2xl p-6 sm:p-10 border-8 border-amber-600/80 shadow-2xl overflow-hidden select-none"
        >
          {/* Ornate corner marks */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-amber-700" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-amber-700" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-amber-700" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-amber-700" />

          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Award className="w-96 h-96 text-slate-900" />
          </div>

          <div className="text-center relative z-10">
            {/* Top Subtitle */}
            <div className="text-amber-800 text-xs sm:text-sm uppercase font-bold tracking-widest font-mono">
              CodeVidya • Institute of Computer Science & Technology
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wide text-slate-900 mt-2 font-serif">
              Certificate of Achievement
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              This certificate is proudly awarded to
            </p>

            {/* Recipient Name */}
            <div className="my-4">
              <span className="text-2xl sm:text-4xl font-black text-slate-950 border-b-2 border-amber-600 px-6 pb-1 inline-block font-serif">
                {name || 'Student Name'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
              for successfully completing all coursework, mastering core concepts, and passing the rigorous final examination with excellence in
            </p>

            {/* Course Title */}
            <h2 className="text-lg sm:text-2xl font-extrabold text-amber-900 mt-2 mb-4">
              {course?.title || 'Data Structures & Algorithms'}
            </h2>

            {/* Bottom Row */}
            <div className="grid grid-cols-3 items-end mt-8 pt-4 border-t border-slate-300">
              
              {/* Instructor Signature */}
              <div className="text-center">
                <div className="font-serif italic font-bold text-slate-800 text-sm sm:text-base">
                  {course?.instructor?.split(' ')[1] || 'Rajesh Verma'}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 border-t border-slate-400 mt-1 pt-1">
                  Lead Instructor
                </div>
              </div>

              {/* Seal Stamp */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-amber-600 bg-amber-100/80 flex flex-col items-center justify-center shadow-md">
                  <ShieldCheck className="w-5 h-5 text-amber-700" />
                  <span className="text-[9px] font-black text-amber-800 uppercase tracking-tighter mt-0.5">
                    VERIFIED
                  </span>
                  <span className="text-[8px] text-amber-700 font-mono">
                    2026
                  </span>
                </div>
              </div>

              {/* Chairman Signature */}
              <div className="text-center">
                <div className="font-serif italic font-bold text-slate-800 text-sm sm:text-base">
                  Dr. K. S. Rao
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 border-t border-slate-400 mt-1 pt-1">
                  Academic Director
                </div>
              </div>

            </div>

            {/* Verification Metadata Footnote */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 mt-6 pt-3 border-t border-slate-200">
              <div>Issue Date: <strong className="text-slate-700">{issueDate}</strong></div>
              <div className="font-mono">
                Credential Verification ID: <strong className="text-amber-800">{certId}</strong>
              </div>
            </div>

          </div>
        </div>

        {/* Verification note */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>This credential can be verified anytime on our Verification Portal using ID: <code className="text-amber-300 font-mono">{certId}</code></span>
          </div>
        </div>

      </div>
    </div>
  );
}
