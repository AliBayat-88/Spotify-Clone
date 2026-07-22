import React from 'react';

function ArtistHero({ artistName, artistBackImg, isVerified = true }) {
  return (
    <>
      <div className="relative sm:hidden rounded-lg min-h-[280px] w-full overflow-hidden">
        <img
          className="w-full h-full absolute inset-0 object-cover brightness-[0.75] saturate-110"
          src={artistBackImg}
          alt={artistName}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/20" />

        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start">
          {isVerified && (
            <div className="flex items-center gap-1 mb-1.5">
              <span className="bg-[#3d91f4] p-0.5 rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.498 4.49 4.49 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.307 4.491 4.491 0 0 1-1.307-3.497A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.498 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 0 0-1.06-1.06l-3.894 3.893-1.448-1.447a.75.75 0 1 0-1.06 1.06l1.978 1.978a.75.75 0 0 0 1.06 0l4.424-4.424Z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-white text-[10px] font-bold tracking-wider">Verified Artist</span>
            </div>
          )}
          <h1 className="text-4xl font-black text-white leading-none tracking-tight">
            {artistName}
          </h1>
        </div>
      </div>

      <div className="hidden sm:flex bg-gradient-to-b from-[#282828] to-[#121212] border-b border-white/5 rounded-lg gap-x-6 items-center font-semibold w-full p-6 lg:p-8">

          <img
            className="w-40 h-40 lg:w-48 lg:h-48 rounded-full object-cover"
            src={artistBackImg}
            alt={artistName}
          />

        <div className="flex flex-col gap-y-2 justify-center">
          {/* تیک تایید شده دسکتاپ */}
          {isVerified && (
            <div className="flex items-center gap-1.5 text-[#3d91f4]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.498 4.49 4.49 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.307 4.491 4.491 0 0 1-1.307-3.497A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.498 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 0 0-1.06-1.06l-3.894 3.893-1.448-1.447a.75.75 0 1 0-1.06 1.06l1.978 1.978a.75.75 0 0 0 1.06 0l4.424-4.424Z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-xs lg:text-sm font-bold tracking-wide">Verified Artist</span>
            </div>
          )}

          <h1 className="text-[48px] lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-tight select-text">
            {artistName}
          </h1>
        </div>
      </div>
    </>
  );
}

export default ArtistHero;