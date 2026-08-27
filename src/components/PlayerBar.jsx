import React from 'react';
import BackWardBtn from './BackWardBtn.jsx';
import PauseBtn from './PauseBtn.jsx';
import ForwardBtn from './ForwardBtn.jsx';
import AudioPlay from './AudioPlay.jsx';
import RangeSlider from './RangeSlider.jsx';
import { usePlayer } from '../context/PlayerContext.jsx';
import PlayBtn from './PlayBtn.jsx';
import { useArtist } from '../features/useArtist.js';
import { useToggleLikeSong } from '../hooks/useToggleLikedSong.js';
import AnimatedCheckIcon from './icons/AnimatedCheckIcon.jsx';
import PlusIcon from './icons/PlusIcon.jsx';

function PlayerBar() {
  const { setIsExpanded, isPlaying, togglePlay, currentSong, playNext, playPrevious } = usePlayer();
  const { isLiked, toggleLike } = useToggleLikeSong(currentSong);

  const artistId = currentSong?.artist_id || currentSong?.artists?.id;
  const { artist } = useArtist(artistId);

  const artistName = artist?.name || currentSong?.artists?.name || 'Unknown Artist';

  if (!currentSong) return null;

  return (
    <div
      onClick={() => setIsExpanded(true)}
      className="fixed bottom-0 left-0 right-0 z-50 w-full h-20 sm:h-22 bg-[#121212]/95 backdrop-blur-2xl border-t border-white/10 px-4 sm:px-6 text-white flex items-center justify-between cursor-pointer md:cursor-default shadow-[0_-10px_30px_rgba(0,0,0,0.85)] pb-[env(safe-area-inset-bottom)]"
    >
      {isPlaying && (
        <>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1ed760]/40 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none z-10">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#1ed760] to-transparent animate-border-beam opacity-90" />
          </div>
        </>
      )}

      {/* بخش کاور و نام موزیک */}
      <div className="w-48 sm:w-60 flex items-center gap-x-3 min-w-0">
        <img
          loading="lazy"
          src={currentSong?.cover_url || '/default-cover.png'}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-md object-cover shrink-0 shadow-md"
          alt={currentSong?.name || 'Track cover'}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/default-cover.png';
          }}
        />
        <div className="flex flex-col gap-y-0.5 min-w-0 pr-1">
          <span className="font-bold text-xs sm:text-sm text-white truncate hover:underline">
            {currentSong?.name}
          </span>
          <span className="text-[#a7a7a7] text-[11px] sm:text-xs truncate">
            {artistName}
          </span>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
          className="hidden sm:block shrink-0 ml-1"
        >
          {isLiked ? (
            <AnimatedCheckIcon />
          ) : (
            <button
              type="button"
              className="hover:border-white border-white/40 border-[1.5px] inline-flex p-1 rounded-full bg-transparent text-gray-400 hover:text-white transition"
            >
              <PlusIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* کنترل‌های پلیر */}
      <div className="flex items-center flex-col justify-center">
        <div className="flex items-center gap-x-4 sm:gap-x-6">
          <BackWardBtn
            onClick={(e) => {
              e.stopPropagation();
              playPrevious();
            }}
            className="fill-[#999999] hover:fill-white transition-colors w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hidden sm:block"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="p-2 sm:p-2.5 rounded-full bg-white hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-lg text-black"
          >
            {isPlaying ? (
              <PauseBtn className="fill-black w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <PlayBtn className="fill-black w-5 h-5 sm:w-6 sm:h-6 translate-x-0.5" />
            )}
          </button>
          <ForwardBtn
            onClick={(e) => {
              e.stopPropagation();
              playNext();
            }}
            className="fill-[#999999] hover:fill-white transition-colors w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hidden sm:block"
          />
        </div>
        <div className="hidden md:block w-full">
          <AudioPlay />
        </div>
      </div>

      {/* بخش اسلایدر صدا */}
      <div className="hidden sm:flex items-center justify-end w-48 sm:w-60">
        <RangeSlider />
      </div>
    </div>
  );
}

export default PlayerBar;