function AdminLogo() {
  return (
    <div className="flex items-center gap-2.5 select-none">

      <div className="w-9 h-9 rounded-lg bg-spotify-green flex items-center justify-center shadow-[0_0_20px_rgba(30,215,96,0.12)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5 text-black"
        >
          <path
            d="M5 19V5h14v14H5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8 15V12M12 15V9M16 15V7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="hidden sm:flex flex-col leading-none">
        <span className="text-white font-black text-[15px] tracking-tight">
          Spotify
        </span>

        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.18em] mt-1">
          Admin
        </span>
      </div>

    </div>
  )
}

export default AdminLogo