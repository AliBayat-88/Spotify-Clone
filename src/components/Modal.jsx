import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import ButtonLoader from './ButtonLoader.jsx'

function Modal({ onClose, isOpen, onConfirm, btnText, btnColor = "bg-white", type, explanation, playlist, isLoading }) {
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const fileInputRef = useRef(null)

  // 🟢 ۱. استفاده از React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange', // ولیدیشن لحظه‌ای با تایپ کاربر
    defaultValues: {
      name: ''
    }
  })

  const watchName = watch('name', '')
  const isTextType = type === 'create' || type === 'edit'

  // 🟢 ۲. همگام‌سازی و ریست فرم موقع باز و بسته شدن مودال
  useEffect(() => {
    if (isOpen && type === 'edit' && playlist) {
      reset({ name: playlist.name || '' })
      setImagePreview(playlist.cover_url || '/profileImg.png')
      setImageFile(null)
    } else if (isOpen && type === 'create') {
      reset({ name: '' })
      setImageFile(null)
      setImagePreview('')
    }
  }, [isOpen, type, playlist, reset])

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  // 🟢 ۳. کالبک نهایی ثبت (فقط در صورت Valid بودن فرم صدا زده می‌شود)
  const onSubmit = (data) => {
    onConfirm(data.name.trim(), imageFile)
  }

  if (!isOpen) return null

  return createPortal(
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* بک‌دراپ تاریک */}
      <div
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute inset-0 bg-black/60 transition-opacity"
      />

      <div className="relative w-full max-w-md bg-[#181818] border border-[#282828] rounded-2xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden transform transition-all select-none animate-[fadeIn_.2s_ease-out]">
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-[#1ed760]/10 blur-[50px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* حالت ساخت پلی‌لیست جدید */}
            {type === 'create' && (
              <div className="animate-[fadeIn_.2s_ease-out]">
                <h2 className="text-white text-xl font-extrabold tracking-tight mb-5">New Playlist</h2>
                <div className="flex flex-col gap-y-1.5">
                  <div className="flex justify-between items-center px-0.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Playlist Name</label>
                    <span className={`text-xs ${watchName.length > 20 ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                      {watchName.length}/20
                    </span>
                  </div>

                  <input
                    type="text"
                    placeholder="My Playlist"
                    autoFocus
                    {...register('name', {
                      required: 'Playlist name cannot be empty.',
                      maxLength: { value: 20, message: 'Playlist name is too long (max 20 chars).' },
                      validate: (val) => val.trim().length > 0 || 'Playlist name cannot be empty.'
                    })}
                    className={`w-full bg-black text-white px-4 py-3.5 rounded-xl outline-none border transition-all duration-200 placeholder-gray-600 text-sm font-medium ${
                      errors.name
                        ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-[#282828] focus:border-white focus:ring-1 focus:ring-white'
                    }`}
                  />

                  {errors.name && (
                    <span className="text-xs text-red-400 mt-1 px-0.5">{errors.name.message}</span>
                  )}
                </div>
              </div>
            )}

            {/* حالت حذف */}
            {type === 'delete' && (
              <div className="flex flex-col gap-y-3 items-center text-center py-4 animate-[fadeIn_.2s_ease-out]">
                <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                <h2 className="text-red-500 text-xl font-extrabold tracking-tight">Are you sure?</h2>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xs">{explanation}</p>
              </div>
            )}

            {/* حالت ویرایش */}
            {type === 'edit' && (
              <div className="flex flex-col items-center gap-y-6 animate-[fadeIn_.2s_ease-out]">
                <h2 className="text-white text-xl font-extrabold tracking-tight self-start">Edit Details</h2>

                {/* بخش کاور */}
                <div className="relative group">
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      fileInputRef.current?.click()
                    }}
                    className="w-32 h-32 rounded-xl overflow-hidden border border-[#282828] shadow-xl bg-black cursor-pointer relative"
                  >
                    <img
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
                      src={imagePreview}
                      alt="Playlist Cover"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-white text-[11px] font-bold bg-black/60">
                      <span>Change Photo</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      fileInputRef.current?.click()
                    }}
                    className="absolute -bottom-1.5 -right-1.5 bg-[#1ed760] text-black p-2 rounded-full shadow-lg border-4 border-[#181818] hover:scale-110 active:scale-90 transition-all duration-200 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                {/* اینپوت نام */}
                <div className="w-full flex flex-col gap-y-1.5">
                  <div className="flex justify-between items-center px-0.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Playlist Name</label>
                    <span className={`text-xs ${watchName.length > 20 ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                      {watchName.length}/20
                    </span>
                  </div>

                  <input
                    type="text"
                    placeholder="Name"
                    {...register('name', {
                      required: 'Playlist name cannot be empty.',
                      maxLength: { value: 20, message: 'Playlist name is too long (max 20 chars).' },
                      validate: (val) => val.trim().length > 0 || 'Playlist name cannot be empty.'
                    })}
                    className={`w-full bg-black text-white px-4 py-3.5 rounded-xl outline-none border transition-all duration-200 placeholder-gray-600 text-sm font-medium ${
                      errors.name
                        ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-[#282828] focus:border-white focus:ring-1 focus:ring-white'
                    }`}
                  />

                  {errors.name && (
                    <span className="text-xs text-red-400 mt-1 px-0.5">{errors.name.message}</span>
                  )}
                </div>
              </div>
            )}

            {/* اکشن‌ها */}
            <div className="flex justify-end gap-3 mt-8 border-t border-white/5 pt-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="px-5 py-2.5 rounded-full bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-bold text-sm transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type={isTextType ? 'submit' : 'button'}
                onClick={
                  !isTextType
                    ? (e) => {
                      e.stopPropagation()
                      onConfirm()
                    }
                    : undefined
                }
                disabled={(isTextType && !isValid) || isLoading}
                className={`px-6 py-2.5 rounded-full ${btnColor || 'bg-white text-black'} font-bold text-sm transition-all duration-200 ${
                  (isTextType && !isValid) || isLoading
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                }`}
              >
                {isLoading ? <ButtonLoader /> : btnText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal