import EditIcon from './icons/EditIcon.jsx'
import GarbageIcon from './icons/GarbageIcon.jsx'
import { useState } from 'react'
import Modal from './Modal.jsx'
import { useDeletePlaylist } from '../features/useDeletePlaylist.js'
import { useUpdatePlaylist } from '../features/useUpdatePlaylist.js'
import { useNavigate } from 'react-router-dom'
import { useToggleSavePublicPlaylist } from '../features/useToggleSavePublicPlaylist.js'
import { useAuth } from '../context/Auth.jsx'

function PlayListActions({ playlist , isPublic }) {
  const navigate = useNavigate()

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const { deletePlaylist, isDeleting } = useDeletePlaylist(() => navigate('/'))
  const { updatePlaylist, isUpdating } = useUpdatePlaylist(() => setIsModalEditOpen(false));
  const { unsavePublicPlaylist, isUnsaving } = useToggleSavePublicPlaylist();
  const { user } = useAuth();

  function handleDeletePlaylist() {
    if (playlist?.id && isPublic) {
      unsavePublicPlaylist({ user_id: user?.id, public_playlist_id: playlist?.id },
      );
    }else {
      deletePlaylist(playlist?.id)
    }
  }

  function handleUpdate(value, imageFile) {
    if (!value.trim()) return;

    const obj = {
      name: value,
      cover_url: playlist.cover_url
    };
    updatePlaylist({ id: playlist.id, obj, image: imageFile });
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex items-center"
    >
      {!isPublic && <button
        onClick={(e) => {
          e.stopPropagation()
          setIsModalEditOpen(true)
        }}
        className="p-2 text-gray-500 hover:text-green-500 active:scale-90 rounded-full hover:bg-white/5 transition-all duration-150 shrink-0"
      >
        <EditIcon/>
      </button>}

      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsModalDeleteOpen(true);
        }}
        className="p-2 text-gray-500 hover:text-red-500 active:text-red-600 active:scale-90 rounded-full hover:bg-white/5 transition-all duration-150 shrink-0"
      >
        <GarbageIcon />
      </button>

      {isModalEditOpen && (
        <Modal
          isLoading={isUpdating}
          onClose={() => setIsModalEditOpen(false)}
          onConfirm={handleUpdate}
          playlist={playlist}
          type="edit"
          isOpen={isModalEditOpen}
          btnText="Edit"
        />
      )}

      {isModalDeleteOpen && (
        <Modal
          isLoading={isUnsaving || isDeleting}
          onClose={() => setIsModalDeleteOpen(false)}
          onConfirm={handleDeletePlaylist}
          btnColor="bg-red-500 hover:bg-red-600"
          explanation="Do you really want to DELETE the playlist ?"
          type="delete"
          isOpen={isModalDeleteOpen}
          btnText="Delete"
        />
      )}
    </div>
  );
}

export default PlayListActions;