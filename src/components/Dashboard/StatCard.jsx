function StatCard({
  title,
  value,
  description,
  type,
}) {

  const icons = {

    users: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1ed760"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
           className="lucide lucide-users-round-icon lucide-users-round">
        <path d="M18 21a8 8 0 0 0-16 0"/>
        <circle cx="10" cy="8" r="5"/>
        <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/>
      </svg>
    ),

    artists: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1ed760"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
           className="lucide lucide-mic-vocal-icon lucide-mic-vocal">
        <path d="m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12"/>
        <path d="M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5"/>
        <circle cx="16" cy="7" r="5"/>
      </svg>
    ),

    songs: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.8"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 18V5l12-2v13"
        />
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
    ),

    playlists: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.8"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h10"
        />
      </svg>
    ),

  }

  return (
    <div
      className="
        bg-[#181818]
        border border-[#262626]
        rounded-2xl
        p-4 sm:p-5
        hover:border-[#353535]
        transition-colors
      "
    >

      <div className="flex items-start justify-between">

        <div>
          <p className="text-xs sm:text-sm text-gray-400 font-medium">
            {title}
          </p>

          <h2 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
            {value.toLocaleString()}
          </h2>
        </div>

        <div
          className="
            w-10 h-10
            rounded-xl
            bg-[#1ed760]/10
            text-[#1ed760]
            flex items-center justify-center
          "
        >
          {icons[type]}
        </div>

      </div>

      <p className="text-[11px] sm:text-xs text-gray-500 mt-3">
        {description}
      </p>

    </div>
  )
}

export default StatCard