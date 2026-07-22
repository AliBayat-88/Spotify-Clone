import EditIcon from './EditIcon.jsx'
import GarbageIcon from './GarbageIcon.jsx'
import { useState } from 'react'
import Modal from './Modal.jsx'
import { useDeletePlaylist } from '../features/useDeletePlaylist.js'
import { useUpdatePlaylist } from '../features/useUpdatePlaylist.js'

function PlayListActions({playlist}) {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const {deletePlaylist , isDeleting} = useDeletePlaylist(() => setIsModalDeleteOpen(false));
  const { updatePlaylist , isUpdating } = useUpdatePlaylist(() => setIsModalEditOpen(false));


  function handleDeletePlaylist () {
    deletePlaylist(playlist?.id)
  }

  function handleUpdate(value , imageFile) {
    if (!value.trim()) return;

    const obj = {
      name: value,
      cover_url: playlist.cover_url
    };
    updatePlaylist({ id: playlist.id, obj, image: imageFile });
  }

  return (

    <div className="flex items-center">
      <button onClick={() => {setIsModalEditOpen(!isModalEditOpen)}}
        className="p-2 text-gray-500 hover:text-green-500  active:scale-90 rounded-full hover:bg-white/5 transition-all duration-150 shrink-0">
        <EditIcon/>
      </button>
      <button onClick={() => {setIsModalDeleteOpen(!isModalDeleteOpen)}}
        className="p-2 text-gray-500 hover:text-red-500 active:text-red-600 active:scale-90 rounded-full hover:bg-white/5 transition-all duration-150 shrink-0"
      >
        <GarbageIcon/>
      </button>

      {isModalEditOpen && <Modal isLoading={isUpdating} onClose={() => setIsModalEditOpen(false)} onConfirm={handleUpdate} playlist={playlist} type="edit" isOpen={isModalEditOpen} btnText="Edit" />}


      {isModalDeleteOpen && <Modal isLoading={isDeleting} onClose={() => setIsModalDeleteOpen(false)} onConfirm={handleDeletePlaylist} btnColor="bg-red-500" explanation="Do you really want to DELETE the playlist ?" type="delete" isOpen={isModalDeleteOpen} btnText="Delete" />}

    </div>
  );
}

export default PlayListActions;
