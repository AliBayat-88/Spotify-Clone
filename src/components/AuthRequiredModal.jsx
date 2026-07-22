import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function AuthRequiredModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  // بستن مودال با زدن کلید Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-[fadeIn_.2s_ease-out]">

      {/* بک‌گراند تاریک و بلورین پشت مودال */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* باکس اصلی مودال با افکت‌های نوری تیره */}
      <div className="relative w-full max-w-sm bg-[#181818] border border-[#282828] rounded-2xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden transform transition-all select-none">

        {/* هاله نوری سبز مخو در گوشه مودال */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-[#1ed760]/10 blur-[50px] rounded-full pointer-events-none" />

        {/* دکمه بستن (ضربدر) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center mt-4">
          {/* آیکون دیسک/پلی‌لیست درخشان */}
          <div className="w-14 h-14 bg-[#1ed760]/10 border border-[#1ed760]/20 text-[#1ed760] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[#1ed760]/5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>

          <h3 className="text-white font-extrabold text-xl tracking-tight mb-2">Create a playlist</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Log in to create and share your own playlists, and enjoy personalized recommendations.
          </p>

          {/* دکمه‌های هدایت کاربر */}
          <div className="w-full flex flex-col gap-y-3">
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-white text-black font-bold py-3 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all text-sm shadow-md"
            >
              Log in
            </button>

            <button
              onClick={() => navigate('/signUp')}
              className="w-full bg-transparent text-gray-400 hover:text-white font-bold py-2.5 rounded-full hover:underline transition-all text-sm"
            >
              Don&#39;t have an account? Sign up
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AuthRequiredModal;