import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToaster } from '../context/ToastContext.jsx';
import {
  hasMinLength,
  hasUpperCase,
  hasSpecialChar
} from '../utils/helpers.js';
import { useUpdatePassword } from '../features/useUpdatePassword.js';
import ButtonLoader from './ButtonLoader.jsx'

function ResetPasswordForm() {
  const navigate = useNavigate();
  const { showToast } = useToaster();
  const { updatePassword, isPending } = useUpdatePassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const passwordValue = watch('password', '');

  const isMinLengthValid = hasMinLength(passwordValue);
  const isUpperCaseValid = hasUpperCase(passwordValue);
  const isSpecialCharValid = hasSpecialChar(passwordValue);

  function onSubmit(data) {
    updatePassword(
      { password: data.password },
      {
        onSuccess: () => {
          showToast('Success', 'Your password has been reset successfully!', 'success');
          navigate('/login');
        },
        onError: (err) => {
          showToast('Error', err.message || 'Failed to update password', 'error');
        },
      }
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-6 select-none font-sans">
      <div className="w-full max-w-lg bg-[#181818] border border-[#282828] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#1ed760]/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative pt-2">
          <h1 className="text-white text-2xl font-extrabold tracking-tight mb-2">
            Set new password
          </h1>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Your new password must meet the security requirements below.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="new-password" className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                disabled={isPending}
                placeholder="Enter new password"
                {...register('password', {
                  required: 'Password is required',
                  validate: {
                    minLength: (val) => hasMinLength(val) || 'Must be at least 8 characters',
                    upperCase: (val) => hasUpperCase(val) || 'Must contain an uppercase letter',
                    specialChar: (val) => hasSpecialChar(val) || 'Must contain a special character',
                  },
                })}
                className={`w-full bg-black text-white px-4 py-3.5 rounded-xl outline-none border transition-all duration-200 placeholder-gray-600 text-sm font-medium ${
                  errors.password ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#282828] focus:border-white focus:ring-1 focus:ring-white'
                }`}
              />
              {errors.password && (
                <span className="text-red-500 text-xs font-semibold px-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="confirm-password" className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                disabled={isPending}
                placeholder="Repeat new password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (val) => val === passwordValue || 'Passwords are not the same',
                })}
                className={`w-full bg-black text-white px-4 py-3.5 rounded-xl outline-none border transition-all duration-200 placeholder-gray-600 text-sm font-medium ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#282828] focus:border-white focus:ring-1 focus:ring-white'
                }`}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs font-semibold px-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending || !isMinLengthValid || !isUpperCaseValid || !isSpecialCharValid}
              className="w-full mt-3 bg-[#1ed760] text-black font-bold py-3.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPending ? (
                <ButtonLoader/>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;