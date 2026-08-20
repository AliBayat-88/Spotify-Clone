import { useState } from 'react';
import DashboardTable from './DashboardTable.jsx';
import ActionBtn from '../ActionBtn.jsx';
import TableActions from '../TableActions.jsx';
import { useForm } from 'react-hook-form';
import { useInsertArtist } from '../../features/useInsertArtist.js';
import { useArtists } from '../../features/useArtists.js';
import { useDeleteArtist } from '../../features/useDeleteArtist.js'
import Modal from '../Modal.jsx'
import EditArtistModal from './EditArtistModal.jsx'

function DashboardArtists() {
  const [artistToEdit, setArtistToEdit] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const { artists = [], isLoading: isLoadingArtists } = useArtists();
  const [artistToDelete , setArtistToDelete] = useState(null);
  console.log(artistToDelete)
  const {deleteArtist , isDeleting} = useDeleteArtist(() => {
    setArtistToDelete(null);
  })

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { insertArtist, isPending: isInserting } = useInsertArtist(() => {
    reset();
    setImageFile(null);
  });

  function onSubmit(data) {
    insertArtist({
      name: data.name,
      cover: data.cover,
      bio: data.biography,
    });
  }

  function handleDeleteArtist() {
    deleteArtist(artistToDelete?.id)
  }


  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setValue("cover", file, { shouldValidate: true });
  }

  function handleCancel() {
    reset();
    setImageFile(null);
  }

  const tableColumns = [
    'Artist',
    'Monthly Listeners',
    { label: 'Actions', align: 'right' }
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-y-2 select-none ">
      {/* هدر صفحه */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Artists</h1>
        <p className="text-sm text-gray-400 mt-1">Add and manage artists in your music library</p>
      </div>

      {/* فرم افزودن خواننده */}
      <div className="w-full bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#1ed760]/10 blur-[80px] rounded-full pointer-events-none" />

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5 relative">

          {/* Artist Name */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Artist Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Artist name is required",
                validate: (val) => val.trim().length >= 2 || "Artist name must be at least 2 characters",
              })}
              placeholder="Enter artist name"
              className={`w-full bg-black text-white px-4 py-3.5 rounded-xl border outline-none placeholder:text-gray-600 transition-all text-sm font-medium ${
                errors.name
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-[#262626] focus:border-white focus:ring-1 focus:ring-white"
              }`}
            />
            {errors.name && (
              <span className="text-xs text-red-400 font-semibold px-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Artist Photo */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Artist Photo</label>
            <label className={`group cursor-pointer flex flex-col items-center justify-center min-h-40 rounded-xl border border-dashed transition-all p-4 overflow-hidden ${
              errors.cover ? 'border-red-500 bg-red-500/5' : 'border-[#383838] bg-black hover:border-[#1ed760] hover:bg-[#1ed760]/5'
            }`}>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <input
                type="hidden"
                {...register("cover", { required: "Artist photo is required" })}
              />

              {imageFile ? (
                <div className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Artist preview"
                    className="w-24 h-24 rounded-full object-cover border border-[#333] shadow-md"
                  />
                  <span className="text-xs text-white font-semibold mt-2 truncate max-w-[200px]">{imageFile.name}</span>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#222] group-hover:bg-[#1ed760] group-hover:text-black text-gray-400 flex items-center justify-center transition-all mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <span className="text-sm text-white font-semibold truncate max-w-[200px]">Upload Artist Photo</span>
                  <span className="text-xs text-gray-500 mt-0.5">JPG, PNG or WEBP</span>
                </>
              )}
            </label>
            {errors.cover && (
              <span className="text-xs text-red-400 font-semibold px-1 block">
                {errors.cover.message}
              </span>
            )}
          </div>

          {/* Biography */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Biography</label>
            <textarea
              {...register("biography", {
                required: "Biography is required",
                validate: (val) => val.trim().length >= 20 || "Biography must be at least 20 characters",
              })}
              placeholder="Write biography..."
              rows={5}
              className={`w-full bg-black text-white px-4 py-3 rounded-xl border outline-none resize-none placeholder:text-gray-600 transition-all text-sm leading-relaxed ${
                errors.biography
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-[#262626] focus:border-white focus:ring-1 focus:ring-white"
              }`}
            />
            {/* 🟢 اصلاح فیلد نمایش خطا به errors.biography */}
            {errors.biography && (
              <span className="text-xs text-red-400 font-semibold px-1">
                {errors.biography.message}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 rounded-full text-gray-400 hover:text-white font-bold text-sm transition-all cursor-pointer"
            >
              Cancel
            </button>
            <ActionBtn
              type="submit"
              disabled={isInserting}
              title={isInserting ? "Adding..." : "Add Artist"}
              className="bg-[#1ed760] text-black font-bold px-7 py-2.5 text-sm cursor-pointer disabled:opacity-50"
            />
          </div>
        </form>
      </div>

      {/* جدول خواننده‌ها */}
      <DashboardTable
        title="Artists"
        columns={tableColumns}
        data={artists}
        isLoading={isLoadingArtists}
        renderRow={(artist) => (
          <tr key={artist.id} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
            <td className="px-5 py-4">
              <div className="flex items-center gap-3">
                <img
                  src={artist.image_url || artist.image || '/profileImg.png'}
                  alt={artist.name}
                  className="w-11 h-11 rounded-full object-cover bg-black shrink-0 shadow-md"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate max-w-[200px]">{artist.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">ID: {artist.id}</p>
                </div>
              </div>
            </td>
            <td className="px-5 py-4 text-sm text-gray-400 font-medium">
              {(artist.listeners || 0).toLocaleString()}
            </td>
            <td className="px-5 py-4">
              <TableActions
                onEdit={() => setArtistToEdit(artist)}
                onDelete={() => setArtistToDelete(artist)}
              />
            </td>
          </tr>
        )}
      />

      {artistToDelete && (
        <Modal
          isLoading={isDeleting}
          type="delete"
          btnColor="bg-red-500/90"
          explanation={`Are you sure you want to delete "${artistToDelete.name}" artist? This action cannot be undone.`}
          isOpen={Boolean(artistToDelete)}
          btnText="Delete artist"
          onConfirm={handleDeleteArtist}
          onClose={() => setArtistToDelete(null)}
        />
      )}

      {artistToEdit && (
        <EditArtistModal
          isOpen={Boolean(artistToEdit)}
          artist={artistToEdit}
          onClose={() => setArtistToEdit(null)}
        />
      )}

    </div>
  );
}

export default DashboardArtists;