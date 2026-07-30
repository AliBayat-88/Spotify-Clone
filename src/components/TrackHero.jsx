import React from 'react';

function TrackHero({ singer, songName, type, songPoster, ambientColor = "from-purple-900/80" }) {
  return (
    <>
      {/* 📱 نسخه موبایل */}
      <div className="relative sm:hidden rounded-t-2xl overflow-hidden bg-[#181818]">
        <div className="relative w-full aspect-square">
          <img
            className="w-full h-full object-cover brightness-[0.85] saturate-110"
            src={songPoster}
            alt={songName}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/30 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col gap-2">
          <span className="self-start bg-white/10 backdrop-blur-md text-white/90 text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full">
            {type}
          </span>
          <h1 className="text-3xl font-black text-white leading-tight drop-shadow-md line-clamp-2">
            {songName}
          </h1>
          <span className="text-gray-300 text-xs font-semibold drop-shadow">
            {singer}
          </span>
        </div>
      </div>

      {/* 💻 نسخه دسکتاپ: چسبیده به بدنه با گرادیان اسپاتیفایی */}
      <div className={`hidden sm:flex relative overflow-hidden bg-gradient-to-b ${ambientColor} via-[#171717]/90 to-[#171717] p-8 gap-x-8 items-end w-full shadow-2xl rounded-t-2xl`}>

        {/* کاور اصلی با سایه عمیق */}
        <div className="shrink-0 relative group">
          <img
            className="w-48 lg:w-56 xl:w-60 aspect-square object-cover rounded-md shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]"
            src={songPoster}
            alt={songName}
          />
        </div>

        {/* متون دسکتاپ */}
        <div className="flex flex-col gap-y-3 z-10 min-w-0">
          <span className="text-xs font-black uppercase tracking-widest text-white/90">
            {type}
          </span>

          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white drop-shadow-xl line-clamp-2 leading-none py-1">
            {songName}
          </h1>

          <div className="flex items-center gap-x-2 text-xs sm:text-sm font-semibold text-gray-200 mt-2">
            <span className="text-white font-bold">{singer}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(TrackHero);