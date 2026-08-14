import { useForm } from 'react-hook-form';
import { useForgotPassword } from '../features/useForgotPassword';
import BackBtn from './BackBtn';
import ButtonLoader from './ButtonLoader.jsx'

function ForgotPasswordForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { forgotPassword, isPending } = useForgotPassword();

  function onSubmit(data) {
    console.log(data);
    forgotPassword({ email: data.email });
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-6 select-none font-sans">
      <div className="w-full max-w-lg bg-[#181818] border border-[#282828] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <BackBtn />

        <h1 className="text-white text-2xl font-extrabold tracking-tight mb-2">
          Forgot your password?
        </h1>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Enter the email address associated with your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              disabled={isPending}
              placeholder="example@gmail.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please enter a valid email address',
                },
              })}
              className="w-full bg-black text-white px-4 py-3.5 rounded-xl outline-none border border-[#282828] focus:border-white focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-600 text-sm font-medium"
            />
            {errors?.email && (
              <span className="text-red-500 text-xs px-1 font-semibold">
                {errors.email.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 bg-[#1ed760] text-black font-bold py-3.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isPending ? (
              <ButtonLoader/>
            ) : (
              'Send reset link'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;