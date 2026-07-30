import Button from './Button.jsx'

function EmptyPlaylist() {

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center select-none animate-in fade-in duration-300">
      {/* آیکون بزرگ با استایل اسپاتیفای */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#282828]/60 border border-[#3e3e3e]/40 rounded-full flex items-center justify-center mb-6 text-gray-400 shadow-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-10 h-10 sm:w-12 sm:h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 9l10.5-3m0 0L21 18m-1.5-12v12.75A2.25 2.25 0 0117.25 21a2.25 2.25 0 01-2.25-2.25V12m-6 3V3.75A2.25 2.25 0 006.75 1.5 2.25 2.25 0 004.5 3.75v12.75a2.25 2.25 0 002.25 2.25A2.25 2.25 0 009 16.5zm12-9a2.25 2.25 0 00-2.25-2.25 2.25 2.25 0 00-2.25 2.25"
          />
        </svg>
      </div>

      {/* متن‌ها */}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
        It&#39;s feeling a little empty here
      </h3>
      <p className="text-gray-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
        Let&#39;s find some songs, artists, or podcasts for this playlist to get you started.
      </p>

      <Button wherePage="/search">Lets find</Button>
    </div>
  );
}

export default EmptyPlaylist;