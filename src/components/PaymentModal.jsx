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
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

export default function PaymentModal({ course, onClose, onUnlockSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!course) return null;

  const basePrice = course.pricing.sheetPrice;
  const finalPrice = Math.max(0, basePrice - appliedDiscount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
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

  const handleCompletePayment = async () => {
    setIsProcessing(true);

    try {
      await api.verifyPayment({
        courseId: course.id,
        amount: finalPrice,
        paymentMethod: paymentMethod.toUpperCase(),
        couponApplied: appliedDiscount > 0 ? couponCode : null,
        userEmail: 'student@codevidya.edu'
      });
    } catch (e) {
      console.warn('API sync warning:', e);
    }

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setTimeout(() => {
        onUnlockSuccess(course.id);
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 text-white">
        
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
              Payment Successful!
            </h3>
            <p className="text-sm text-slate-300">
              {course.practiceSheet.title} has been unlocked with lifetime access.
            </p>
            <div className="text-xs text-emerald-400 font-mono">
              Redirecting to your unlocked practice sheet...
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Title */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Unlock Premium Practice Sheet
              </div>
              <h2 className="text-xl font-bold text-white">
                {course.pricing.sheetTitle}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Classes & Notes are free! Unlock {course.practiceSheet.totalQuestions}+ FAANG interview questions with full C++, Java & Python code solutions.
              </p>
            </div>

            {/* Price Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between mb-5">
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
            <form onSubmit={handleApplyCoupon} className="mb-5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon (e.g. CS50 or CSFREE)"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white uppercase font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-700 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <div className={`text-[11px] mt-1.5 font-medium ${
                  couponMessage.includes('🎉') ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {couponMessage}
                </div>
              )}
            </form>

            {/* Payment method selector */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Choose Payment Method
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>NetBanking</span>
                </button>
              </div>

              {/* Payment preview visual */}
              {paymentMethod === 'upi' && (
                <div className="mt-3 p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
                      <QrCode className="w-8 h-8 text-slate-900" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Google Pay / PhonePe / Paytm</div>
                      <div className="text-[11px] text-slate-400">Scan & pay or pay via UPI ID</div>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold">Fast</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={handleCompletePayment}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Simulating Secure Payment...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹{finalPrice} & Unlock Practice Sheet</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Security note */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-bit SSL Simulated Secure Payment • Instant Unlock</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
