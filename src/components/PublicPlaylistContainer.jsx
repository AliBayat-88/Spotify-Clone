import { useParams } from 'react-router-dom';
import SongRow from './SongRow.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import EmptyPlaylist from './EmptyPlaylist.jsx';
import { usePublicPlaylistSongs } from '../features/usePublicPlaylistSongs.js';
import { calculateTotalDuration } from '../utils/helpers.js';
import PauseBtn from './PauseBtn.jsx';
import PlayButton from './PlayButton.jsx';
import { usePlayer } from '../context/PlayerContext.jsx';
import { useState, useRef } from 'react';
import Menu from './Menu.jsx';
import { useOutsideClick } from '../hooks/useOutsideClick.js';
import { useSavedPublicPlaylists } from '../features/useSavedPublicPlaylists.js';
import { useAuth } from '../context/Auth.jsx';
import { useToggleSavePublicPlaylist } from '../features/useToggleSavePublicPlaylist.js';
import AuthRequiredModal from './AuthRequiredModal.jsx';

function PublicPlaylistContainer() {
  const { id } = useParams();
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { playSong, isPlaying, togglePlay, currentSong } = usePlayer();
  const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false);
  const headerMenuRef = useRef(null);

  useOutsideClick(headerMenuRef, isHeaderMenuOpen, () => setHeaderMenuOpen(false));

  const { publicPlaylistSongs, isLoading } = usePublicPlaylistSongs(id);
  const { savedPublicPlaylists } = useSavedPublicPlaylists();
  const { savePublicPlaylist, unsavePublicPlaylist } = useToggleSavePublicPlaylist();

  const isSavedInLibrary = savedPublicPlaylists?.some(
    (item) => Number(item?.public_playlist_id) === Number(id)
  );

  const songs =
    publicPlaylistSongs?.section_items
      ?.map((item) => item.songs)
      .filter(Boolean) || publicPlaylistSongs?.songs || [];

  const isCurrentPlaylistPlaying = songs.some((s) => s.id === currentSong?.id);

  function handlePlay() {
    if (songs.length === 0 || !user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (isCurrentPlaylistPlaying) {
      togglePlay();
    } else {
      playSong(songs[0], songs);
    }
  }

  function handleToggleLibrary() {
    if (!user?.id || !id) return;

    if (isSavedInLibrary) {
      unsavePublicPlaylist({ user_id: user?.id, public_playlist_id: Number(id) });
    } else {
      savePublicPlaylist({ user_id: user?.id, public_playlist_id: Number(id) });
    }
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="text-white w-full relative select-none">

      {/* 🟢 ۱. هدر اصلی (Hero Section) */}
      <div className="relative w-full h-[320px] sm:h-[350px] lg:h-[400px] overflow-hidden">
        <img
          src={publicPlaylistSongs?.cover_url || "/playlistImg.webp"}
          alt={publicPlaylistSongs?.title}
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/60 to-black/30" />

        <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-end z-10 pb-12 sm:pb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-white/80 mb-1">
            Public Playlist
          </span>

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tight drop-shadow-md line-clamp-2">
            {publicPlaylistSongs?.title || "Playlist"}
          </h1>

          {publicPlaylistSongs?.description && (
            <p className="text-xs sm:text-sm text-gray-300 font-medium mt-3 max-w-2xl line-clamp-2 drop-shadow">
              {publicPlaylistSongs.description}
            </p>
          )}

          <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-semibold text-gray-200 mt-4">
            <div className="flex items-center gap-1.5">
              <svg width="24" height="24" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M480 256C480 379.712 379.712 480 256 480C132.288 480 32 379.712 32 256C32 132.288 132.288 32 256 32C379.712 32 480 132.288 480 256Z" fill="#1DB954"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M406.693 230.905C318.351 183.513 214.8 173.155 118.821 202.111C109.303 204.982 99.2604 199.595 96.3891 190.077C93.5178 180.56 98.9055 170.517 108.423 167.645C213.543 135.932 326.956 147.276 423.712 199.182C432.472 203.882 435.763 214.793 431.064 223.553C426.364 232.313 415.453 235.605 406.693 230.905Z" fill="white"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M343.466 358.527C281.545 324.722 208.731 316.9 141.043 336.782C133.624 338.961 125.844 334.713 123.665 327.295C121.486 319.876 125.733 312.096 133.152 309.917C207.965 287.943 288.444 296.588 356.883 333.951C363.669 337.656 366.167 346.161 362.462 352.947C358.757 359.734 350.252 362.232 343.466 358.527Z" fill="white"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M253.935 257.979C214.276 253.338 174.086 256.88 135.849 268.387C127.388 270.933 118.464 266.138 115.917 257.676C113.371 249.214 118.166 240.291 126.628 237.744C169.055 224.977 213.649 221.046 257.655 226.196C301.661 231.346 344.143 245.467 382.475 267.686C390.12 272.117 392.725 281.907 388.294 289.552C383.862 297.197 374.072 299.803 366.427 295.371C331.881 275.347 293.595 262.621 253.935 257.979Z" fill="white"></path>
              </svg>
              <span className="text-white font-bold">Spotify</span>
            </div>

            <span>•</span>
            <span>{songs?.length || 0} {songs?.length === 1 ? 'song' : 'songs'}</span>

            {songs?.length > 0 && (
              <>
                <span>•</span>
                <span className="text-gray-300/90">{calculateTotalDuration(songs)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 🟢 ۲. کانتینر اصلی لیست آهنگ‌ها با افکت Glassmorphism و گوشه‌های گرد */}
      <div className="bg-[#171717]/80 min-h-[50vh] backdrop-blur-xl border-t border-white/10 rounded-t-2xl -mt-6 sm:-mt-8 relative z-20 p-4 sm:p-6 pb-24">

        {/* اکشن‌بار (دکمه Play و منوی ۳ نقطه) */}
        <div className="flex items-center gap-x-4 mb-6">
          <button
            onClick={handlePlay}
            className="p-3 sm:p-3.5 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 active:scale-95 transition-all inline-flex justify-center items-center cursor-pointer shadow-lg"
          >
            {isCurrentPlaylistPlaying && isPlaying ? (
              <PauseBtn className="w-7 h-7 text-black" color="#000000" />
            ) : (
              <PlayButton className="w-7 h-7 text-black" color="#000000" />
            )}
          </button>

          <div ref={headerMenuRef} className="relative">
            <button
              onClick={() => setHeaderMenuOpen(!isHeaderMenuOpen)}
              className="text-gray-400 hover:text-white text-2xl font-bold tracking-widest bg-transparent border-none outline-none cursor-pointer p-2 transition-colors"
            >
              •••
            </button>

            {isHeaderMenuOpen && (
              <Menu
                type="public_playlist_page"
                position="left"
                isOpen={isHeaderMenuOpen}
                setOpen={setHeaderMenuOpen}
                isSavedInLibrary={isSavedInLibrary}
                onAddToLibrary={handleToggleLibrary}
                setIsAuthModalOpen={setIsAuthModalOpen}
              />
            )}
          </div>
        </div>

        {/* 🟢 ۳. هدر جدول نسخه دسکتاپ */}
        <div className="hidden lg:grid grid-cols-[40px_minmax(0,4fr)_2fr_2fr_120px] items-center gap-x-4 px-3 pb-2 mb-2 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400">
          <span className="text-center">#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <div className="flex justify-end">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </div>

        {/* 🟢 ۴. اضافه شدن هدر جدول نسخه موبایل (که قبلاً نداشت!) */}
        <div className="flex lg:hidden items-center justify-between px-3 pb-2 mb-2 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400">
          <span>Title</span>
          <div className="flex items-center gap-x-2 pr-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          </div>
        </div>

        {/* 🟢 ۵. لیست اصلی آهنگ‌ها */}
        <div className="flex flex-col gap-y-1">
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <SongRow
                key={song?.id || index}
                type="public"
                song={song}
                songsList={songs}
                songName={song?.name}
                songPoster={song?.cover_url}
                playlistId={id}
                singer={song?.artists?.name}
                duration={song?.duration}
                index={index + 1}
              />
            ))
          ) : (
            <EmptyPlaylist />
          )}
        </div>
      </div>

      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default PublicPlaylistContainer;