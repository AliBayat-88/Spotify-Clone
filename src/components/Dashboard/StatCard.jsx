function StatCard({
  title,
  value,
  description,
  type,
}) {

  const icons = {

    users: (
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
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372
          9.337 9.337 0 0 0 4.125-.933
          3.375 3.375 0 0 0-5.953-1.388M15
          19.128v-.003c0-1.113-.285-2.16-.786-3.07
          M15 19.128v.003a9.357 9.357 0 0 1-3.75.75
          9.357 9.357 0 0 1-3.75-.75
          M12 15.75a3.375 3.375 0 1 0
          0-6.75 3.375 3.375 0 0 0 0 6.75Z"
        />
      </svg>
    ),

    artists: (
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
          d="M9 9.75a3 3 0 1 0
          6 0 3 3 0 0 0-6 0ZM4.5
          19.125a7.5 7.5 0 0 1 15 0"
        />
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
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
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