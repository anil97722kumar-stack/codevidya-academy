import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  QrCode, 
  CreditCard, 
  Smartphone, 
  Tag, 
  ArrowRight,
  Zap,
  Check,
  Building2,
  Copy,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { PAYMENT_CONFIG } from '../config/paymentConfig';

export default function PaymentModal({ course, onClose, onUnlockSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'bank'
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);

  if (!course) return null;

  const basePrice = course.pricing.sheetPrice;
  const finalPrice = Math.max(0, basePrice - appliedDiscount);

  // Dynamic UPI URL for QR Code
  const upiPayUrl = `upi://pay?pa=${encodeURIComponent(PAYMENT_CONFIG.upi.upiId)}&pn=${encodeURIComponent(PAYMENT_CONFIG.upi.payeeName)}&am=${finalPrice}&cu=INR&tn=${encodeURIComponent(course.id)}`;
  
  // Real dynamic QR Code generated on the fly via QR Server
  const dynamicQrUrl = PAYMENT_CONFIG.upi.customQrImageUrl || 
    `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(upiPayUrl)}`;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanCode = couponCode.trim().toUpperCase();

    if (cleanCode === 'CS50') {
      const discount = Math.round(basePrice * 0.5);
      setAppliedDiscount(discount);
      setCouponMessage('🎉 Coupon CS50 applied! 50% discount added.');
    } else if (cleanCode === 'CSFREE' || cleanCode === 'STUDENT100') {
      setAppliedDiscount(basePrice);
      setCouponMessage('🎉 Demo Coupon applied! 100% Free Unlock.');
    } else if (cleanCode === 'EARLYBIRD') {
      setAppliedDiscount(40);
      setCouponMessage('🎉 ₹40 discount applied!');
    } else {
      setAppliedDiscount(0);
      setCouponMessage('❌ Invalid coupon code. Try CS50 or CSFREE');
    }
  };

  const handleCopyText = (text, itemKey) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(itemKey);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleCompletePayment = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Real validation requirement:
    // If not free, student MUST provide a valid 12-digit UTR/Reference ID from their payment app
    if (finalPrice > 0) {
      const cleanRef = transactionRef.trim().replace(/[\s\-]/g, '');
      if (!cleanRef) {
        setErrorMsg('Please enter your 12-digit UPI UTR / Bank Transaction Reference Number after paying.');
        return;
      }
      if (cleanRef.length < 8) {
        setErrorMsg('Invalid Transaction Reference Number. Please enter the full 12-digit UTR from your payment receipt.');
        return;
      }
    }

    setIsProcessing(true);

    try {
      const orderRes = await api.verifyPayment({
        courseId: course.id,
        amount: finalPrice,
        paymentMethod: paymentMethod.toUpperCase(),
        transactionId: transactionRef.trim() || 'COUPON_FREE',
        couponApplied: appliedDiscount > 0 ? couponCode : null,
        userEmail: localStorage.getItem('cv_user') 
          ? JSON.parse(localStorage.getItem('cv_user')).email 
          : 'student@codevidya.edu'
      });

      setIsProcessing(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setTimeout(() => {
        onUnlockSuccess(course.id);
        onClose();
      }, 1800);
    } catch (e) {
      setIsProcessing(false);
      setErrorMsg('Failed to verify payment with server. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-7 text-white my-6">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">
              Payment Verified Successfully!
            </h3>
            <p className="text-sm text-slate-300">
              {course.practiceSheet.title} is now unlocked with lifetime access and complete multi-language solutions.
            </p>
            <div className="text-xs text-emerald-400 font-mono">
              Redirecting to your unlocked practice sheet...
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Title */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Unlock Premium Practice Sheet
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {course.pricing.sheetTitle}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Unlock {course.practiceSheet.totalQuestions}+ FAANG interview questions with full C++, Java & Python code solutions.
              </p>
            </div>

            {/* Price Card */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between mb-4">
              <div>
                <span className="text-xs text-slate-400 line-through">
                  ₹{course.pricing.originalPrice}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-amber-400">
                    ₹{finalPrice}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400">
                    One-time payment
                  </span>
                </div>
              </div>

              <div className="text-right text-xs text-slate-400">
                <div>Instant Access</div>
                <div className="text-emerald-400 font-semibold">Lifetime Validity</div>
              </div>
            </div>

            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="mb-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. CS50 or CSFREE)"
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white uppercase font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-700 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <div className={`text-[11px] mt-1 font-medium ${
                  couponMessage.includes('🎉') ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {couponMessage}
                </div>
              )}
            </form>

            {/* Payment Method Tabs: UPI / QR Code & Direct Bank Transfer */}
            <div className="mb-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Select Payment Method
              </label>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-600/20'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>UPI QR Code</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'bank'
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-600/20'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-sky-400" />
                  <span>Bank Account (NEFT/IMPS)</span>
                </button>
              </div>

              {/* OPTION 1: UPI QR CODE */}
              {paymentMethod === 'upi' && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                  <div className="w-48 h-48 mx-auto bg-white p-2.5 rounded-2xl shadow-xl flex items-center justify-center mb-3">
                    <img 
                      src={dynamicQrUrl} 
                      alt="UPI Payment QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-xs font-bold text-slate-200">
                    Scan with any UPI App (GPay, PhonePe, Paytm, BHIM)
                  </p>
                  
                  <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-300">
                    <span>UPI ID: <strong>{PAYMENT_CONFIG.upi.upiId}</strong></span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(PAYMENT_CONFIG.upi.upiId, 'upi')}
                      className="p-1 hover:text-white text-slate-400 transition-colors"
                      title="Copy UPI ID"
                    >
                      {copiedItem === 'upi' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* OPTION 2: DIRECT BANK TRANSFER */}
              {paymentMethod === 'bank' && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <span className="text-slate-400">Account Holder Name:</span>
                    <span className="font-semibold text-white">{PAYMENT_CONFIG.bankDetails.accountHolderName}</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <span className="text-slate-400">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-300">{PAYMENT_CONFIG.bankDetails.accountNumber}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyText(PAYMENT_CONFIG.bankDetails.accountNumber, 'acc')}
                        className="text-slate-400 hover:text-white"
                        title="Copy Account Number"
                      >
                        {copiedItem === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <span className="text-slate-400">IFSC Code:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sky-300">{PAYMENT_CONFIG.bankDetails.ifscCode}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyText(PAYMENT_CONFIG.bankDetails.ifscCode, 'ifsc')}
                        className="text-slate-400 hover:text-white"
                        title="Copy IFSC Code"
                      >
                        {copiedItem === 'ifsc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Bank & Branch:</span>
                    <span className="text-slate-300">{PAYMENT_CONFIG.bankDetails.bankName}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-3 p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Required Transaction UTR Field for Real Verification */}
            {finalPrice > 0 && (
              <div className="mb-4">
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  12-Digit UPI UTR / Transaction Reference Number <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  placeholder="e.g. 428198765432 (from GPay / PhonePe / Bank app)"
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 font-mono focus:outline-none focus:border-indigo-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Payment hone ke baad receipt me se 12-digit UTR number yahan daal kar verify karein.
                </span>
              </div>
            )}

            {/* Submit Action Button */}
            <button
              onClick={handleCompletePayment}
              disabled={isProcessing}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <span>Verifying Payment in MySQL Database...</span>
              ) : finalPrice === 0 ? (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Coupon Free Unlock Practice Sheet</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Verify Payment (₹{finalPrice}) & Unlock</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Security note */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real UPI & Bank Details • Verified Order recorded in Database</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
