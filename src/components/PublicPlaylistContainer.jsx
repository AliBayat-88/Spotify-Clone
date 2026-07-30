import { useParams } from 'react-router-dom';
import SongRow from './SongRow.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import EmptyPlaylist from './EmptyPlaylist.jsx';
import { usePublicPlaylistSongs } from '../features/usePublicPlaylistSongs.js';
import { calculateTotalDuration } from '../utils/helpers.js'
import PauseBtn from './PauseBtn.jsx'
import PlayButton from './PlayButton.jsx'
import { usePlayer } from '../context/PlayerContext.jsx'
import { useState, useRef } from 'react'
import Menu from './Menu.jsx'
import { useOutsideClick } from '../hooks/useOutsideClick.js'
import { useSavedPublicPlaylists } from '../features/useSavedPublicPlaylists.js'
import { useAuth } from '../context/Auth.jsx'
import { useToggleSavePublicPlaylist } from '../features/useToggleSavePublicPlaylist.js'

function PublicPlaylistContainer() {
  const { id } = useParams();
  const { user } = useAuth();
  const { playSong, isPlaying, togglePlay, currentSong } = usePlayer();
  const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false);
  const headerMenuRef = useRef(null);

  useOutsideClick(headerMenuRef, isHeaderMenuOpen, () => setHeaderMenuOpen(false));

  const { publicPlaylistSongs, isLoading } = usePublicPlaylistSongs(id);
  const { savedPublicPlaylists } = useSavedPublicPlaylists();
  const { savePublicPlaylist, unsavePublicPlaylist } = useToggleSavePublicPlaylist();

  // 🟢 بررسی ذخیره بودن این پلی‌لیست توسط کاربر
  const isSavedInLibrary = savedPublicPlaylists?.some(
    (item) => Number(item?.public_playlist_id) === Number(id)
  );

  const songs =
    publicPlaylistSongs?.section_items
      ?.map((item) => item.songs)
      .filter(Boolean) || publicPlaylistSongs?.songs || [];

  const isCurrentPlaylistPlaying = songs.some(s => s.id === currentSong?.id);

  function handlePlay() {
    if (songs.length === 0) return;

    if (isCurrentPlaylistPlaying) {
      togglePlay();
    } else {
      playSong(songs[0], songs);
    }
  }

  // 🟢 هندل کردن سوئیچ بین افزودن و حذف
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
      <div className="relative w-full h-[350px] sm:h-[320px] lg:h-[400px] overflow-hidden">
        <img
          src={publicPlaylistSongs?.cover_url || "/playlistImg.webp"}
          alt={publicPlaylistSongs?.title}
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/60 to-black/30" />

        <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-end z-10">
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

      <div className="bg-[#171717] min-h-[50vh] px-4 sm:px-8 pb-24 relative z-20">
        <div className="py-6 flex items-center gap-x-3 mb-auto">
          <button
            onClick={handlePlay}
            className="p-2.5 sm:p-3.5 rounded-full bg-green-500 hover:bg-green-600 hover:scale-105 active:scale-95 transition-all inline-flex justify-center items-center cursor-pointer shadow-lg"
          >
            {isCurrentPlaylistPlaying && isPlaying ? (
              <PauseBtn className="w-8 h-8 text-black" color="#000000" />
            ) : (
              <PlayButton className="w-8 h-8 text-black" color="#000000" />
            )}
          </button>

          <div ref={headerMenuRef} className="relative">
            <button
              onClick={() => setHeaderMenuOpen(!isHeaderMenuOpen)}
              className="text-gray-400 hover:text-white text-3xl font-bold tracking-widest bg-transparent border-none outline-none cursor-pointer p-2 transition-colors"
            >
              ...
            </button>

            {isHeaderMenuOpen && (
              <Menu
                type="public_playlist_page"
                position="left"
                isOpen={isHeaderMenuOpen}
                setOpen={setHeaderMenuOpen}
                isSavedInLibrary={isSavedInLibrary} // 🟢 پاس دادن وضعیت به منو
                onAddToLibrary={handleToggleLibrary}
              />
            )}
          </div>
        </div>

        {/* بخش لیست آهنگ‌ها */}
        <div className="hidden lg:grid grid-cols-[40px_minmax(0,4fr)_2fr_2fr_120px] items-center gap-x-4 px-3 pb-2 border-b border-white/10 text-sm text-gray-400 font-medium">
          <span className="text-center">#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <div className="flex justify-end">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </div>

        <div className="mt-2">
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
    </div>
  );
}

export default PublicPlaylistContainer;