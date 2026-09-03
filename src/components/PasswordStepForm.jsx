import LoginBtn from './LoginBtn.jsx'
import TitleLogin from './TitleLogin.jsx'
import AuthLayout from './AuthLayout.jsx'
import { hasMinLength, hasSpecialChar, hasUpperCase } from '../utils/helpers.js'
import TickIcon from './icons/TickIcon.jsx'
import EmptyIcon from './icons/EmptyIcon.jsx'
import BackBtn from './BackBtn.jsx'
import { useLocation } from 'react-router'
import { useSignUp } from '../features/useSignUp.js'
import { useForm } from 'react-hook-form'

function PasswordStepForm() {
  const {signUp , isPending} = useSignUp()
  const {register, handleSubmit , watch} = useForm()

  const { state } = useLocation()

  const email = state?.email

  function onSubmit(data) {
    signUp({email, password: data?.password})
  }

  const createPassword = watch('password', '')

  const isValidPassword =
    hasSpecialChar(createPassword) &&
    hasMinLength(createPassword) &&
    hasUpperCase(createPassword);


  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full relative">
        <div className="absolute -top-2 -left-2">
          <BackBtn />
        </div>

        <div className="flex flex-col justify-center items-center text-center mb-6 w-full">
          <TitleLogin>Create a password</TitleLogin>
        </div>

        <div className="mb-5">
          <label htmlFor="inputpass" className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5 block mb-2">
            Password
          </label>
          <input
            {...register("password", { required: true })}
            id="inputpass"
            type="password"
            autoComplete="new-password"
            className="w-full bg-black text-white px-4 py-3.5 rounded-xl outline-none border border-[#282828] focus:border-white focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-600 text-sm font-medium"
            placeholder="••••••••"
          />
        </div>

        <div className="flex flex-col gap-y-2.5 mb-6 px-1 text-sm">
          <div className="flex items-center gap-x-2 text-gray-400">
            {hasMinLength(createPassword) ? <TickIcon size="p-0.5" iconSize="w-3 h-3" /> : <EmptyIcon size="w-4 h-4" />}
            <span className="font-medium text-sm">At least 8 characters</span>
          </div>

          <div className="flex items-center gap-x-2 text-gray-400">
            {hasUpperCase(createPassword) ? <TickIcon size="p-0.5" iconSize="w-3 h-3" /> : <EmptyIcon size="w-4 h-4" />}
            <span className="font-medium text-sm">At least 1 uppercase letter</span>
          </div>

          <div className="flex items-center gap-x-2 text-gray-400">
            {hasSpecialChar(createPassword) ? <TickIcon size="p-0.5" iconSize="w-3 h-3" /> : <EmptyIcon size="w-4 h-4" />}
            <span className="font-medium text-sm">At least 1 special character (e.g., @, #, $)</span>
          </div>
        </div>

        <LoginBtn  disabled={!isValidPassword || isPending}>
          {isPending ? "Creating..." : "Create"}
        </LoginBtn>
      </form>
    </AuthLayout>
  );
}

export default PasswordStepForm;