import { useParams } from 'react-router-dom';
import SongRow from './SongRow.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import EmptyPlaylist from './EmptyPlaylist.jsx';
import { usePublicPlaylistSongs } from '../features/usePublicPlaylistSongs.js';
import { calculateTotalDuration } from '../utils/helpers.js'
import PauseBtn from './PauseBtn.jsx'
import PlayButton from './PlayButton.jsx'
import { usePlayer } from '../context/PlayerContext.jsx'



function PublicPlaylistContainer() {
  const { id } = useParams();
  const { playSong, isPlaying, togglePlay, currentSong } = usePlayer()

  // 🟢 ۱. گرفتن دیتای واقعی و استیت لودینگ از هوک
  const { publicPlaylistSongs, isLoading } = usePublicPlaylistSongs(id);

  // 🟢 ۲. استخراج دقیق لیست آهنگ‌ها از رابطه section_items -> songs
  // (اگر توی هوک/API داده‌ها را مپ نکرده باشی، اینجا مپ می‌شود)
  const songs =
    publicPlaylistSongs?.section_items
      ?.map((item) => item.songs)
      .filter(Boolean) || publicPlaylistSongs?.songs || [];

  console.log(songs);

  const isCurrentPlaylistPlaying = songs.some(s => s.id === currentSong?.id);

  function handlePlay() {
    if (songs.length === 0) return;

    if (isCurrentPlaylistPlaying) {
      togglePlay();
    } else {
      playSong(songs[0] , songs);
    }
  }


  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="text-white w-full relative select-none">
      <div className="relative w-full h-[350px] sm:h-[320px] lg:h-[360px] overflow-hidden">
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
              <svg className="w-5 h-5 text-[#1ed760] fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1. 38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/>
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

      {/* 🟢 ۲. بخش لیست آهنگ‌ها */}
      <div className="bg-[#171717] min-h-[50vh] px-4 sm:px-8 pb-24 relative z-20">
        <div className="py-6">
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
        </div>

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

        <div className="flex lg:hidden items-center justify-between pb-2 border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-gray-400">
          <span>Title</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
        </div>

        <div className="mt-2">
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <SongRow
                key={song?.id || index}
                type="public"
                song={song}
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