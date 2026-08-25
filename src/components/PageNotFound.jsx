import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center notfound-matrix-bg p-4 select-none overflow-hidden">

      {/* ۱. لایه تاریک‌کننده Vignette برای ایجاد عمق و حفظ خوانایی مرکز صفحه */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.92)_80%)] pointer-events-none z-10" />

      <div className="relative z-20 w-full max-w-lg bg-[#141414]/85 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col items-center text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)] animate-[fadeIn_.3s_ease-out]">

        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-36 h-36 bg-[#1ed760]/20 blur-[60px] rounded-full pointer-events-none" />

        <div className="w-48 sm:w-64 max-h-48 flex items-center justify-center mb-6 relative">
          <img
            loading="lazy"
            src="/404.svg"
            alt="404 Not Found"
            className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] animate-pulse"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* بج خطا */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1ed760]/10 border border-[#1ed760]/25 text-[#1ed760] text-[11px] font-black uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1ed760] animate-ping" />
          Lost in Track
        </span>

        {/* عنوان */}
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Page Not Found
        </h1>

        {/* متن توضیحات */}
        <p className="text-gray-400 text-xs sm:text-sm mt-2 max-w-sm leading-relaxed">
          The music stopped here. The playlist, song, or page you were looking for doesn’t exist or has been moved.
        </p>

        {/* دکمه اکشن بازگشت به خانه */}
        <Link
          to="/"
          className="mt-8 px-8 py-3.5 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] text-black font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-[0_0_25px_rgba(30,215,96,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
          <span>Back to Home</span>
        </Link>
      </div>

    </div>
  );
}

export default PageNotFound;