import React from 'react';

function BoxSongSkeleton({ isArtist }) {
  return (
    <div className="p-3 rounded-xl bg-spotify-surface/40 w-full flex flex-col h-full animate-pulse">

      <div className={`w-full aspect-square bg-[#282828] shrink-0 ${isArtist ? "rounded-full" : "rounded-lg"}`} />

      <div className="flex flex-col flex-grow pt-3 gap-y-2">
        <div className="h-4 bg-[#282828] rounded w-3/4" />
        <div className="h-3 bg-[#282828] rounded w-1/2" />
      </div>

    </div>
  );
}

export default BoxSongSkeleton;