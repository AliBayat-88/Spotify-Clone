// src/components/BoxSong.jsx
import React from 'react';
import { usePlayer } from '../context/PlayerContext.jsx';
import PauseBtn from './PauseBtn.jsx';
import PlayButton from './PlayButton.jsx';

function BoxSong({ info, isArtist, onClick, isPlaylist }) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();

  const isCurrentTrack = currentSong?.id === info?.id;
  const isThisPlaying = isCurrentTrack && isPlaying;

  const displayName = info?.name || info?.title || '';
  const artistName = typeof info?.artist === 'string' ? info.artist : info?.artists?.name || '';
  const artistBio = info?.bio || info?.artists?.bio || info?.artist_bio || '';
  const coverImage = info?.cover_url || info?.img || info?.image_url;
  const audioSource = info?.audio_url || info?.song_url;

  function handlePlayClick(e) {
    e.stopPropagation();

    if (isCurrentTrack) {
      togglePlay();
    } else {
      if (!audioSource) {
        console.error('No audio source found for this track:', info);
        return;
      }

      const songToPlay = {
        id: info.id,
        name: displayName,
        title: displayName,
        audio_url: audioSource,
        song_url: audioSource,
        cover_url: coverImage,
        duration: info.duration || 0,
        bio: artistBio,
        artists: {
          id: info?.artists?.id || info?.artist_id,
          name: artistName,
          bio: artistBio,
          image_url: info?.artists?.image_url || coverImage,
        },
        artist: artistName,
      };

      playSong(songToPlay, [songToPlay]);
    }
  }

  return (
    <div
      onClick={onClick}
      className="group relative p-2 sm:p-3 rounded-xl sm:rounded-2xl cursor-pointer bg-[#141414] hover:bg-[#202020] border border-white/[0.04] hover:border-white/15 transition-all duration-300 ease-out w-full flex flex-col h-full shadow-md hover:shadow-2xl hover:-translate-y-1.5 transform-gpu will-change-transform select-none overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl sm:rounded-2xl" />

      <div
        className={`relative overflow-hidden w-full aspect-square shrink-0 bg-[#0d0d0d] shadow-sm sm:shadow-md shadow-black/60 ${
          isArtist ? 'rounded-full' : 'rounded-lg sm:rounded-xl'
        }`}
      >
        <img
          loading="lazy"
          src={coverImage || (isArtist ? '/profileImg.png' : '/default-cover.png')}
          alt={displayName}
          className="w-full h-full object-cover sm:group-hover:scale-105 transition-transform duration-500 ease-out transform-gpu"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = isArtist ? '/profileImg.png' : '/default-cover.png';
          }}
        />

        {!isArtist && !isPlaylist && (
          <button
            type="button"
            onClick={handlePlayClick}
            aria-label={isThisPlaying ? 'Pause' : 'Play'}
            className={`absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1ed760] text-black flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.6)] active:scale-95 sm:hover:scale-110 sm:hover:bg-[#1fdf64] transition-all duration-300 ease-out cursor-pointer z-10 ${
              isThisPlaying
                ? 'opacity-100 translate-y-0 shadow-[0_0_16px_rgba(30,215,96,0.5)]'
                : 'opacity-90 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0'
            }`}
          >
            {isThisPlaying ? (
              <PauseBtn className="w-5 h-5 text-black" />
            ) : (
              <PlayButton className="w-5 h-5 text-black translate-x-0.5" />
            )}
          </button>
        )}
      </div>

      {/* متادیتا */}
      <div className="relative flex flex-col flex-grow pt-2.5 sm:pt-3.5 min-w-0 z-10">
        <h5
          className={`text-xs sm:text-base font-bold truncate leading-snug transition-colors duration-200`}
        >
          {displayName}
        </h5>

        {isPlaylist ? (
          <p className="text-[#a7a7a7] text-[11px] sm:text-xs mt-0.5 sm:mt-1 line-clamp-2 leading-tight sm:leading-relaxed">
            {info.description || 'Public Playlist'}
          </p>
        ) : (
          <p className="text-[#a7a7a7] text-[11px] sm:text-sm truncate mt-0.5 sm:mt-1 font-medium">
            {artistName}
          </p>
        )}
      </div>
    </div>
  );
}

export default BoxSong;