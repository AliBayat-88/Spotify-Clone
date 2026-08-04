import LoginBtn from './LoginBtn.jsx'
import GoogleLoginBtn from './GoogleLoginBtn.jsx'
import HaveAccount from './HaveAccount.jsx'
import TitleLogin from './TitleLogin.jsx'
import AuthLayout from './AuthLayout.jsx'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useLoginByGoogle } from '../features/useLoginByGoogle.js'

function LoginForm() {
  const navigate = useNavigate();

  // 🟢 ۱. گرفتن errors از formState برای مدیریت پیام‌های خطا
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit'
  });

  const { googleLogin } = useLoginByGoogle();

  function handleGoogleLogin() {
    googleLogin();
  }

  function onSubmit(data) {
    navigate("/login/password-login", {
      state: {
        email: data.email.trim(),
      },
    });
  }

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-center text-center mb-6 w-full">
        <TitleLogin>Welcome back</TitleLogin>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
        <div className="mb-5">
          <label htmlFor="emailInput" className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5 block mb-2">
            Email
          </label>
          <input
            id="emailInput"
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address"
              }
            })}
            type="email"
            autoComplete="email"
            className={`w-full bg-black text-white px-4 py-3.5 rounded-xl outline-none border transition-all duration-200 placeholder-gray-600 text-sm font-medium ${
              errors.email
                ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-[#282828] focus:border-white focus:ring-1 focus:ring-white'
            }`}
            placeholder="example@gmail.com"
          />

          {/* پیام خطای ولیدیشن ایمیل */}
          {errors.email && (
            <span className="text-xs text-red-400 mt-1.5 block text-left px-0.5">
              {errors.email.message}
            </span>
          )}
        </div>

        <LoginBtn>Continue</LoginBtn>

        <div className="flex justify-center items-center my-5 font-bold text-xs uppercase tracking-widest text-gray-500 gap-3">
          <div className="h-px bg-[#282828] flex-1"></div>
          <span>or</span>
          <div className="h-px bg-[#282828] flex-1"></div>
        </div>

        <div className="flex flex-col gap-y-4 w-full">
          <GoogleLoginBtn onClick={handleGoogleLogin} />
          <HaveAccount to="/signUp" textState="Sign up" questionState="Don't have an account?" />
        </div>
      </form>
    </AuthLayout>
  );
}

export default LoginForm;