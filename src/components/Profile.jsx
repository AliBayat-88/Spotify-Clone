import { useState, useRef } from "react";
import ProfileMenu from './ProfileMenu.jsx';
import { useOutsideClick } from '../hooks/useOutsideClick.js';
import Modal from './Modal.jsx';
import { useLogOut } from '../features/useLogOut.js';
import { useUserInfo } from '../features/useUserInfo.js';

function Profile() {
  const { avatarUrl } = useUserInfo();

  const [isOpen, setOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { logOut, isLoginOut } = useLogOut(() => {
    setIsLogoutModalOpen(false);
  });
  const profileRef = useRef(null);

  useOutsideClick(profileRef, isOpen, () => setOpen(false));

  return (
    <div ref={profileRef} className="relative inline-block select-none">

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative group flex items-center justify-center p-0.5 rounded-full outline-none focus:outline-none transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="User Profile"
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#1ed760]/40 via-emerald-400/20 to-transparent blur-md transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        />

        <div
          className={`relative p-[3px] rounded-full transition-all duration-300 ${
            isOpen
              ? 'bg-gradient-to-r from-[#1ed760] via-white/80 to-[#1ed760] shadow-[0_0_15px_rgba(30,215,96,0.35)]'
              : 'bg-[#282828] group-hover:bg-gradient-to-tr group-hover:from-[#1ed760] group-hover:to-white/40'
          }`}
        >
          {/* ۳. عکس پروفایل با بردر مشکی داخلی جهت تفکیک لایه‌ها */}
          <img
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover bg-[#121212] border-2 border-black/80 transition-all duration-300"
            src={avatarUrl || "/profileImg.png"}
            alt="Profile"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/profileImg.png";
            }}
          />
        </div>

        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#1ed760] border-2 border-[#121212] rounded-full shadow-sm flex items-center justify-center">
          <span className="w-1 h-1 bg-white rounded-full opacity-80" />
        </span>
      </button>

      {isOpen && (
        <ProfileMenu onClick={() => setIsLogoutModalOpen(true)} onClose={() => setOpen(false)} />
      )}

      {isLogoutModalOpen && (
        <Modal
          isLoading={isLoginOut}
          onConfirm={logOut}
          type="delete"
          btnColor="bg-red-500/90"
          explanation="Are you sure you want to log out from your account on this device?"
          isOpen={isLogoutModalOpen}
          btnText="Log out"
          onClose={() => setIsLogoutModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Profile;