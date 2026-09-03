import React from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateTotalDuration } from '../utils/helpers.js'

function TrackHero({
  singer,
  songName,
  songs,
  type = 'Song',
  songPoster,
  artistId,
  artistImg,
}) {
  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-hidden select-none">
      <div
        className="absolute inset-0 bg-cover bg-center scale-125 blur-3xl opacity-35 pointer-events-none transform-gpu"
        style={{ backgroundImage: `url(${songPoster})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-spotify-base/60 to-spotify-base pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 p-6 sm:p-8 pt-8 sm:pt-12">
        <div className="relative shrink-0 group">
          <div
            className="absolute -inset-1 rounded-xl bg-cover bg-center blur-xl opacity-60 group-hover:opacity-80 transition duration-500"
            style={{ backgroundImage: `url(${songPoster})` }}
          />
          <img
            loading="lazy"
            className="relative w-44 sm:w-48 lg:w-56 aspect-square object-cover rounded-xl shadow-2xl shadow-black/80 border border-white/10"
            src={songPoster || '/default-cover.png'}
            alt={songName}
          />
        </div>

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-y-2.5 min-w-0 w-full">
          <span className="bg-white/10 backdrop-blur-md text-white/90 text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full border border-white/10 self-center sm:self-start">
            {type}
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white drop-shadow-lg leading-tight line-clamp-2">
            {songName}
          </h1>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs sm:text-sm text-spotify-subtext">
            <button
              type="button"
              onClick={() => artistId && navigate(`/artist/${artistId}`)}
              className="flex items-center gap-2 text-white font-bold hover:underline cursor-pointer group"
            >
              <img
                src={artistImg || '/profileImg.png'}
                alt={singer}
                className="w-6 h-6 rounded-full object-cover border border-white/20 group-hover:scale-105 transition"
              />
              <span>{singer}</span>
            </button>
            {type !== "Song" && <> <span>•</span>
              <span className="text-gray-300 font-medium">{calculateTotalDuration(songs)}</span></>
          }
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TrackHero);