import { useState } from 'react'

function AdminProfile() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">

      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="
          flex items-center gap-2
          p-1
          pr-2
          rounded-full
          hover:bg-white/[0.06]
          transition-all
        "
      >

        <img
          src="/profileImg.png"
          alt="Admin"
          className="w-9 h-9 rounded-full object-cover border border-white/10"
        />

        <div className="hidden lg:flex flex-col items-start leading-none">
          <span className="text-white text-xs font-bold">
            Ali Bayat
          </span>

          <span className="text-[10px] text-gray-500 mt-1">
            Administrator
          </span>
        </div>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`
            hidden sm:block
            w-4 h-4
            text-gray-500
            transition-transform
            ${isOpen ? 'rotate-180' : ''}
          `}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>

      </button>

      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-12
            w-48
            bg-[#181818]
            border border-white/[0.08]
            rounded-xl
            shadow-[0_20px_50px_rgba(0,0,0,0.5)]
            p-1.5
            overflow-hidden
          "
        >

          <button
            className="
              w-full
              text-left
              px-3 py-2.5
              rounded-lg
              text-sm
              text-gray-300
              hover:bg-white/[0.06]
              hover:text-white
              transition
            "
          >
            Account settings
          </button>

          <button
            className="
              w-full
              text-left
              px-3 py-2.5
              rounded-lg
              text-sm
              text-gray-300
              hover:bg-white/[0.06]
              hover:text-white
              transition
            "
          >
            View website
          </button>

          <div className="h-px bg-white/[0.06] my-1" />

          <button
            className="
              w-full
              text-left
              px-3 py-2.5
              rounded-lg
              text-sm
              text-red-400
              hover:bg-red-500/10
              transition
            "
          >
            Log out
          </button>

        </div>
      )}

    </div>
  )
}

export default AdminProfile