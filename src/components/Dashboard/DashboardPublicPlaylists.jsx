import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DashboardTable from './DashboardTable.jsx';
import TableActions from '../TableActions.jsx';
import ActionBtn from '../ActionBtn.jsx';
import CustomSelect from '../CustomSelect.jsx';
import { useCategories } from '../../features/useCategories.js';
import { useSections } from '../../features/useSections.js';
import { useInsertPublicPlaylist } from '../../features/useInsertPublicPlaylist.js';
import { useDashboardPublicPlayLists } from '../../features/useDashboardPublicPlayLists.js'
import Modal from '../Modal.jsx'
import { useDeletePublicPlaylist } from '../../features/useDeletePublicPlaylist.js'
import EditPublicPlaylistModal from './EditPublicPlaylistModal.jsx'

function DashboardPublicPlaylists() {
  const [coverFile, setCoverFile] = useState(null);
  const [publicPlaylistToDelete , setPublicPlaylistToDelete] = useState(null);
  const [publicPlaylistToEdit , setPublicPlaylistToEdit] = useState(null);

  const {deletePublicPlaylist , isDeleting} = useDeletePublicPlaylist(() => {
    setPublicPlaylistToDelete(null);
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { categories = [] } = useCategories();
  const { sections = [] } = useSections();
  const { publicPlaylists = [], isLoading } = useDashboardPublicPlayLists();

  const { insertPublicPlaylist, isPending } = useInsertPublicPlaylist(() => {
    reset();
    setCoverFile(null);
  });

  function handleDeletePublicPlaylist() {
    deletePublicPlaylist(publicPlaylistToDelete?.id)
  }


  const selectedCategoryId = watch('categoryId', '');
  const selectedSectionId = watch('sectionId', '');

  // 🟢 فیلتر هوشمند سکشن‌ها بر اساس Category انتخاب‌شده و نوع 'playlist'
  const isCategorySelected = Boolean(selectedCategoryId);

  const availableSections = sections.filter((sec) => {
    const isPlaylistType = sec.type === 'playlist';
    return isPlaylistType && Number(sec.category_id) === Number(selectedCategoryId);
  });

  function handleCoverChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setValue('cover', file, { shouldValidate: true });
  }

  function onSubmit(data) {
    insertPublicPlaylist({
      title: data.title.trim(),
      description: data.description?.trim(),
      sectionId: data.sectionId,
      coverFile,
    });
  }

  const tableColumns = [
    'Playlist',
    'Section',
    { label: 'Actions', align: 'right' },
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-y-2 select-none ">
      {/* هدر */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Public Playlists
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Create and manage featured playlists displayed across your website
        </p>
      </div>

      {/* فرم ایجاد پلی‌لیست عمومی */}
      <div className="w-full bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#1ed760]/10 blur-[80px] rounded-full pointer-events-none" />

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5 relative">

          {/* Playlist Title */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
              Playlist Title
            </label>
            <input
              type="text"
              {...register('title', {
                required: 'Playlist title is required',
                validate: (val) => val.trim().length >= 2 || 'At least 2 characters',
              })}
              placeholder="e.g. Russian Pop Hits"
              className={`w-full bg-black text-white px-4 py-3.5 rounded-xl border outline-none text-sm font-medium ${
                errors.title
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-[#262626] focus:border-white focus:ring-1 focus:ring-white'
              }`}
            />
            {errors.title && (
              <span className="text-xs text-red-400 font-semibold px-1">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              {...register('description' , {
                required: 'Please enter a description',
                validate: {
                  minLength: (val) => val.length >= 10 || 'At least 10 characters',
                  maxLength: (val) => val.length <= 40 || 'max 40 characters',
                }
              })}
              placeholder="Describe this playlist..."
              className={`w-full bg-black text-white px-4 py-3 rounded-xl border border-[#262626] outline-none resize-none placeholder-gray-600 focus:border-white focus:ring-1 focus:ring-white text-sm leading-relaxed ${
                errors.description
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-[#262626] focus:border-white focus:ring-1 focus:ring-white'
              }`}
            />

            {errors.description && (
              <span className="text-xs text-red-400 font-semibold px-1">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Category & Section Cascading Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-y-1">
              <CustomSelect
                label="Step 1: Select Category"
                placeholder="Choose Category"
                options={categories}
                value={selectedCategoryId}
                onChange={(val) => {
                  setValue('categoryId', val, { shouldValidate: true });
                  setValue('sectionId', ''); // پاک کردن سکشن قبلی هنگام تغییر دسته‌بندی
                }}
              />
            </div>

            <div className="flex flex-col gap-y-1">
              <CustomSelect
                label="Step 2: Target Section"
                disabled={!isCategorySelected}
                placeholder={
                  !isCategorySelected
                    ? 'Select a category first'
                    : availableSections.length > 0
                      ? 'Select a Section'
                      : 'No playlist sections in this category'
                }
                options={availableSections}
                value={selectedSectionId}
                onChange={(val) => setValue('sectionId', val, { shouldValidate: true })}
              />
              <input
                type="hidden"
                {...register('sectionId', { required: 'Please select a target section' })}
              />
              {errors.sectionId && (
                <span className="text-xs text-red-400 font-semibold px-1 mt-1">
                  {errors.sectionId.message}
                </span>
              )}
            </div>
          </div>

          {/* Cover Uploader */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
              Playlist Cover
            </label>
            <label className={`group cursor-pointer flex flex-col items-center justify-center min-h-36 rounded-xl border border-dashed transition-all p-4 ${
              errors.cover ? 'border-red-500 bg-red-500/5' : 'border-[#383838] bg-black hover:border-[#1ed760] hover:bg-[#1ed760]/5'
            }`}>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverChange}
              />
              <input
                type="hidden"
                {...register('cover', { required: 'Cover image is required' })}
              />
              <div className="w-10 h-10 rounded-full bg-[#222] group-hover:bg-[#1ed760] group-hover:text-black text-gray-400 flex items-center justify-center transition-all mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V7.75A2.75 2.75 0 015.75 5h12.5A2.75 2.75 0 0121 7.75v8.5A2.75 2.75 0 0118.25 19H5.75A2.75 2.75 0 013 16.5Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3 15 4.5-4.5 3.5 3.5 2.5-2.5L21 18" />
                </svg>
              </div>
              <span className="text-sm text-white font-semibold truncate max-w-[200px]">
                {coverFile ? coverFile.name : 'Upload Cover Image'}
              </span>
              <span className="text-xs text-gray-500 mt-0.5">JPG, PNG or WEBP</span>
            </label>
            {errors.cover && (
              <span className="text-xs text-red-400 font-semibold px-1">
                {errors.cover.message}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => {
                reset();
                setCoverFile(null);
              }}
              className="px-6 py-2.5 rounded-full text-gray-400 hover:text-white font-bold text-sm cursor-pointer"
            >
              Reset
            </button>
            <ActionBtn
              type="submit"
              disabled={isPending}
              title={isPending ? 'Creating...' : 'Create Playlist'}
              className="bg-[#1ed760] text-black font-bold px-7 py-2.5 text-sm cursor-pointer disabled:opacity-50"
            />
          </div>
        </form>
      </div>

      {/* جدول نمایش */}
      <DashboardTable
        title="Public Playlists"
        columns={tableColumns}
        data={publicPlaylists}
        isLoading={isLoading}
        renderRow={(playlist) => (
          <tr key={playlist.id} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
            <td className="px-5 py-4">
              <div className="flex items-center gap-3">
                <img
                  loading="lazy"
                  src={playlist.cover_url || '/profileImg.png'}
                  alt={playlist.title}
                  className="w-11 h-11 rounded-lg object-cover bg-black shrink-0 shadow-md"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate max-w-[200px]">
                    {playlist.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[250px] mt-0.5">
                    {playlist.description || 'No description'}
                  </p>
                </div>
              </div>
            </td>

            <td className="px-5 py-4 text-sm text-gray-300 font-medium">
              {playlist.sections?.title || 'Unknown Section'}
            </td>

            <td className="px-5 py-4">
              <TableActions
                onEdit={() => setPublicPlaylistToEdit(playlist)}
                onDelete={() => setPublicPlaylistToDelete(playlist)}
              />
            </td>
          </tr>
        )}
      />

      {publicPlaylistToDelete && (
        <Modal
          isLoading={isDeleting}
          type="delete"
          btnColor="bg-red-500/90"
          explanation={`Are you sure you want to delete "${publicPlaylistToDelete.name}" artist? This action cannot be undone.`}
          isOpen={Boolean(publicPlaylistToDelete)}
          btnText="Delete artist"
          onConfirm={handleDeletePublicPlaylist}
          onClose={() => setPublicPlaylistToDelete(null)}
        />
      )}

      {publicPlaylistToEdit && (
        <EditPublicPlaylistModal
          isOpen={Boolean(publicPlaylistToEdit)}
          artist={publicPlaylistToEdit}
          onClose={() => setPublicPlaylistToEdit(null)}
          playlist={publicPlaylistToEdit}
        />
      )}
    </div>
  );
}

export default DashboardPublicPlaylists;