import PlusIcon from "./icons/PlusIcon.jsx";

function MobileActions({
  isOpen,
  setIsOpen,
  onCreatePlaylist,
}) {
  return (
    <div className="fixed right-9 bottom-16 z-40 md:hidden flex flex-col items-end gap-4 select-none pointer-events-none isolate">
      <div
        className={`
          flex flex-col gap-1.5 items-end
          transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
          ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-5 scale-95 pointer-events-none"
        }
        `}
      >
        <button
          type="button"
          onClick={onCreatePlaylist}
          className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform bg-transparent border-none outline-none"
        >
          <span className="bg-[#262626] text-white font-bold px-3 py-2 rounded-md shadow-md border border-[#3e3e3e]">
            Create Playlist
          </span>

          <div className="w-12 h-12 bg-[#262626] border border-[#3e3e3e] group-hover:border-[#535353] rounded-full flex items-center justify-center shadow-lg text-white transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </button>
      </div>

      {/* دکمه اصلی شناور با بردر سبز ۴ پیکسلی و بک‌گراند مشکی */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          pointer-events-auto
          w-14 h-14 bg-black flex items-center justify-center rounded-full cursor-pointer
          shadow-[0_8px_24px_rgba(0,0,0,0.5)]
          transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
          hover:scale-105 active:scale-95
          [backface-visibility:hidden] [transform:translateZ(0)]
          ${
          isOpen
            ? "bg-[#262626] text-white border border-[#3e3e3e] rotate-90"
            : "border-4 border-green-600 text-black"
        }
        `}
      >
        {isOpen ? (
          <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current">
            <path d="M6.7 17.3V14.7H25.3V17.3H6.7Z" />
          </svg>
        ) : (
          <PlusIcon className="w-7 h-7" />
        )}
      </button>
    </div>
  );
}

export default MobileActions;