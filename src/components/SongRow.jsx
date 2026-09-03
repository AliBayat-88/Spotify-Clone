import { formatDaysAgo, formatDuration } from '../utils/helpers.js'
import PlayBtn from './PlayBtn.jsx'
import AddLikedSongsBtn from './AddLikedSongsBtn.jsx'
import { useState, useRef } from 'react'
import Menu from './Menu.jsx'
import { useOutsideClick } from '../hooks/useOutsideClick.js'
import { usePlayer } from '../context/PlayerContext.jsx'
import Equalizer from './Equalizer.jsx'
import PauseBtn from './PauseBtn.jsx'
import { useLikedSongs } from '../features/useLikedSongs.js'
import { useToaster } from '../context/ToastContext.jsx'
import { useAddLikedSongs } from '../features/useAddLikedSongs.js'
import { useDeleteLikedSong } from '../features/useDeleteLikedSong.js'
import { useAuth } from '../context/Auth.jsx'
import { useSongDeleteFromPlaylist } from '../features/useSongDeleteFromPlaylist.js'
import AuthRequiredModal from './AuthRequiredModal.jsx'

function SongRow({
  index,
  type = "song",
  singer,
  song,
  onClick,
  playlistId,
  songsList,
}) {
  const [isOpen, setOpen] = useState(false);
  const [isSubOpen, setSubOpen] = useState(false);
  const menuRef = useRef(null);
  const { showToast } = useToaster()
  const { addLikedSongs } = useAddLikedSongs()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { deleteLikedSong } = useDeleteLikedSong()
  const { user } = useAuth()
  const { data: likedSongs = [] } = useLikedSongs()
  const { deleteSongFromPlaylist } = useSongDeleteFromPlaylist()

  console.log(song)

  function handleDeleteSongFromPlaylist() {
    deleteSongFromPlaylist({ playlistId: playlistId, songId: song?.id })
  }

  const isLiked = likedSongs.some((item) => {
    if (typeof item === 'number' || typeof item === 'string') {
      return Number(item) === Number(song?.id);
    }
    return Number(item?.id || item?.song_id) === Number(song?.id);
  });

  async function handleAddToLibrary() {
    if (!user) return showToast("You need to login first", "Please login to use this feature", "error", "link", "/login");

    if (isLiked) {
      deleteLikedSong({ userId: user.id, likedSongId: song.id });
    } else {
      addLikedSongs({ userId: user.id, likedSongId: song.id });
    }
  }

  const { playSong, isPlaying, currentSong } = usePlayer();
  const isCurrentSong = currentSong?.id === song?.id;

  function handlePlay() {
    if (!song) return;
    if(!user) {
      setIsAuthModalOpen(true);
    }else {
      playSong(song, songsList || [song]);
    }
  }

  useOutsideClick(menuRef, isOpen, () => setOpen(false))

  return (
    <div className="flex lg:grid lg:grid-cols-[5fr_3fr_2fr_120px] items-center justify-between p-2 sm:p-3 font-medium rounded-xl hover:bg-white/10 transition-all duration-200 group select-none">
      <div className="flex items-center gap-x-4 sm:gap-x-3.5 min-w-0" onClick={handlePlay}>

        <div className="hidden lg:block w-5 text-center shrink-0 cursor-pointer">
          {!isCurrentSong && (
            <>
              <span className="group-hover:hidden text-gray-400 text-sm font-semibold">{index}</span>
              <span className="hidden group-hover:flex justify-center">
                <PlayBtn color={"#ffffff"} />
              </span>
            </>
          )}

          {isCurrentSong && isPlaying && (
            <>
              <span className="group-hover:hidden flex justify-center">
                <Equalizer isPlaying={isPlaying} />
              </span>
              <span className="hidden group-hover:flex justify-center">
                <PauseBtn color={"#ffffff"} />
              </span>
            </>
          )}

          {isCurrentSong && !isPlaying && (
            <>
              <span className="group-hover:hidden font-semibold text-sm text-spotify-green">{index}</span>
              <span className="hidden group-hover:flex justify-center">
                <PlayBtn color={"#ffffff"} />
              </span>
            </>
          )}
        </div>

        <img loading="lazy" className="w-11 h-11 rounded-lg shrink-0 cursor-pointer object-cover shadow-sm border border-white/5" src={song?.cover_url} alt="" />

        <div className="flex flex-col min-w-0">
          <span
            onClick={(e) => {
              if (onClick) {
                e.stopPropagation();
                onClick();
              }
            }}
            className={`truncate cursor-pointer text-sm sm:text-base font-semibold ${
              isCurrentSong ? 'text-spotify-green' : 'text-white hover:underline'
            }`}
          >
            {song?.name}
          </span>
          <span className="text-xs text-gray-400 font-normal mt-0.5 truncate">{singer}</span>
        </div>
      </div>

      {type === "song" ? (
        <span className="hidden lg:block truncate text-gray-400 text-sm">{song?.play_count}</span>
      ) : (
        <span className="hidden lg:block truncate text-gray-400 text-sm">Single</span>
      )}

      {type === "playlist" || type === "liked" || type === "public" ? (
        <span className="text-gray-400 text-sm hidden lg:block truncate">
          {formatDaysAgo(song?.added_at || song?.created_at)}
        </span>
      ) : (
        <span className="hidden lg:block"></span>
      )}

      <div className="flex items-center justify-end gap-x-3.5 text-gray-400">
        <div className="invisible cursor-pointer sm:group-hover:visible shrink-0 transition-transform active:scale-90">
          <AddLikedSongsBtn
            isLiked={isLiked}
            onClick={handleAddToLibrary}
          />
        </div>

        <span className="sm:block hidden text-sm min-w-[35px] text-right shrink-0 font-medium">
          {formatDuration(song?.duration)}
        </span>

        <div
          ref={menuRef}
          className={`h-[30px] sm:h-10 flex items-center justify-center px-2 shrink-0 relative transition-all duration-150 ${
            isOpen ? 'opacity-100 z-50' : 'group-hover:opacity-100 sm:opacity-0'
          }`}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(!isOpen);
            }}
            className="font-bold sm:text-xl text-white/60 hover:text-white leading-none pb-2 whitespace-nowrap tracking-widest bg-transparent border-none outline-none cursor-pointer"
          >
            ...
          </button>

          {isOpen && (
            <Menu
              setOpen={setOpen}
              isSubLeft={true}
              position="right"
              isOpen={isOpen}
              song={song}
              type={type}
              isLiked={isLiked}
              onRemoveFromPlaylist={handleDeleteSongFromPlaylist}
              onToggleLike={handleAddToLibrary}
              isSubOpen={isSubOpen}
              setSubOpen={setSubOpen}
            />
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

export default SongRow;