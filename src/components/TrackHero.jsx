function TrackHero({ singer, songName, type, songPoster, backColor }) {
  return (
    <>
      <div className={`relative sm:hidden rounded-lg ${backColor} overflow-hidden`}>
        <img
          className="w-full aspect-square object-cover brightness-[0.70] rounded-sm saturate-110"
          src={songPoster}
          alt={songName}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, var(--tw-back) 35%, color-mix(in srgb, var(--tw-back) 50%, transparent) 65%, transparent 100%)`,
          }}
        />
        <div className={`absolute inset-0 ${backColor} opacity-0`} />
        <div className="absolute bottom-0 left-0 right-0 p-7">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white/90 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2">
            {type}
          </span>
          <h1 className="text-[28px] font-black text-white leading-tight mb-1.5">
            {songName}
          </h1>
          <div className="flex items-center gap-2">
            <img
              src={songPoster}
              alt={singer}
              className="w-5 h-5 rounded-full object-cover border border-white/40"
            />
            <span className="text-white/80 text-xs font-medium">{singer}</span>
          </div>
        </div>
      </div>

      <div className={`hidden sm:flex ${backColor} rounded-lg gap-x-4 items-center font-semibold w-full p-4`}>
        <div>
          <img
            className="w-48 lg:w-60 h-52 lg:h-[248px] rounded-lg"
            src={songPoster}
            alt={singer}
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <span className="text-sm">{type}</span>
          <div className="flex flex-col gap-y-2">
            <h1 className="text-[44px] lg:text-6xl xl:text-8xl font-black pb-5">
              {songName}
            </h1>
            <span className="text-sm">{singer}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackHero;
