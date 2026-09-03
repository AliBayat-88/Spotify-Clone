import { Link } from 'react-router-dom'

function Modal({ isOpen, onClose }) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70  transition-opacity"
      />

      <div className="relative w-[90%] max-w-md bg-spotify-surface rounded-xl p-6 shadow-2xl animate-[fadeIn_.2s_ease-out]">

        <h2 className="text-white text-lg font-black mb-6">
          You need to login first
        </h2>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-neutral-700 text-white
                       hover:bg-neutral-600
                       transition-all duration-200"
          >
            Cancel
          </button>

          <Link to="/login"
            className="px-6 py-2 rounded-full bg-white text-black font-semibold
                       hover:opacity-80
                       transition-all duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Modal;
