import LoginBtn from './LoginBtn.jsx'
import { useState } from 'react'
import AuthLayout from './AuthLayout.jsx'
import BackBtn from './BackBtn.jsx'
import TitleLogin from './TitleLogin.jsx'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useLogin } from '../features/useLogin.js'
import { useLocation } from 'react-router-dom'
import { useOtp } from '../features/useOtp.js'
import { useToaster } from '../context/ToastContext.jsx'

function PasswordForm() {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()
  const { showToast } = useToaster()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onSubmit' })

  const { login, isPending } = useLogin()
  const { otpLogin, isPending: isSendingOtp } = useOtp()

  const email = state?.email;

  function handleOtpClick() {
    if (!email) {
      showToast("Email missing", "Please enter your email first", "error");
      return navigate("/login");
    }
    otpLogin(email);
  }

  function onSubmit(data) {
    if (!email) {
      showToast("Email missing", "Please go back and enter your email", "error");
      return;
    }

    login(
      { email, password: data.password },
      {
        onError: (err) => {
          showToast(
            "Incorrect credentials",
            err?.message || "Invalid email or password. Please try again.",
            "error"
          );
        }
      }
    );
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full relative" noValidate>
        <div className="absolute -top-2 -left-2">
          <BackBtn />
        </div>

        <div className="mb-6 flex flex-col items-center text-center">
          <TitleLogin>Enter your password</TitleLogin>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed">
            Continue as
          </p>
          <p className="text-white font-semibold mt-0.5 text-sm bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 inline-block">
            {email || "Unknown user"}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="inputpass" className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5 block mb-2">
            Password
          </label>

          <div className="relative">
            <input
              id="inputpass"
              {...register("password", {
                required: "Password is required"
              })}
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className={`w-full bg-black text-white px-4 py-3.5 pr-12 rounded-xl outline-none border transition-all duration-200 placeholder-gray-600 text-sm font-medium ${
                errors.password
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-[#282828] focus:border-white focus:ring-1 focus:ring-white'
              }`}
            />

            {errors.password && (
              <span className="text-xs text-red-400 mt-1.5 block text-left px-0.5">
              {errors.password.message}
            </span>
            )}

            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none p-1"
            >
              {show ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12c1.274 4.057 5.065 7 9.542 7 4.477 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7-4.477 0-8.268 2.943-9.542 7Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )}
            </button>
          </div>


        </div>

        <button
          type="button"
          onClick={() => navigate(`/login/forgot-password`, { state: { email } })}
          className="text-spotify-green text-xs font-bold tracking-wide hover:underline uppercase block mb-6 px-0.5 bg-transparent border-none outline-none cursor-pointer"
        >
          Forgot password?
        </button>

        <LoginBtn className="mt-2" disabled={isPending}>
          {isPending ? "Logging in..." : "Continue"}
        </LoginBtn>

        <div className="w-full text-center mt-5">
          <button
            type="button"
            onClick={handleOtpClick}
            disabled={isSendingOtp}
            className="text-sm font-bold text-gray-400 hover:text-spotify-green transition-colors hover:underline bg-transparent border-none outline-none cursor-pointer disabled:opacity-50"
          >
            {isSendingOtp ? "Sending code..." : "Log in with a one-time code"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default PasswordForm;