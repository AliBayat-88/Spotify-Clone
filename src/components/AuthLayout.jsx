import Logo from './Logo.jsx'

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-6 select-none text-white">
      <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
        <Logo size="24" />
      </div>

      {/* کارت مرکزی با افکت‌های نوری و سایه فرم ForgotPassword */}
      {/* pt-10 اضافه شد تا BackBtn با position: absolute روی موبایل بیرون کارت یا رو محتوا نیفته */}
      <div className="w-full max-w-md bg-[#181818] border border-[#282828] rounded-2xl p-8 pt-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden animate-[fadeIn_.3s_ease-out]">

        {/* افکت هاله نوری سبز محو در پس‌زمینه کارت */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#1ed760]/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;