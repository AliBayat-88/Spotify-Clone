import React from 'react'

function BoxSong({song}) {
  return (
    <div className="p-3.5 rounded-lg cursor-pointer hover:bg-[#262626] transition bg-transparent group">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={song.img}
          alt={song.title}
          className="w-full aspect-square object-cover transform group-hover:scale-105 transition duration-300"
        />
      </div>
      <h5 className="text-white text-lg font-semibold pt-3 truncate">
        {song.title}
      </h5>
      <p className="text-gray-400 text-sm truncate">
        {song.artist}
      </p>
    </div>
  );
}

export default BoxSong;
