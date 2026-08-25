import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import DashboardTable from './DashboardTable.jsx';
import TableActions from '../TableActions.jsx';
import ActionBtn from '../ActionBtn.jsx';
import Modal from '../Modal.jsx';
import EditCategoryModal from './EditCategoryModal.jsx';
import { useCategories } from '../../features/useCategories.js';
import { useSections } from '../../features/useSections.js';
import {
  useInsertCategory,
  useDeleteCategory,
} from '../../features/useCategoriesManager.js';
import { formatDaysAgo } from '../../utils/helpers.js';

function DashboardCategories() {
  const [coverFile, setCoverFile] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const { categories = [], isLoading: isLoadingCategories } = useCategories();
  const { sections = [], isLoading: isLoadingSections } = useSections();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { insertCategory, isInserting } = useInsertCategory(() => {
    reset();
    setCoverFile(null);
  });

  const { deleteCategory, isDeleting } = useDeleteCategory(() => {
    setCategoryToDelete(null);
  });

  const categoriesWithStats = useMemo(() => {
    return categories.map((category) => {
      const connectedSectionsCount = sections.filter(
        (sec) => Number(sec.category_id) === Number(category.id)
      ).length;

      return {
        ...category,
        sections_count: connectedSectionsCount,
      };
    });
  }, [categories, sections]);

  function handleCoverChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverFile(file);
    setValue('cover', file, { shouldValidate: true });
  }

  function handleReset() {
    reset();
    setCoverFile(null);
  }

  function onSubmit(data) {
    insertCategory({
      name: data.name.trim(),
      coverFile,
    });
  }

  const tableColumns = [
    'Category',
    'Connected Sections',
    'Created At',
    { label: 'Actions', align: 'right' },
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-y-2 select-none">
      {/* هدر صفحه */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Browse Categories
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Create and manage root music categories shown in the Search & Browse tab
        </p>
      </div>

      {/* فرم ایجاد دسته‌بندی جدید */}
      <div className="w-full bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#1ed760]/10 blur-[80px] rounded-full pointer-events-none" />

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Category Name */}
            <div className="flex flex-col gap-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
                Category Name
              </label>
              <input
                type="text"
                {...register('name', {
                  required: 'Category name is required',
                  validate: (val) => val.trim().length >= 2 || 'Must be at least 2 characters',
                })}
                placeholder="e.g. Rock, Indie, Electronic"
                className={`w-full min-h-[50px] bg-black text-white px-4 rounded-xl py-2.5 border outline-none text-sm font-medium ${
                  errors.name
                    ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-[#262626] focus:border-white focus:ring-1 focus:ring-white'
                }`}
              />
              {errors.name && (
                <span className="text-xs text-red-400 font-semibold px-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Category Cover Tile */}
            <div className="flex flex-col gap-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
                Category Card Cover
              </label>
              <label
                className={`group cursor-pointer flex items-center gap-4 min-h-[50px] rounded-xl border border-dashed transition-all p-2.5 px-4 ${
                  errors.cover
                    ? 'border-red-500 bg-red-500/5'
                    : 'border-[#383838] bg-black hover:border-[#1ed760] hover:bg-[#1ed760]/5'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverChange}
                />
                <input
                  type="hidden"
                  {...register('cover', { required: 'Category cover image is required' })}
                />

                <div className="w-10 h-10 rounded-lg bg-[#222] group-hover:bg-[#1ed760] group-hover:text-black text-gray-400 flex items-center justify-center transition-all shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white truncate max-w-[180px]">
                    {coverFile ? coverFile.name : 'Upload Card Banner'}
                  </span>
                  <span className="text-[11px] text-gray-500">JPG, PNG or WEBP</span>
                </div>
              </label>
              {errors.cover && (
                <span className="text-xs text-red-400 font-semibold px-1">
                  {errors.cover.message}
                </span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-3 pt-3 border-t border-white/5">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full text-gray-400 hover:text-white font-bold text-sm transition-all cursor-pointer"
            >
              Reset
            </button>
            <ActionBtn
              type="submit"
              disabled={isInserting}
              title={isInserting ? 'Adding...' : 'Add Category'}
              className="bg-[#1ed760] text-black font-bold px-7 py-2.5 text-sm cursor-pointer hover:scale-105 transition-all disabled:opacity-50"
            />
          </div>
        </form>
      </div>

      {/* جدول نمایش لیست دسته‌بندی‌ها */}
      <DashboardTable
        title="All Categories"
        columns={tableColumns}
        data={categoriesWithStats}
        isLoading={isLoadingCategories || isLoadingSections}
        renderRow={(category) => (
          <tr
            key={category.id}
            className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
          >
            <td className="px-5 py-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#222] shrink-0 border border-white/10 shadow-sm flex items-center justify-center font-black text-sm text-gray-400">
                  {category.image_url ? (
                    <img
                      loading="lazy"
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    category.name.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate max-w-[200px]">
                    {category.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">ID: {category.id}</p>
                </div>
              </div>
            </td>

            <td className="px-5 py-4">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#1ed760]/10 border border-[#1ed760]/20 text-xs font-bold text-[#1ed760]">
                {category.sections_count} {category.sections_count === 1 ? 'Section' : 'Sections'}
              </span>
            </td>

            <td className="px-5 py-4 text-sm text-gray-400 font-medium">
              {formatDaysAgo(category.created_at) || '—'}
            </td>

            <td className="px-5 py-4">
              <TableActions
                onEdit={() => setCategoryToEdit(category)}
                onDelete={() => setCategoryToDelete(category)}
              />
            </td>
          </tr>
        )}
      />

      {/* مودال ادیت */}
      {categoryToEdit && (
        <EditCategoryModal
          isOpen={Boolean(categoryToEdit)}
          category={categoryToEdit}
          onClose={() => setCategoryToEdit(null)}
        />
      )}

      {/* مودال حذف */}
      {categoryToDelete && (
        <Modal
          isLoading={isDeleting}
          type="delete"
          btnColor="bg-red-500/90"
          explanation={`Are you sure you want to delete "${categoryToDelete.name}" category? All sections in this category may be affected.`}
          isOpen={Boolean(categoryToDelete)}
          btnText="Delete category"
          onConfirm={() => deleteCategory(categoryToDelete.id)}
          onClose={() => setCategoryToDelete(null)}
        />
      )}
    </div>
  );
}

export default DashboardCategories;