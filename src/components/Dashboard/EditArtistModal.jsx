import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ModalLayout from './ModalLayout.jsx';
import ButtonLoader from '../ButtonLoader.jsx';
import { useUpdateArtist } from '../../features/useUpdateArtist.js'
import { useImagePreview } from '../../hooks/useImagePreview.js'

function EditArtistModal({ isOpen, onClose, artist }) {
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
  } = useImagePreview(artist?.image_url || '/profileImg.png');

  const { updateArtist, isUpdating } = useUpdateArtist(() => {
    onClose();
  });

  useEffect(() => {
    if (isOpen && artist) {
      reset({
        name: artist.name || '',
        biography: artist.bio || artist.biography || '',
      });
      resetImage(artist.image_url || '/profileImg.png');
    }
  }, [isOpen, artist, reset , resetImage]);

  function onSubmit(data) {
    updateArtist({
      artistId: artist.id,
      name: data.name.trim(),
      bio: data.biography.trim(),
      coverFile:imageFile,
      currentImageUrl: artist.image_url || artist.image,
    });
  }

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Edit Artist">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">

        <div className="flex items-center gap-x-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 rounded-full overflow-hidden border border-[#333] relative group cursor-pointer bg-black shrink-0 shadow-md"
          >
            <img loading="lazy" src={imagePreview} alt="Artist" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 text-[10px] font-bold text-white transition-opacity">
              Change
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">Artist Photo</span>
            <span className="text-xs text-gray-400 mt-0.5">Click to update profile image</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase">Artist Name</label>
          <input
            type="text"
            {...register('name', {
              required: 'Artist name is required',
              validate: (val) => val.trim().length >= 2 || 'At least 2 characters',
            })}
            className="w-full bg-black text-white px-4 py-3 rounded-xl border border-[#282828] focus:border-white focus:ring-1 focus:ring-white outline-none text-sm"
          />
          {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase">Biography</label>
          <textarea
            rows={4}
            {...register('biography', {
              required: 'Biography is required',
              validate: (val) => val.trim().length >= 20 || 'At least 20 characters',
            })}
            className="w-full bg-black text-white px-4 py-3 rounded-xl border border-[#282828] focus:border-white focus:ring-1 focus:ring-white outline-none text-sm resize-none"
          />
          {errors.biography && <span className="text-xs text-red-400">{errors.biography.message}</span>}
        </div>

        <div className="flex justify-end gap-3 pt-3 mt-2 border-t border-white/5">
          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="px-5 py-2.5 rounded-full text-gray-400 hover:text-white font-bold text-sm cursor-pointer"
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

export default EditArtistModal;