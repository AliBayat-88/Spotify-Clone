import PlusIcon from './plusIcon.jsx'
import SubMenu from './SubMenu.jsx'
import { useNavigate, useOutletContext, useParams, useLocation } from 'react-router-dom'
import { useToaster } from '../context/ToastContext.jsx'
import { usePlaylists } from '../features/usePlaylists.js'
import { useAddSongToPlaylist } from '../features/useAddSongToPlaylist.js'

function Menu({
  setSubOpen,
  isSubOpen,
  position = "right",
  isSubLeft,
  type = "song",
  song,
  setOpen,
  isLiked = false,
  onToggleLike,
  onRemoveFromPlaylist,
  isArtistsFollowed,
  onFollowToggle,
  onEditPlaylist,
  onDeletePlaylist,
  onAddToLibrary,
  isSavedInLibrary = false, // 🟢 پروپ جدید
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const { id: routeId } = useParams()
  const { showToast } = useToaster()
  const { playlists } = usePlaylists()
  const { addSongToPlaylist } = useAddSongToPlaylist()
  const { onOpenCreatePlaylist } = useOutletContext() || {}

  async function handleShare() {
    await navigator.clipboard.writeText(window.location.href)
    showToast("link copied on clipboard", '', "success")
  }

  function handleAddSongToPlaylist(selectedPlaylistId) {
    if (!song?.id || !selectedPlaylistId) return;

    addSongToPlaylist({
      songId: song?.id,
      playlistId: selectedPlaylistId,
    });

    if (setSubOpen) setSubOpen(false);
    setOpen(false);
  }

  const positions = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2"
  }

  const btnClass = "group relative flex items-center gap-3 w-full bg-transparent border-none py-2.5 px-2.5 text-[#b3b3b3] hover:text-white text-sm font-semibold rounded-md cursor-pointer transition-all duration-250 focus:outline-none hover:bg-[#3e3e3e]/60 active:scale-[0.99]";

  const songArtistId = song?.artists?.id || song?.artist_id;
  const isCurrentlyOnArtistPage = location.pathname.includes('/artist/') && Number(routeId) === Number(songArtistId);

  return (
    <div
      className={`
        absolute top-9 mt-3
        ${positions[position]}
        flex flex-col w-[230px]
        bg-[#181818]
        p-1.5
        rounded-lg
        border border-[#282828]
        shadow-[0_16px_24px_rgba(0,0,0,0.7),0_6px_8px_rgba(0,0,0,0.4)]
        gap-0.5
        z-50
        animate-in fade-in zoom-in-95 duration-150 ease-out
        backdrop-blur-md bg-opacity-95
      `}
    >
      {/* 🟢 ۱. منوی هدر پلی‌لیست‌های پابلیک */}
      {type === "public_playlist_page" && (
        <>
          {onAddToLibrary && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onAddToLibrary();
              }}
              className={`${btnClass} ${isSavedInLibrary ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : ''}`}
            >
              {isSavedInLibrary ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Remove from Your Library
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-neutral-400 group-hover:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add to Your Library
                </>
              )}
            </button>
          )}
        </>
      )}

      {/* 🟢 ۲. منوی هدر پلی‌لیست‌های شخصی */}
      {type === "playlist_page" && (
        <>
          {onEditPlaylist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onEditPlaylist();
              }}
              className={btnClass}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-neutral-400 group-hover:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
              </svg>
              Edit details
            </button>
          )}

          {onDeletePlaylist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onDeletePlaylist();
              }}
              className={`${btnClass} text-red-400 hover:text-red-300 hover:bg-red-500/10`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Delete playlist
            </button>
          )}
        </>
      )}

      {/* 🟢 ۳. منوی عمومی آهنگ‌ها */}
      {type !== "artist" && type !== "playlist_page" && type !== "public_playlist_page" && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (setSubOpen) setSubOpen(!isSubOpen);
            }}
            className={`group relative flex items-center justify-between gap-3 w-full bg-transparent border-none py-2.5 px-3 text-[#b3b3b3] hover:text-white text-sm font-semibold rounded-md cursor-pointer transition-all duration-250 focus:outline-none ${isSubOpen ? 'bg-[#3e3e3e] text-white' : 'hover:bg-[#3e3e3e]/60'}`}
          >
            <div className="flex gap-x-3 items-center">
              <div className="border-neutral-500 group-hover:border-white transition-colors duration-250 border-[1.5px] inline-flex p-0.5 rounded-full">
                <PlusIcon className="w-3 h-3" />
              </div>
              Add to Playlist
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className={`size-3.5 text-neutral-400 group-hover:text-white transition-transform duration-200 ${isSubOpen ? 'rotate-90' : ''}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
            </svg>

            {isSubOpen && (
              <SubMenu
                onSelectPlaylist={handleAddSongToPlaylist}
                onOpenCreatePlaylist={onOpenCreatePlaylist}
                playlists={playlists}
                isSubLeft={isSubLeft}
                setSubOpen={setSubOpen}
              />
            )}
          </button>

          {songArtistId && !isCurrentlyOnArtistPage && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                navigate(`/artist/${songArtistId}`);
              }}
              className={btnClass}
            >
              <svg viewBox="0 0 32 32" width="20" height="20" className="text-neutral-400 group-hover:text-white transition-colors" stroke="currentColor" fill="currentColor">
                <path d="M16.7 8C16.3 8.8 16 9.7 16 10.7 16 13.6 18.4 16 21.3 16 22.3 16 23.3 15.7 24 15.3 22.4 14.5 20.8 13.3 19.7 12.3 18.7 11.2 17.5 9.6 16.7 8ZM18.8 6C19.2 7.2 20.6 9.4 21.6 10.4 22.6 11.4 24.7 12.8 26 13.2 26.4 12.4 26.7 11.6 26.7 10.7 26.7 7.7 24.3 5.3 21.3 5.3 20.4 5.3 19.5 5.6 18.8 6ZM18.5 18.1C16.4 17.3 14.7 15.6 13.9 13.5L5.7 25.2 6.8 26.3 18.5 18.1ZM22.6 18.6L6.5 29.7 2.3 25.5 13.4 9.4C14 5.6 17.3 2.7 21.3 2.7 25.8 2.7 29.3 6.2 29.3 10.7 29.3 14.7 26.4 18 22.6 18.6Z" fillRule="evenodd"/>
              </svg>
              Go to singer
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              if (onToggleLike) onToggleLike();
            }}
            className={btnClass}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isLiked ? "#1ed760" : "none"}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke={isLiked ? "#1ed760" : "currentColor"}
              className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span className={isLiked ? "text-[#1ed760]" : ""}>
              {isLiked ? "Remove from Liked songs" : "Add to Liked songs"}
            </span>
          </button>

          {type === "playlist" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                if (onRemoveFromPlaylist) onRemoveFromPlaylist();
              }}
              className={`${btnClass} text-red-400 hover:text-red-300 hover:bg-red-500/10`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Remove from playlist
            </button>
          )}
        </>
      )}

      {/* 🟢 ۴. منوی صفحه خواننده */}
      {type === "artist" && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onFollowToggle) onFollowToggle();
              setOpen(false);
            }}
            className={`${btnClass} ${isArtistsFollowed ? 'text-[#1ed760] hover:text-[#1fdf64]' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`w-5 h-5 ${isArtistsFollowed ? 'text-[#1ed760]' : 'text-neutral-400 group-hover:text-white'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0zM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
            {isArtistsFollowed ? "Following" : "Follow Artist"}
          </button>
        </>
      )}

      <div className="h-[1px] bg-[#282828] my-1 w-[92%] mx-auto" />

      {/* گزینه Share */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(false);
          handleShare();
        }}
        className={btnClass}
      >
        <svg viewBox="0 0 32 32" width="20" height="20" stroke="currentColor" fill="currentColor" className="text-neutral-400 group-hover:text-white transition-colors">
          <path d="M19.2 8.8a4 4 0 1 1 0.8 2.5L12.7 15a4 4 0 0 1 0 2l7.4 3.7a4 4 0 1 1-0.8 1.5l-7.4-3.7a4 4 0 1 1 0-5l7.4-3.7A4 4 0 0 1 19.2 8.8ZM23.2 6.4a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Zm0 14.4a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8ZM6.4 16a2.4 2.4 0 1 0 4.8 0 2.4 2.4 0 0 0-4.8 0Z"/>
        </svg>
        Share
      </button>
    </div>
  );
}

export default Menu;