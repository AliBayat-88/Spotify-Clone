import { useRef, useState } from 'react'
import Menu from './Menu.jsx'
import { useOutsideClick } from '../hooks/useOutsideClick.js'

function ArtistDropDown({ isArtistsFollowed, onFollowToggle }) {
  const [isOpen, setOpen] = useState(false)
  const [isSubOpen, setSubOpen] = useState(false)
  const menuRef = useRef(null);

  useOutsideClick(menuRef , isOpen , () => setOpen(false))

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!isOpen)}
        className="text-[#c9d1d9] hover:text-white transition p-2 focus:outline-none"
      >
        <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
          <path d="M4.5 10.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5zm15 0c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5zm-7.5 0c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5z"/>
        </svg>
      </button>

      {isOpen && (
        <Menu
          type="artist"
          position="center"
          isOpen={isOpen}
          setOpen={setOpen}
          isSubOpen={isSubOpen}
          setSubOpen={setSubOpen}
          isArtistsFollowed={isArtistsFollowed} // 🟢
          onFollowToggle={onFollowToggle}       // 🟢
        />
      )}
    </div>
  )
}

export default ArtistDropDown