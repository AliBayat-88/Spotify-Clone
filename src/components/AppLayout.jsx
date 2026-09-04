import { useState } from 'react';
import { Outlet } from 'react-router';
import Header from './Header.jsx';
import SideBar from './SideBar.jsx';
import PlayerBar from './PlayerBar.jsx';
import MobilePlayer from './MobilePlayer.jsx';
import Modal from './Modal.jsx';
import AuthRequiredModal from './AuthRequiredModal.jsx';
import MobileActions from './MobileActions.jsx';
import { useCreatePlaylist } from '../features/useCreatePlaylist.js';
import { useAuth } from '../context/Auth.jsx';
import { usePlayer } from '../context/PlayerContext.jsx';

function AppLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [playlists] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useAuth();
  const { currentSong } = usePlayer();
  const { createPlaylist, isCreating } = useCreatePlaylist(() => setIsModalOpen(false));

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
    <div className="h-[100dvh] max-h-[100dvh] w-full flex flex-col bg-black overflow-hidden select-none ">
      <Header />

      <main className="flex flex-1 gap-2 text-white overflow-hidden min-h-0 relative px-1 sm:px-0">
        <SideBar playlists={playlists} onOpenModal={handleOpenCreatePlaylist} />

        <div className={`flex-1 overflow-y-auto overflow-x-hidden rounded-xl scrollbar-hide ${currentSong ? 'pb-24 sm:pb-28' : 'pb-6'}`}>
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