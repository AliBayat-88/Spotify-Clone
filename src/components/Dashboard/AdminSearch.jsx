import { useState } from 'react'

function AdminSearch() {
  const [search, setSearch] = useState('')

  return (
    <div className="relative w-full max-w-[520px]">

      <div className="relative flex items-center">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="absolute left-3.5 w-5 h-5 text-gray-500 pointer-events-none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search songs, artists or playlists..."
          className="
            w-full
            h-10
            bg-spotify-surface
            border border-white/[0.07]
            rounded-full
            pl-11 pr-4
            text-sm text-white
            placeholder:text-gray-600
            outline-none
            transition-all
            duration-200
            hover:bg-[#1c1c1c]
            hover:border-white/[0.12]
            focus:bg-[#1c1c1c]
            focus:border-white/[0.18]
          "
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="
              absolute right-3
              w-6 h-6
              flex items-center justify-center
              rounded-full
              text-gray-500
              hover:text-white
              hover:bg-white/10
              transition
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        )}

      </div>

    </div>
  )
}

export default AdminSearch