import LoginBtn from './LoginBtn.jsx'
import { useState } from 'react'
import AuthLayout from './AuthLayout.jsx'
import BackBtn from './BackBtn.jsx'
import TitleLogin from './TitleLogin.jsx'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useLogin } from '../features/useLogin.js'
import { useLocation } from 'react-router'
import { useOtp } from '../features/useOtp.js'

function PasswordForm() {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm()
  const {state} = useLocation()
  const {login , isPending} = useLogin()
  const {otpLogin} = useOtp()


  const email = state?.email;

  function handleClick() {
    otpLogin(email);
  }



  function onSubmit(data) {
    login({
      email,
      password: data.password,
    });
  }


  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full relative">
        <div className="absolute -top-2 -left-2">
          <BackBtn />
        </div>

        <div className="mb-6 flex flex-col items-center text-center">
          <TitleLogin>Enter your password</TitleLogin>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed">
            Continue as
          </p>
          <p className="text-white font-semibold mt-0.5 text-sm bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 inline-block">
            {email}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="inputpass" className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5 block mb-2">
            Password
          </label>

          <div className="relative">
            <input
              {...register("password")}
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full bg-black text-white px-4 py-3.5 pr-12 rounded-xl outline-none border border-[#282828] focus:border-white focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-600 text-sm font-medium"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors text-lg"
            >
              {show ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate(`/login/forgot-password`)}
          className="text-[#1ED760] text-xs font-bold tracking-wide hover:underline uppercase block mb-6 px-0.5"
        >
          Forgot password?
        </button>

        <LoginBtn  className="mt-2" disabled={isPending}>
          {isPending ? "..." : "Continue"}
        </LoginBtn>

        <div className="w-full text-center mt-5">
          <button
            type="button"
            onClick={() => handleClick()}
            className="text-sm font-bold text-gray-400 hover:text-[#1ED760] transition-colors hover:underline"
          >
            Log in with a one-time code
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default PasswordForm;