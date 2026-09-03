import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

function AuthRequiredModal({ isOpen, onClose }) {

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-[fadeIn_.2s_ease-out]"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-sm bg-spotify-surface border border-[#282828] rounded-2xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden transform transition-all select-none ">
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-spotify-green/10 blur-[50px] rounded-full pointer-events-none" />

        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 active:scale-95 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          <div className="w-14 h-14 bg-spotify-green/10 border border-spotify-green/20 text-spotify-green rounded-full flex items-center justify-center mb-4 shadow-lg shadow-spotify-green/5">
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
            <Link
              to="/login"
              onClick={onClose}
              className="w-full bg-white text-black font-bold py-3 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all text-sm shadow-md text-center block"
            >
              Log in
            </Link>

            <Link
              to="/signUp"
              onClick={onClose}
              className="w-full bg-transparent text-gray-400 hover:text-white font-bold py-2 rounded-full hover:underline transition-all text-sm text-center block"
            >
              Don&#39;t have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default AuthRequiredModal;