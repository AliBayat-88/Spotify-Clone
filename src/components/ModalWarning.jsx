import Button from './Button.jsx'
import { useEffect } from 'react'

function ModalWarning({ onClose , isOpen }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-spotify-base border border-white/10 overflow-hidden">

        <div className="p-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-red-500/15 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 fill-red-500"
              >
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-3">
            Login required
          </h2>

          <p className="text-gray-400">
            You need to login before creating a playlist.
          </p>
        </div>

        <div className="flex gap-2 p-5 bg-spotify-surface border-t border-white/5">
          <button
            onClick={onClose}
            className="flex-1 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white font-semibold"
          >
            Cancel
          </button>

          <Button wherePage="/login" color="bg-spotify-green-dark"
            className="flex-1 py-3 rounded-full transition text-black font-bold"
          >
            Login
          </Button>
        </div>

      </div>
    </div>
  );
}

export default ModalWarning;
