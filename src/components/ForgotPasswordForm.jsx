import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useToaster } from './context/ToastContext.jsx'

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // const showToast = useToaster()

  useEffect(() => {
    if (resendCooldown > 0) {
      const interval = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [resendCooldown]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);

    // شبیه‌سازی ریکوئست به سرور (مثلاً برای ۲ ثانیه)
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      setResendCooldown(30);
    }, 2000);
  }

  function handleResend() {
    if (resendCooldown > 0) return; // جلوگیری از اسپم کردن دکمه Resend
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResendCooldown(30);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-6 select-none font-sans">
      <div className="w-full max-w-md bg-[#181818] border border-[#282828] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">

        {/* افکت هاله نوری سبز محو در پس‌زمینه کارت */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#1ed760]/10 blur-[80px] rounded-full pointer-events-none" />

        {/* 🟢 فاز اول: فرم درخواست ایمیل */}
        {!isSent ? (
          <div className="animate-[fadeIn_.3s_ease-out]">
            {/* دکمه بازگشت به عقب */}
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors mb-8 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back
            </Link>

            <h1 className="text-white text-2xl font-extrabold tracking-tight mb-2">Forgot your password?</h1>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Enter the email address associated with your account.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="forgot-email" className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Email Address</label>
                <input
                  id="forgot-email"
                  type="email"
                  required
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-black text-white px-4 py-3.5 rounded-xl outline-none border border-[#282828] focus:border-white focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-600 text-sm font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full mt-2 bg-[#1ed760] text-black font-bold py-3.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Send reset link"
                )}
              </button>
            </form>
          </div>
        ) : (
          /* 🟢 فاز دوم: تایید ارسال ایمیل (موفقیت‌آمیز) */
          <div className="flex flex-col items-center text-center animate-[fadeIn_.3s_ease-out]">
            {/* آیکون تیک سبز دایره‌ای */}
            <div className="w-16 h-16 bg-[#1ed760]/10 border border-[#1ed760]/30 text-[#1ed760] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#1ed760]/5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>

            <h1 className="text-white text-2xl font-extrabold tracking-tight mb-2">Check your email</h1>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-1">
              We&#39;ve sent a password reset link to:
            </p>
            <span className="text-white text-sm font-semibold mb-6 block bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 break-all">{email}</span>

            <p className="text-gray-400 text-xs mb-8">
              Open your inbox and continue.
            </p>

            <div className="w-full flex flex-col gap-y-3">
              <button
                onClick={handleResend}
                disabled={isLoading || resendCooldown > 0}
                className="w-full bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-full hover:bg-white/10 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : resendCooldown > 0 ? (
                  `Resend email (${resendCooldown}s)`
                ) : (
                  "Resend email"
                )}
              </button>

              <Link
                to="/login"
                className="w-full text-center text-gray-400 hover:text-white font-semibold text-sm py-2 transition-colors mt-2"
              >
                Back to login
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ForgotPasswordForm;