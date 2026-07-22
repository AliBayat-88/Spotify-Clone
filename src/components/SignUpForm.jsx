import LoginBtn from './LoginBtn.jsx'
import GoogleLoginBtn from './GoogleLoginBtn.jsx'
import HaveAccount from './HaveAccount.jsx'
import TitleLogin from './TitleLogin.jsx'
import AuthLayout from './AuthLayout.jsx'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useSignUp } from '../features/useSignUp.js'
import { useLoginByGoogle } from '../features/useLoginByGoogle.js'

function SignUpForm() {
  const navigate = useNavigate()
  const {register, handleSubmit , formState: {errors}} = useForm()

  const {googleLogin} = useLoginByGoogle()

  function handleLogin() {
    googleLogin()
  }

  const {isPending} = useSignUp()

  function onSubmit(data) {
    navigate("/signup/password-step", {
      state: {
        email: data.email,
      },
    });
  }

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-center text-center mb-6 w-full">
        <TitleLogin>Sign up to start listening</TitleLogin>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-5">
          <label htmlFor="inputname" className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5 block mb-2">
            Email
          </label>
          <input {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email",
            },
          })}
            type="email"
            autoComplete="email"
            className="w-full bg-black text-white px-4 py-3.5 rounded-xl outline-none border border-[#282828] focus:border-white focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-600 text-sm font-medium"
            placeholder="example@gmail.com"
          />
        </div>

        {errors.email && (
          <p className="text-red-500 mt-2 text-sm">
            {errors.email.message}
          </p>
        )}

        <LoginBtn disabled={isPending}>
          {isPending ? "..." : "Next"}
        </LoginBtn>

        <div className="flex justify-center items-center my-5 font-bold text-xs uppercase tracking-widest text-gray-500 gap-3">
          <div className="h-px bg-[#282828] flex-1"></div>
          <span>or</span>
          <div className="h-px bg-[#282828] flex-1"></div>
        </div>

        <div className="flex flex-col gap-y-4 w-full">
          <GoogleLoginBtn onClick={handleLogin} />
          <HaveAccount to="/login" textState="Login" questionState="already have an account?" />
        </div>
      </form>
    </AuthLayout>
  );
}

export default SignUpForm;