// components/ModalLayout.jsx
import { createPortal } from 'react-dom';

function ModalLayout({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) {
  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none animate-[fadeIn_.2s_ease-out]"
    >
      {/* بک‌دراپ تاریک */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-xs cursor-pointer"
      />

      {/* باکس اصلی مودال */}
      <div className={`relative w-full ${maxWidth} bg-[#181818] border border-[#282828] rounded-2xl p-6 sm:p-7 shadow-2xl overflow-hidden`}>
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#1ed760]/10 blur-[60px] rounded-full pointer-events-none" />

        {/* هدر مودال */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5 relative z-10">
          <h2 className="text-white text-xl font-black">{title}</h2>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 hover:text-white text-base cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        {/* محتوای متغیر هر فرم */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ModalLayout;