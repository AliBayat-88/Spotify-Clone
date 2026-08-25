// src/components/ArtistHero.jsx
import React from 'react';

function ArtistHero({ artistName, artistBackImg, isVerified = true }) {
  const imgSrc = artistBackImg || '/profileImg.png';

  return (
    <div className="relative w-full overflow-hidden rounded-t-2xl p-6 sm:p-8 lg:p-10 select-none">
      {/* 🟢 ۱. بک‌گراند نوری داینامیک با بلور سنگین (پنهان‌کننده هرگونه افت کیفیت) */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-150 blur-3xl opacity-35 pointer-events-none transform-gpu"
        style={{ backgroundImage: `url(${imgSrc})` }}
      />

      {/* ۲. لایه تاریک‌کننده و تلفیق با تم دارک سایت */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#121212]/85 to-[#121212] pointer-events-none" />

      {/* ۳. محتوای هیرو: آواتار دایره‌ای شارپ + متادیتا */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 pt-4 sm:pt-6">

        {/* تصویر پروفایل دایره‌ای شارپ با هاله نوری و سایه عمیق */}
        <div className="relative shrink-0 group">
          {/* هاله پشت آواتار */}
          <div
            className="absolute -inset-1.5 rounded-full bg-cover bg-center blur-md opacity-40 group-hover:opacity-70 transition duration-500"
            style={{ backgroundImage: `url(${imgSrc})` }}
          />

          <img
            loading="lazy"
            src={imgSrc}
            alt={artistName}
            className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full object-cover shadow-[0_20px_45px_rgba(0,0,0,0.85)] border-2 border-white/10"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/profileImg.png';
            }}
          />
        </div>

        {/* متون و نشان تایید */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-y-2.5 min-w-0">
          {isVerified && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-sm">
              <span className="text-[#3d91f4]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.498 4.49 4.49 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.307 4.491 4.491 0 0 1-1.307-3.497A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.498 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 0 0-1.06-1.06l-3.894 3.893-1.448-1.447a.75.75 0 1 0-1.06 1.06l1.978 1.978a.75.75 0 0 0 1.06 0l4.424-4.424Z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-white text-xs font-bold tracking-wide">
                Verified Artist
              </span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-tight drop-shadow-xl line-clamp-2">
            {artistName}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ArtistHero);