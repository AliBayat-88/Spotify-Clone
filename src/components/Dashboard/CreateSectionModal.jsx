import { useForm } from 'react-hook-form';
import ModalLayout from './ModalLayout.jsx';
import CustomSelect from '../CustomSelect.jsx';
import ButtonLoader from '../ButtonLoader.jsx';
import { useCategories } from '../../features/useCategories.js';
import { useCreateSection } from '../../features/useSectionsManager.js';

const SECTION_TYPES = [
  { id: 'song', name: 'Songs / Tracks' },
  { id: 'artist', name: 'Artists' },
  { id: 'playlist', name: 'Public Playlists' },
];

function CreateSectionModal({ isOpen, onClose }) {
  const { categories = [] } = useCategories();

  const locationOptions = [
    { id: 'home', name: '🏠 Home Page (General)' },
    ...categories.map((c) => ({ id: String(c.id), name: `📂 ${c.name}` })),
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      locationId: 'home',
      type: 'song',
    },
  });

  const { createSection, isCreating } = useCreateSection(() => {
    reset();
    onClose();
  });

  const selectedLocation = watch('locationId');
  const selectedType = watch('type');

  function onSubmit(data) {
    createSection({
      title: data.title.trim(),
      type: data.type,
      categoryId: data.locationId,
    });
  }

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Create New Section">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">

        {/* Title */}
        <div className="flex flex-col gap-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Section Title
          </label>
          <input
            type="text"
            {...register('title', {
              required: 'Section title is required',
              validate: (val) => val.trim().length >= 2 || 'At least 2 characters',
            })}
            placeholder="e.g. Popular Artists, Top Persian Hits"
            className={`w-full bg-black text-white px-4 py-3 rounded-xl border outline-none text-sm font-medium ${
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

        {/* Target Location */}
        <div className="flex flex-col gap-y-1.5">
          <CustomSelect
            label="Display Location"
            placeholder="Select Location"
            options={locationOptions}
            value={selectedLocation}
            onChange={(val) => setValue('locationId', val, { shouldValidate: true })}
          />
        </div>

        {/* Content Type */}
        <div className="flex flex-col gap-y-1.5 z-20">
          <CustomSelect
            label="Content Type"
            placeholder="Select Content Type"
            options={SECTION_TYPES}
            value={selectedType}
            onChange={(val) => setValue('type', val, { shouldValidate: true })}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-3 mt-2 border-t border-white/5">
          <button
            type="button"
            onClick={onClose}
            disabled={isCreating}
            className="px-5 py-2.5 rounded-full text-gray-400 hover:text-white font-bold text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isCreating}
            className="px-6 py-2.5 rounded-full bg-spotify-green text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {isCreating ? <ButtonLoader /> : 'Create Section'}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}

export default CreateSectionModal;