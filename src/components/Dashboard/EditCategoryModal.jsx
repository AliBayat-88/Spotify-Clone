import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ModalLayout from './ModalLayout.jsx';
import ButtonLoader from '../ButtonLoader.jsx';
import { useUpdateCategory } from '../../features/useCategoriesManager.js';

function EditCategoryModal({ isOpen, onClose, category }) {
  const fileInputRef = useRef(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { updateCategory, isUpdating } = useUpdateCategory(() => {
    onClose();
  });

  useEffect(() => {
    if (isOpen && category) {
      reset({
        name: category.name || '',
      });
      setCoverPreview(category.image_url || '/category-pop.jpg');
      setCoverFile(null);
    }
  }, [isOpen, category, reset]);

  function handleCoverChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  function onSubmit(data) {
    updateCategory({
      categoryId: category.id,
      name: data.name.trim(),
      coverFile,
      currentImageUrl: category.image_url,
    });
  }

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Edit Category">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">

        {/* کاور دسته‌بندی */}
        <div className="flex items-center gap-x-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 rounded-xl overflow-hidden border border-[#333] relative group cursor-pointer bg-black shrink-0 shadow-md"
          >
            <img
              loading="lazy"
              src={coverPreview}
              alt="Category Preview"
              className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 text-[10px] font-bold text-white transition-opacity">
              Change
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">Category Banner</span>
            <span className="text-xs text-gray-400 mt-0.5">Click to replace card image</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverChange}
            />
          </div>
        </div>

        {/* نام دسته‌بندی */}
        <div className="flex flex-col gap-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Category Name
          </label>
          <input
            type="text"
            {...register('name', {
              required: 'Category name is required',
              validate: (val) => val.trim().length >= 2 || 'Must be at least 2 characters',
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

        {/* دکمه‌ها */}
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
            className="px-6 py-2.5 rounded-full bg-[#1ed760] text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {isUpdating ? <ButtonLoader /> : 'Save Changes'}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}

export default EditCategoryModal;