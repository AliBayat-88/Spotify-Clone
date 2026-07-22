import PlusIcon from './plusIcon.jsx'
import SubMenu from './SubMenu.jsx'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useToaster } from '../context/ToastContext.jsx'
import { usePlaylists } from '../features/usePlaylists.js'

function Menu({
  setSubOpen,
  isSubOpen,
  position,
  isSubLeft,
  type = "track",
  song,
  setOpen,
  isOpen,
  isArtistsFollowed,
  onFollowToggle
}) {
  const navigate = useNavigate()
  const { showToast } = useToaster()
  const { playlists } = usePlaylists()
  const { onOpenCreatePlaylist } = useOutletContext()

  async function handleShare() {
    await navigator.clipboard.writeText(window.location.href)
    showToast("link copied on clipboard", '', "success")
  }

  const positions = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2"
  }

  const btnClass = "group relative flex items-center gap-3 w-full bg-transparent border-none py-2.5 px-3 text-[#b3b3b3] hover:text-white text-sm font-semibold rounded-md cursor-pointer transition-all duration-250 focus:outline-none hover:bg-[#3e3e3e]/60 active:scale-[0.99]";

  return (
    <div
      className={`
      z-10
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
      {type === "track" && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSubOpen(!isSubOpen);
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
              <SubMenu onOpenCreatePlaylist={onOpenCreatePlaylist} playlists={playlists} isSubLeft={isSubLeft} setSubOpen={setSubOpen} />
            )}
          </button>

          <button onClick={() => navigate(`/artist/${song?.artists?.id}`)} className={btnClass}>
            <svg viewBox="0 0 32 32" width="20" height="20" className="text-neutral-400 group-hover:text-white transition-colors" stroke="currentColor" fill="currentColor">
              <path d="M16.7 8C16.3 8.8 16 9.7 16 10.7 16 13.6 18.4 16 21.3 16 22.3 16 23.3 15.7 24 15.3 22.4 14.5 20.8 13.3 19.7 12.3 18.7 11.2 17.5 9.6 16.7 8ZM18.8 6C19.2 7.2 20.6 9.4 21.6 10.4 22.6 11.4 24.7 12.8 26 13.2 26.4 12.4 26.7 11.6 26.7 10.7 26.7 7.7 24.3 5.3 21.3 5.3 20.4 5.3 19.5 5.6 18.8 6ZM18.5 18.1C16.4 17.3 14.7 15.6 13.9 13.5L5.7 25.2 6.8 26.3 18.5 18.1ZM22.6 18.6L6.5 29.7 2.3 25.5 13.4 9.4C14 5.6 17.3 2.7 21.3 2.7 25.8 2.7 29.3 6.2 29.3 10.7 29.3 14.7 26.4 18 22.6 18.6Z" fillRule="evenodd"/>
            </svg>
            Go to singer
          </button>

          <button className={btnClass}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            Add to Liked songs
          </button>
        </>
      )}

      {type === "artist" && (
        <>
          <button
            onClick={() => {
              onFollowToggle();
              setOpen(!isOpen);
            }}
            className={`${btnClass} ${isArtistsFollowed ? 'text-[#1ed760] hover:text-[#1fdf64]' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`w-5 h-5 ${isArtistsFollowed ? 'text-[#1ed760]' : 'text-neutral-400 group-hover:text-white'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0zM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
            {isArtistsFollowed ? "Following" : "Follow Artist"}
          </button>

          <button className={`${btnClass} hover:text-red-400 hover:bg-red-500/10`}>
            <svg viewBox="0 0 32 32" width="20" strokeWidth={1} height="20" stroke="currentColor" fill="currentColor" className="text-neutral-400 group-hover:text-inherit transition-colors">
              <path d="M27.3 4.7c-6.3-6.3-16.4-6.3-22.6 0-6.3 6.3-6.3 16.4 0 22.6 6.3 6.2 16.4 6.2 22.6 0 6.2-6.3 6.2-16.4 0-22.6z m-4.3 1.5L6.2 23c-3.3-4.7-2.9-11.2 1.3-15.5s10.8-4.6 15.5-1.3h0z m2.8 2.8c3.3 4.7 2.9 11.2-1.3 15.5-4.2 4.2-10.8 4.6-15.5 1.3l16.8-16.8h0z"/>
            </svg>
            Don&#39;t play this artist
          </button>
        </>
      )}

      <div className="h-[1px] bg-[#282828] my-1 w-[92%] mx-auto" />

      <button onClick={() => {
        setOpen(!isOpen);
        handleShare();
      }} className={btnClass}>
        <svg viewBox="0 0 32 32" width="20" height="20" stroke="currentColor" fill="currentColor" className="text-neutral-400 group-hover:text-white transition-colors">
          <path d="M19.2 8.8a4 4 0 1 1 0.8 2.5L12.7 15a4 4 0 0 1 0 2l7.4 3.7a4 4 0 1 1-0.8 1.5l-7.4-3.7a4 4 0 1 1 0-5l7.4-3.7A4 4 0 0 1 19.2 8.8ZM23.2 6.4a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Zm0 14.4a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8ZM6.4 16a2.4 2.4 0 1 0 4.8 0 2.4 2.4 0 0 0-4.8 0Z"/>
        </svg>
        Share
      </button>
    </div>
  );
}

export default Menu;