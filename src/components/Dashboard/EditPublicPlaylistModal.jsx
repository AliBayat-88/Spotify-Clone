import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ModalLayout from './ModalLayout.jsx';
import ButtonLoader from '../ButtonLoader.jsx';
import { useUpdatePublicPlaylist } from '../../features/useUpdatePublicPlaylist.js'
import { useImagePreview } from '../../hooks/useImagePreview.js'

function EditPublicPlaylistModal({ isOpen, onClose, playlist }) {
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    file: imageFile,
    previewUrl: imagePreview,
    handleFileChange,
    reset: resetImage,
  } = useImagePreview(playlist?.cover_url || '/profileImg.png');

  const { updatePublicPlaylist, isUpdating } = useUpdatePublicPlaylist(() => {
    onClose()
  });

  useEffect(() => {
    if (isOpen && playlist) {
      reset({
        title: playlist.title || '',
        description: playlist.description || '',
      });
      resetImage(playlist.cover_url || '/profileImg.png');
    }
  }, [isOpen, playlist, reset , resetImage]);


  function onSubmit(data) {
    updatePublicPlaylist({
      playlistId: playlist.id,
      title: data.title.trim(),
      description: data.description?.trim(),
      coverFile : imageFile,
      currentCoverUrl: playlist.cover_url,
    });
  }

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Edit Public Playlist">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">

        {/* کاور پلی‌لیست */}
        <div className="flex items-center gap-x-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 rounded-xl overflow-hidden border border-[#333] relative group cursor-pointer bg-black shrink-0 shadow-md"
          >
            <img
              loading="lazy"
              src={imagePreview}
              alt="Playlist cover"
              className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 text-[10px] font-bold text-white transition-opacity">
              Change
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">Cover Artwork</span>
            <span className="text-xs text-gray-400 mt-0.5">Click to replace image</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* عنوان پلی‌لیست */}
        <div className="flex flex-col gap-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Playlist Title
          </label>
          <input
            type="text"
            {...register('title', {
              required: 'Title is required',
              validate: (val) => val.trim().length >= 2 || 'At least 2 characters',
            })}
            className={`w-full bg-black text-white px-4 py-3 rounded-xl border outline-none text-sm font-medium transition-all ${
              errors.title
                ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-[#282828] focus:border-white focus:ring-1 focus:ring-white'
            }`}
          />
          {errors.title && (
            <span className="text-xs text-red-400 font-semibold px-0.5">
              {errors.title.message}
            </span>
          )}
        </div>

        {/* توضیحات */}
        <div className="flex flex-col gap-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Description (Optional)
          </label>
          <textarea
            rows={3}
            {...register('description')}
            placeholder="Describe this playlist..."
            className="w-full bg-black text-white px-4 py-3 rounded-xl border border-[#282828] focus:border-white focus:ring-1 focus:ring-white outline-none text-sm resize-none placeholder-gray-600"
          />
        </div>

        {/* دکمه‌ها */}
        <div className="flex justify-end gap-3 pt-3 mt-2 border-t border-white/5">
          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="px-5 py-2.5 rounded-full text-gray-400 hover:text-white font-bold text-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="px-6 py-2.5 rounded-full bg-spotify-green text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {isUpdating ? <ButtonLoader /> : 'Save Changes'}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}

export default EditPublicPlaylistModal;