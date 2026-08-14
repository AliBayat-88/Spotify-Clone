import { useState, useRef } from "react";
import ProfileMenu from './ProfileMenu.jsx'
import { useOutsideClick } from '../hooks/useOutsideClick.js'
import Modal from './Modal.jsx'
import { useLogOut } from '../features/useLogOut.js'
import { useUserInfo } from '../features/useUserInfo.js'

function Profile() {
  const { avatarUrl } = useUserInfo();

  const [isOpen, setOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { logOut, isLoginOut } = useLogOut(() => {
    setIsLogoutModalOpen(false);
  });
  const profileRef = useRef(null);

  useOutsideClick(profileRef , isOpen , () => setOpen(false))

  return (
    <div ref={profileRef} className="relative inline-block">

      <div className="cursor-pointer" onClick={() => setOpen(isOpen => !isOpen)}>
        <img className="rounded-full w-10 h-10 sm:w-12 sm:h-12" src={avatarUrl || "/profileImg.png"}
             alt="Profile"
             onError={(e) => {
               e.currentTarget.onerror = null; // جلوگیری از حلقه بی‌نهایت اگر عکس پیش‌فرض هم موجود نبود
               e.currentTarget.src = "/profileImg.png";
             }} />
      </div>

      {isOpen && (
        <ProfileMenu onClick={() => setIsLogoutModalOpen(true)}/>
      )}

      {isLogoutModalOpen && <Modal isLoading={isLoginOut} onConfirm={logOut} type="delete" btnColor="bg-red-500/90" explanation="You relly want to log out from the current device?" isOpen={isLogoutModalOpen} btnText="Log out" onClose={() => setIsLogoutModalOpen(false)} />}
    </div>
  );
}

export default Profile;
