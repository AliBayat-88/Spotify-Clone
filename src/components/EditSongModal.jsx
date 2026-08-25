// components/EditSongModal.jsx
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomSelect from './CustomSelect.jsx';
import ButtonLoader from './ButtonLoader.jsx';
import { useArtists } from '../features/useArtists.js';
import { useUpdateSong } from '../features/useUpdateSong.js';
import ModalLayout from './Dashboard/ModalLayout.jsx'

function EditSongModal({ isOpen, onClose, song }) {
  const fileInputRef = useRef(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');

  const { artists = [] } = useArtists();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { updateSong, isUpdating } = useUpdateSong(() => {
    onClose();
  });

  const selectedArtistId = watch('artistId', '');

  // همگام‌سازی مقادیر فرم هنگام باز شدن مودال یا تغییر آهنگ
  useEffect(() => {
    if (isOpen && song) {
      reset({
        name: song.name || '',
        artistId: song.artist_id || song.artists?.id || '',
        lyrics: song.lyrics || '',
      });
      setCoverPreview(song.cover_url || '/profileImg.png');
      setCoverFile(null);
    }
  }, [isOpen, song, reset]);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  function onSubmit(data) {
    updateSong({
      songId: song.id,
      name: data.name.trim(),
      artistId: data.artistId,
      lyrics: data.lyrics,
      coverFile,
      currentCoverUrl: song.cover_url,
    });
  }

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Edit Song">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">

        {/* کاور آهنگ */}
        <div className="flex items-center gap-x-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 rounded-xl overflow-hidden border border-[#333] relative group cursor-pointer bg-black shrink-0 shadow-md"
          >
            <img
              loading="lazy"
              src={coverPreview}
              alt="Cover preview"
              className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 text-[10px] font-bold text-white transition-opacity">
              Change
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">Cover Image</span>
            <span className="text-xs text-gray-400 mt-0.5">Click to replace the cover</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* نام آهنگ */}
        <div className="flex flex-col gap-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Song Name
          </label>
          <input
            type="text"
            {...register('name', {
              required: 'Song name is required',
              validate: (val) => val.trim().length >= 2 || 'At least 2 characters',
            })}
            className={`w-full bg-black text-white px-4 py-3 rounded-xl border outline-none text-sm font-medium transition-all ${
              errors.name
                ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-[#282828] focus:border-white focus:ring-1 focus:ring-white'
            }`}
          />
          {errors.name && (
            <span className="text-xs text-red-400 font-semibold px-0.5">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* انتخاب خواننده */}
        <div className="flex flex-col gap-y-1.5">
          <CustomSelect
            label="Artist"
            options={artists}
            value={selectedArtistId}
            onChange={(val) => setValue('artistId', val, { shouldValidate: true })}
          />
          <input
            type="hidden"
            {...register('artistId', { required: 'Please select an artist' })}
          />
          {errors.artistId && (
            <span className="text-xs text-red-400 font-semibold px-0.5">
              {errors.artistId.message}
            </span>
          )}
        </div>

        {/* متن ترانه */}
        <div className="flex flex-col gap-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Lyrics (Optional)
          </label>
          <textarea
            rows={3}
            {...register('lyrics')}
            placeholder="Enter lyrics if available..."
            className="w-full bg-black text-white px-4 py-3 rounded-xl border border-[#282828] focus:border-white focus:ring-1 focus:ring-white outline-none text-sm resize-none placeholder-gray-600"
          />
        </div>

        {/* اکشن‌ها */}
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
            className="px-6 py-2.5 rounded-full bg-[#1ed760] text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {isUpdating ? <ButtonLoader /> : 'Save Changes'}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}

export default EditSongModal;