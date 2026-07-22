import { useRef, useState } from 'react'

import Menu from './Menu.jsx'
import { useOutsideClick } from '../hooks/useOutsideClick.js'

function TrackDropdown({song}) {
  const [isOpen, setOpen] = useState(false);
  const [isSubOpen, setSubOpen] = useState(false);
  const menuRef = useRef(null);

  useOutsideClick(menuRef , isOpen , () => setOpen(false))

  return (
    <div ref={menuRef} className="h-12 mb-auto my-auto relative flex items-center">
      <button
        onClick={() => setOpen(!isOpen)}
        className="font-black  text-2xl sm:text-3xl text-white/60 hover:text-white bg-transparent border-none cursor-pointer outline-none"
      >
        <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
          <path d="M4.5 10.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5zm15 0c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5zm-7.5 0c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5z"/>
        </svg>
      </button>

      {isOpen && (
<Menu setOpen={setOpen} position="center" isOpen={isOpen} song={song} type="track" isSubOpen={isSubOpen} setSubOpen={setSubOpen} />
      )}
    </div>
  );
}

export default TrackDropdown;