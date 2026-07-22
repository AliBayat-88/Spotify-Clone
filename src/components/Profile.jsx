import { useState, useRef } from "react";
import ProfileMenu from './ProfileMenu.jsx'
import { useOutsideClick } from '../hooks/useOutsideClick.js'
import Modal from './Modal.jsx'
import { useLogOut } from '../features/useLogOut.js'

function Profile() {
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
        <img className="rounded-full w-12 h-12" src='/profileImg.png' alt="Profile" />
      </div>

      {isOpen && (
        <ProfileMenu onClick={() => setIsLogoutModalOpen(true)}/>
      )}

      {isLogoutModalOpen && <Modal isLoading={isLoginOut} onConfirm={logOut} type="delete" btnColor="bg-red-500/90" explanation="You relly want to log out from the current device?" isOpen={isLogoutModalOpen} btnText="Log out" onClose={() => setIsLogoutModalOpen(false)} />}
    </div>
  );
}

export default Profile;
