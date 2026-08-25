import { useState, useRef } from 'react';
import { useUserInfo } from '../../features/useUserInfo.js';
import { useLogOut } from '../../features/useLogOut.js';
import { useOutsideClick } from '../../hooks/useOutsideClick.js';
import ProfileMenu from '../ProfileMenu.jsx';
import Modal from '../Modal.jsx';

function AdminProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { displayName, avatarUrl } = useUserInfo();
  const { logOut, isLoginOut } = useLogOut(() => setIsLogoutModalOpen(false));

  const profileRef = useRef(null);
  useOutsideClick(profileRef, isOpen, () => setIsOpen(false));

  return (
    <div ref={profileRef} className="relative select-none">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 p-1 pr-2.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all cursor-pointer group"
      >
        <div className="relative">
          <img
            loading="lazy"
            src={avatarUrl || '/profileImg.png'}
            alt="Admin"
            className="w-8 h-8 rounded-full object-cover bg-black border border-white/10 shrink-0"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/profileImg.png';
            }}
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#1ed760] border-2 border-[#121212] rounded-full" />
        </div>

        <div className="hidden lg:flex flex-col items-start leading-tight text-left">
          <span className="text-white text-xs font-bold truncate max-w-[110px]">{displayName}</span>
          <span className="text-[10px] text-[#1ed760] font-semibold">Admin</span>
        </div>

        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* استفاده مستقیم از کامپوننت مشترک */}
      {isOpen && (
        <ProfileMenu
          onClose={() => setIsOpen(false)}
          onLogoutClick={() => setIsLogoutModalOpen(true)}
        />
      )}

      {isLogoutModalOpen && (
        <Modal
          isLoading={isLoginOut}
          onConfirm={logOut}
          type="delete"
          btnColor="bg-red-500/90"
          explanation="Are you sure you want to log out from this admin session?"
          isOpen={isLogoutModalOpen}
          btnText="Log out"
          onClose={() => setIsLogoutModalOpen(false)}
        />
      )}
    </div>
  );
}

export default AdminProfile;