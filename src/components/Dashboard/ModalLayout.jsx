import { createPortal } from 'react-dom';

function ModalLayout({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) {
  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 select-none animate-[fadeIn_.2s_ease-out]"
    >
      {/* بک‌دراپ تاریک */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-xs cursor-pointer"
      />

      {/* باکس اصلی مودال */}
      <div className={`relative w-full ${maxWidth} bg-spotify-surface border border-[#282828] rounded-2xl p-6 sm:p-7 shadow-2xl`}>
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-spotify-green/10 blur-[60px] rounded-full pointer-events-none" />

        {/* هدر مودال */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5 relative z-10">
          <h2 className="text-white text-xl font-black">{title}</h2>
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