import { useRef, useState } from 'react'

import Menu from './Menu.jsx'
import { useOutsideClick } from '../hooks/useOutsideClick.js'
import { useAuth } from '../context/Auth.jsx'
import { useToaster } from '../context/ToastContext.jsx'
import { useAddLikedSongs } from '../features/useAddLikedSongs.js'
import { useDeleteLikedSong } from '../features/useDeleteLikedSong.js'

function TrackDropdown({song , isLiked}) {
  const [isOpen, setOpen] = useState(false);
  const [isSubOpen, setSubOpen] = useState(false);
  const { addLikedSongs } = useAddLikedSongs()
  const { deleteLikedSong } = useDeleteLikedSong()
  const menuRef = useRef(null);

  const {user} = useAuth()
  const showToast = useToaster()

  async function handleAddToLibrary () {
    if (!user) return showToast("You need to login first", "Please login to use this feature", "error" , "link" , "/login");

    if (isLiked) {
      deleteLikedSong({ userId: user.id, likedSongId: song.id });
    } else {
      addLikedSongs({ userId: user.id, likedSongId: song.id });
    }
  }


  useOutsideClick(menuRef , isOpen , () => setOpen(false))

  return (
    <div ref={menuRef} className="h-12 mb-auto my-auto relative flex items-center">
      <button onClick={() => setOpen(!isOpen)} className="text-[#c9d1d9] hover:text-white transition p-2 focus:outline-none">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
          <path
            d="M4.5 10.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5zm15 0c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5zm-7.5 0c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5z"></path>
        </svg>
      </button>

      {isOpen && (
        <Menu setOpen={setOpen} onToggleLike={handleAddToLibrary} isLiked={isLiked} position="center" isOpen={isOpen}
              song={song} type="track" isSubOpen={isSubOpen} setSubOpen={setSubOpen}/>
      )}
    </div>
  );
}

export default TrackDropdown;