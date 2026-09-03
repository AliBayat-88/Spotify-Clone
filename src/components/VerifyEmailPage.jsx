import { Link, useLocation } from 'react-router-dom';
import AuthLayout from './AuthLayout.jsx';
import TitleLogin from './TitleLogin.jsx';
import { useResendVerification } from '../features/useResendVerification.js'
import ButtonLoader from './ButtonLoader.jsx'

function VerifyEmailPage() {
  const { state } = useLocation()
  console.log(state?.email)

  const email = state?.email || 'ali@example.com';

  const { resendVerification, isPending } = useResendVerification();

  function handleResend() {
    if (!email) return;
    resendVerification(email);
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center text-center w-full animate-[fadeIn_.3s_ease-out]">

        <div className="w-16 h-16 bg-spotify-green/10 border border-spotify-green/30 text-spotify-green rounded-full flex items-center justify-center mb-6 shadow-lg shadow-spotify-green/5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </div>

        <TitleLogin>Verify your email</TitleLogin>

        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
          We&#39;ve sent a verification email to:
        </p>

        <span className="text-white text-sm font-semibold mt-2 mb-4 block bg-black/50 px-4 py-2 rounded-xl border border-white/10 break-all shadow-inner">
          {email}
        </span>

        <p className="text-gray-400 text-xs mb-8">
          Open your inbox and click the verification link.
        </p>

        <div className="w-full flex flex-col gap-y-3">
          <button
            onClick={handleResend}
            disabled={isPending}
            className="w-full bg-white/5 border border-white/10 hover:border-white/20 text-white font-bold py-3.5 rounded-full hover:bg-white/10 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isPending ? (
              <ButtonLoader/>
            ) : (
              "Resend email"
            )}
          </button>

          <Link
            to="/login"
            className="text-gray-400 hover:text-white font-semibold text-xs py-2 transition-colors mt-2"
          >
            Back to login
          </Link>
        </div>

      </div>
    </AuthLayout>
  );
}

export default VerifyEmailPage;