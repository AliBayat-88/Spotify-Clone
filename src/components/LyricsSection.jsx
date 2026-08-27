// src/components/LyricsSection.jsx
import React, { useState } from 'react';

function LyricsSection({ lyrics }) {
  const [expand, setExpand] = useState(false);

  if (!lyrics) return null;

  const isTooLong = lyrics.length > 220;

  return (
    <div className="my-14 px-2 sm:px-0 select-text ">
      <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-6">
        Lyrics
      </h4 >

      <div className="relative group transition-all duration-300">
        <p
          className={`text-[#a7a7a7] text-base font-bold whitespace-pre-line leading-relaxed transition-all duration-500 ease-out 
          ${!expand && isTooLong ? 'line-clamp-6' : 'line-clamp-none'}`}
        >
          {lyrics}
        </p>

        {!expand && isTooLong && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#121212] via-[#121212]/90 to-transparent pointer-events-none" />
        )}
      </div>

      {isTooLong && (
        <button
          type="button"
          onClick={() => setExpand((prev) => !prev)}
          className="text-white hover:scale-105 active:scale-95 font-black text-xs sm:text-sm mt-3 px-6 py-2 rounded-full border border-white/20 bg-white/5 transition duration-200 hover:bg-white/10 hover:border-white/30"
        >
          {expand ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

export default React.memo(LyricsSection);