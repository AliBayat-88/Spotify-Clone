import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import AuthLayout from './AuthLayout.jsx';
import TitleLogin from './TitleLogin.jsx';
import BackBtn from './BackBtn.jsx';
import { useVerifyOtp } from '../features/useVerifyOtp.js';
import { useOtp } from '../features/useOtp.js';

function OtpForm() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef([]);
  const { verify, isPending } = useVerifyOtp();
  const { state } = useLocation();
  const { otpLogin } = useOtp();

  const email = state?.email;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
      return;
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newOtp = ['', '', '', '', '', ''];
    pasted.split('').forEach((digit, i) => {
      newOtp[i] = digit;
    });
    setOtp(newOtp);

    const nextIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  function handleResend() {
    if (timer === 0) {
      otpLogin(email);
      setTimer(59);
    }
  }

  const handleSubmit = () => {
    const code = otp.join("");

    if (code.length === 6 && !isPending) {
      verify({
        email,
        token: code,
      });
    }
  };

  return (
    <AuthLayout>
      <div className="w-full relative">
        <div className="absolute -top-2 -left-2">
          <BackBtn/>
        </div>

        <div className="flex flex-col justify-center items-center text-center mb-6 w-full">
          <TitleLogin>Enter your code</TitleLogin>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">We sent a 6-digit code to your email.</p>
        </div>

        <div className="flex justify-between gap-2 w-full mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-11 h-14 text-center bg-black text-white text-2xl font-black rounded-xl border border-[#282828] focus:border-white focus:ring-1 focus:ring-white outline-none transition-all duration-200"
            />
          ))}
        </div>

        <div className="text-sm mb-6 text-center w-full">
          {timer > 0 ? (
            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
              Resend code in <span className="text-gray-300 font-mono text-sm bg-black/40 px-2 py-1 rounded border border-white/5 ml-1">{timer < 10 ? `0${timer}` : timer}</span>
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="text-spotify-green hover:underline font-bold text-sm transition-all"
            >
              Resend code
            </button>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={otp.includes('') || isPending}
          className="w-full bg-spotify-green disabled:opacity-40 text-black font-bold py-3.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all mb-6 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            "Verify & Continue"
          )}
        </button>

        <div className="flex flex-col items-center justify-center border-t border-white/5 pt-4 w-full">
          <p className="text-gray-400 text-xs font-medium">Remember your password?</p>
          <button
            onClick={() => navigate('/login')}
            className="text-white hover:text-spotify-green text-sm font-bold tracking-tight underline decoration-gray-600 hover:decoration-spotify-green transition-colors mt-1.5"
          >
            Log in with password
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}

export default OtpForm;