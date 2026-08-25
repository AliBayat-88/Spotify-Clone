// src/components/BrowseAlbum.jsx
import React, { useState } from 'react';

const COLOR_PALETTES = [
  { bg: 'from-purple-600 to-purple-950', shadow: 'hover:shadow-purple-900/30' },
  { bg: 'from-rose-600 to-pink-950', shadow: 'hover:shadow-pink-900/30' },
  { bg: 'from-amber-500 to-orange-950', shadow: 'hover:shadow-orange-900/30' },
  { bg: 'from-emerald-500 to-teal-950', shadow: 'hover:shadow-emerald-900/30' },
  { bg: 'from-blue-600 to-indigo-950', shadow: 'hover:shadow-indigo-900/30' },
  { bg: 'from-fuchsia-600 to-violet-950', shadow: 'hover:shadow-fuchsia-900/30' },
  { bg: 'from-cyan-500 to-blue-950', shadow: 'hover:shadow-cyan-900/30' },
  { bg: 'from-red-600 to-rose-950', shadow: 'hover:shadow-red-900/30' },
];

function BrowseAlbum({ colorIndex = 0, img, name, onClick }) {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const palette = COLOR_PALETTES[colorIndex % COLOR_PALETTES.length];

  return (
    <div
      onClick={onClick}
      className={`group relative aspect-video w-full p-3.5 sm:p-5 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${palette.bg} ${palette.shadow} border border-white/10 transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl active:scale-95 select-none`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

      <h3 className="relative font-extrabold text-lg sm:text-2xl text-white tracking-tight leading-snug drop-shadow-md z-10 line-clamp-2 max-w-[70%]">
        {name}
      </h3>

      <div className="absolute -right-3 -bottom-3 sm:-right-4 sm:-bottom-4 rotate-[25deg] transition-transform duration-500 ease-out group-hover:rotate-[32deg] group-hover:scale-110">

        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-black/20 shadow-[-4px_4px_25px_rgba(0,0,0,0.6)] overflow-hidden">
          <img
            loading="lazy"
            src={img}
            alt={name}
            onLoad={() => setIsImgLoaded(true)}
            className={`w-full h-full object-cover rounded-xl transition-all duration-500 ease-out ${
              isImgLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-90 blur-sm'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default BrowseAlbum;