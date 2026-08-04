import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// ۱. جداسازی آیكون‌ها برای تمیزی و Reusability
const ALERT_ICONS = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48" className="w-5 h-5">
      <path d="M 24 3 C 12.413858 3 3 12.413866 3 24 C 3 35.586134 12.413858 45 24 45 C 35.586142 45 45 35.586134 45 24 C 45 12.413866 35.586142 3 24 3 z M 24 5 C 34.505263 5 43 13.494744 43 24 C 43 34.505256 34.505263 43 24 43 C 13.494737 43 5 34.505256 5 24 C 5 13.494744 13.494737 5 24 5 z M 24 12.185547 C 23.159 12.185547 22.474609 12.863313 22.474609 13.695312 C 22.474609 14.535312 23.159 15.220703 24 15.220703 C 24.85 15.220703 25.541016 14.535312 25.541016 13.695312 C 25.541016 12.863312 24.85 12.185547 24 12.185547 z M 24 17.935547 C 23.305 17.935547 22.818359 18.454312 22.818359 19.195312 L 22.818359 33.757812 C 22.818359 34.498812 23.304 35.017578 24 35.017578 C 24.696 35.017578 25.181641 34.498813 25.181641 33.757812 L 25.181641 19.193359 C 25.181641 18.452359 24.695 17.935547 24 17.935547 z"></path>
    </svg>
  ),
  error: <img className="w-5 h-5 object-contain" src="/cross.png" alt="cross" />
};

// استایل‌های پویا بر اساس نوع آیکون
const ICON_STYLES = {
  success: "text-emerald-400 bg-emerald-950/40 border-emerald-500/20",
  info: "text-sky-400 bg-sky-950/40 border-sky-500/20",
  error: "text-rose-400 bg-rose-950/40 border-rose-500/20"
};

function SuccessAlert({
  message,
  description,
  icon = "success",
  isAlertOpen,
  onClose,
  type,
  address = "#"
}) {
  useEffect(() => {
    if (isAlertOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isAlertOpen, onClose]);

  // ۲. مدیریت دسترسی‌پذیری برای بسته بودن کامپوننت
  const isVisible = isAlertOpen;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`
        fixed top-6 left-1/2 z-[100] -translate-x-1/2
        w-[calc(100%-2rem)] max-w-md sm:max-w-lg
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isVisible
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 -translate-y-8 pointer-events-none"
      }
      `}
    >
      <div className="flex items-start justify-between gap-3 p-4 rounded-2xl bg-[#1c1c1c]/95 backdrop-blur-md border border-[#333333] shadow-2xl">
        {/* بخش سمت چپ: آیکون + متن‌ها */}
        <div className="flex gap-3 items-start min-w-0 flex-1">
          {/* آیکون با استایل داینامیک */}
          <div className={`p-2 rounded-xl border shrink-0 ${ICON_STYLES[icon] || ICON_STYLES.success}`}>
            {ALERT_ICONS[icon] || ALERT_ICONS.error}
          </div>

          {/* متن‌ها */}
          <div className="flex flex-col min-w-0 flex-1 pt-0.5">
            {message && (
              <h4 className="text-white font-semibold text-sm sm:text-base leading-snug break-words">
                {message}
              </h4>
            )}
            {description && (
              <p className="text-zinc-400 text-xs sm:text-sm mt-1 leading-relaxed break-words">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* بخش سمت راست: اکشن‌ها (دکمه بستن و لینک) */}
        <div className="flex items-center gap-1.5 shrink-0 self-start -mr-1">
          {type === "link" && address && (
            <Link
              to={address}
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center"
              title="مشاهده جزئیات"
            >
              <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current">
                <path d="M18 6l-1.4 1.4L24.1 15H4v2h20.1l-7.5 7.6L18 26l10-10L18 6z"/>
              </svg>
            </Link>
          )}

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center"
            aria-label="بستن"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessAlert;