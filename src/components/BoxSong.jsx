import React from 'react';

function BoxSong({ info, isArtist, onClick, isPlaylist }) {
  console.log(info?.id)

  return (
    <div
      onClick={onClick}
      className="p-3 rounded-xl cursor-pointer hover:bg-[#181818] bg-[#121212]/40 transition duration-300 group w-full flex flex-col h-full"
    >
      <div
        className={`relative overflow-hidden w-full aspect-square shrink-0 ${
          isArtist
            ? "rounded-full"
            : isPlaylist
              ? "rounded-md"
              : "rounded-lg shadow-md shadow-black/30"
        }`}
      >
        <img
          src={info.img}
          alt={info.title || info.name}
          className="w-full h-full object-cover transform group-hover:scale-[1.04] transition duration-300"
        />
      </div>

      <div className="flex flex-col flex-grow pt-3 min-w-0">
        <h5 className="text-white text-sm sm:text-base font-bold truncate leading-snug">
          {info.title || info.name}
        </h5>

        {isPlaylist ? (
          <p className="text-[#a7a7a7] text-xs mt-1 line-clamp-2 leading-5">
            {info.description}
          </p>
        ) : (
          <p className="text-[#a7a7a7] text-xs sm:text-sm truncate mt-1 font-medium">
            {info.artist || "Artist"}
          </p>
        )}
      </div>
    </div>
  );
}

export default BoxSong;