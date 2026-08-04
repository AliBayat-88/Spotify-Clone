import { useEffect } from 'react';
import { createPortal } from 'react-dom'; // 👈 ۱. اضافه کردن createPortal
import { useNavigate } from 'react-router-dom';

function AuthRequiredModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // ۲. رندر کردن کانتنت داخل createPortal
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-[fadeIn_.2s_ease-out]"
      role="dialog"
      aria-modal="true"
    >
      {/* بک‌گراند تاریک */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* باکس اصلی مودال */}
      <div className="relative w-full max-w-sm bg-[#181818] border border-[#282828] rounded-2xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden transform transition-all select-none">

        {/* هاله نوری سبز */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-[#1ed760]/10 blur-[50px] rounded-full pointer-events-none" />

        {/* دکمه بستن */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          <div className="w-14 h-14 bg-[#1ed760]/10 border border-[#1ed760]/20 text-[#1ed760] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[#1ed760]/5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 0v12m0-12A10.5 10.5 0 0 1 9 15m0 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>

          <h3 className="text-white font-extrabold text-xl tracking-tight mb-2">
            Enjoy your music
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Log in to play tracks, create playlists, and explore personalized recommendations.
          </p>

          <div className="w-full flex flex-col gap-y-2.5">
            <button
              onClick={() => {
                onClose();
                navigate('/login');
              }}
              type="button"
              className="w-full bg-white text-black font-bold py-3 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all text-sm shadow-md"
            >
              Log in
            </button>

            <button
              onClick={() => {
                onClose();
                navigate('/signUp');
              }}
              type="button"
              className="w-full bg-transparent text-gray-400 hover:text-white font-bold py-2 rounded-full hover:underline transition-all text-sm"
            >
              Don&#39;t have an account? Sign up
            </button>
          </div>
        </div>

      </div>
    </div>,
    document.body // 👈 ۳. به انتهای body متصل می‌شود
  );
}

export default AuthRequiredModal;