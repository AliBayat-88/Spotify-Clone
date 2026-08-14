import Header from './components/Header.jsx';
import BackBtn from './components/BackBtn.jsx';
import ActionBtn from './components/ActionBtn.jsx';
import TickIcon from './components/TickIcon.jsx';
import EmptyIcon from './components/EmptyIcon.jsx';
import { useForm } from 'react-hook-form';
import { hasMinLength, hasSpecialChar, hasUpperCase } from './utils/helpers.js';
import { useChangePassword } from './features/useChangePassword.js';

function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const { changePassword, isPending } = useChangePassword(() => {
    reset()
  });

  const newPassword = watch('newPassword', '');

  const isValidPassword =
    hasSpecialChar(newPassword) &&
    hasMinLength(newPassword) &&
    hasUpperCase(newPassword);

  // 🟢 ۲. ارسال داده‌ها به Mutation
  function onSubmit(data) {
    changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  }

  return (
    <div className="min-h-screen bg-black text-white pb-32 select-none font-sans">
      <Header />

      <div className="max-w-xl mx-auto px-4 mt-12 flex flex-col gap-y-6">
        <div className="flex items-center gap-x-3 relative">
          <BackBtn />
          <h1 className="text-2xl font-black text-white mt-5">Change Password</h1>
        </div>

        <div className="bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col gap-y-5 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#1ed760]/10 blur-[80px] rounded-full pointer-events-none" />

          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            To set a new password, please enter your current password first.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-y-4">

            {/* رمز عبور فعلی */}
            <div className="flex flex-col gap-y-2">
              <label htmlFor="currentPassword" className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                disabled={isPending}
                placeholder="Enter current password"
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                className="w-full bg-black text-white px-4 py-3.5 rounded-xl outline-none border border-[#262626] focus:border-white focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-600 text-sm font-medium disabled:opacity-50"
              />
              {errors.currentPassword && (
                <span className="text-xs text-red-400 font-semibold px-1">
                  {errors.currentPassword.message}
                </span>
              )}
            </div>

            {/* رمز عبور جدید */}
            <div className="flex flex-col gap-y-2">
              <label htmlFor="newPassword" className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                disabled={isPending}
                placeholder="Enter new password"
                {...register("newPassword", {
                  required: "New password is required",
                })}
                className="w-full bg-black text-white px-4 py-3.5 rounded-xl outline-none border border-[#262626] focus:border-white focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-600 text-sm font-medium disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-y-2.5 mb-6 px-1 text-sm">
              <div className="flex items-center gap-x-2 text-gray-400">
                {hasMinLength(newPassword) ? <TickIcon size="p-0.5" iconSize="w-3 h-3" /> : <EmptyIcon size="w-4 h-4" />}
                <span className="font-medium text-sm">At least 8 characters</span>
              </div>

              <div className="flex items-center gap-x-2 text-gray-400">
                {hasUpperCase(newPassword) ? <TickIcon size="p-0.5" iconSize="w-3 h-3" /> : <EmptyIcon size="w-4 h-4" />}
                <span className="font-medium text-sm">At least 1 uppercase letter</span>
              </div>

              {/* شرط ۳: حروف خاص مثل @ یا # */}
              <div className="flex items-center gap-x-2 text-gray-400">
                {hasSpecialChar(newPassword) ? <TickIcon size="p-0.5" iconSize="w-3 h-3" /> : <EmptyIcon size="w-4 h-4" />}
                <span className="font-medium text-sm">At least 1 special character (e.g., @, #, $)</span>
              </div>
            </div>

            {/* تکرار رمز عبور جدید */}
            <div className="flex flex-col gap-y-2">
              <label htmlFor="confirmPassword" className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                disabled={isPending}
                placeholder="Repeat new password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (val) => val === newPassword || "Passwords do not match",
                })}
                className="w-full bg-black text-white px-4 py-3.5 rounded-xl outline-none border border-[#262626] focus:border-white focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-600 text-sm font-medium disabled:opacity-50"
              />
              {errors.confirmPassword && (
                <span className="text-xs text-red-400 font-semibold px-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* دکمه ثبت با مدیریت استیت لودینگ */}
            <ActionBtn
              type="submit"
              disabled={!isValidPassword || isPending}
              title={isPending ? "Updating..." : "Update password"}
              className="w-full mt-4 bg-[#1ed760] text-black font-bold py-3.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;