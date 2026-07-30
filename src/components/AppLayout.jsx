import Header from './Header.jsx'
import SideBar from './SideBar.jsx'
import { Outlet } from 'react-router'
import PlayerBar from './PlayerBar.jsx'
import MobilePlayer from './MobilePlayer.jsx'

import { useState } from "react";

import Modal from './Modal.jsx'
import AuthRequiredModal from './AuthRequiredModal.jsx' // 👈 اضافه کردن مودال جدید
import MobileActions from './MobileActions.jsx'
import { useCreatePlaylist } from '../features/useCreatePlaylist.js'
import { useAuth } from '../context/Auth.jsx'

function AppLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [playlists] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const { createPlaylist , isCreating } = useCreatePlaylist(() => setIsModalOpen(false));

  function handleOpenCreatePlaylist() {
    setIsMobileMenuOpen(false);

    if (user) {
      setIsModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  }

  function handleCreatePlaylist(name) {
    createPlaylist({
      name,
      userId: user.id,
    });
  }

  return (
    <div className="h-screen flex flex-col bg-black relative">
      <Header />

      <main className="flex flex-1 gap-2 text-white overflow-hidden">
        <SideBar playlists={playlists} onOpenModal={handleOpenCreatePlaylist} />

        <div className="flex-1 overflow-y-auto lg:mb-4">
          <Outlet context={{ onOpenCreatePlaylist: handleOpenCreatePlaylist }} />
        </div>
      </main>

      <PlayerBar />
      <MobilePlayer />


      <MobileActions
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        onCreatePlaylist={handleOpenCreatePlaylist}
      />

      <Modal
        isLoading={isCreating}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreatePlaylist}
        btnColor="bg-white"
        btnText="Create"
        type="create"
      />

      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default AppLayout;