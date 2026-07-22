import { useEffect, useState, useRef } from 'react' // 🟢 اضافه شدن useRef
import { createPortal } from 'react-dom'
import ButtonLoader from './ButtonLoader.jsx'

function Modal({ onClose, isOpen, onConfirm, btnText, btnColor = "bg-white", type, explanation, playlist ,isLoading }) {
  const [value, setValue] = useState('')
  const [imageFile, setImageFile] = useState(null) // 🟢 ذخیره فایل واقعی برای آپلود
  const [imagePreview, setImagePreview] = useState('') // 🟢 ذخیره آدرس موقت برای پیش‌نمایش در UI
  const fileInputRef = useRef(null) // 🟢 برای کنترل راحت‌تر اینپوت فایل با کلیک روی مداد یا کاور


  useEffect(() => {
    if (isOpen && type === "edit" && playlist) {
      setValue(playlist.name || '');
      setImagePreview(playlist.cover_url || '/profileImg.png');
      setImageFile(null);
    } else if (isOpen && type === "create") {
      setValue('');
    }
  }, [isOpen, type, playlist]);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }



  if (!isOpen) return null;


  return createPortal (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/60  transition-opacity" />

      <div  className="relative w-full max-w-md bg-[#181818] border border-[#282828] rounded-2xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden transform transition-all select-none animate-[fadeIn_.2s_ease-out]">

        {/* هاله نوری سبز محو در گوشه مودال برای یکپارچگی تم */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-[#1ed760]/10 blur-[50px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          {type === "create" && (
            <div className="animate-[fadeIn_.2s_ease-out]">
              <h2 className="text-white text-xl font-extrabold tracking-tight mb-5">New Playlist</h2>
              <div className="flex flex-col gap-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Playlist Name</label>
                <input
                  type="text"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder="My Playlist"
                  className="w-full bg-black text-white px-4 py-3.5 rounded-xl outline-none border border-[#282828] focus:border-white focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-600 text-sm font-medium"
                />
              </div>
            </div>
          )}

          {type === "delete" && (
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

          {type === "edit" && (
            <div className="flex flex-col items-center gap-y-6 animate-[fadeIn_.2s_ease-out]">
              <h2 className="text-white text-xl font-extrabold tracking-tight self-start">Edit Details</h2>

              {/* بخش تغییر کاور */}
              <div className="relative group">
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="w-32 h-32 rounded-xl overflow-hidden border border-[#282828] shadow-xl bg-black cursor-pointer relative"
                >
                  <img
                    className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
                    src={imagePreview}
                    alt="Playlist Cover"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-white text-[11px] font-bold bg-black/60">
                    <span>Change Photo</span>
                  </div>
                </div>

                {/* آیکون مداد شناور */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
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

              {/* اینپوت متن */}
              <div className="w-full flex flex-col gap-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Playlist Name</label>
                <input
                  type="text"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder="Name"
                  className="w-full bg-black text-white px-4 py-3.5 rounded-xl outline-none border border-[#282828] focus:border-white focus:ring-1 focus:ring-white transition-all duration-200 placeholder-gray-600 text-sm font-medium"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-8 border-t border-white/5 pt-4">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-bold text-sm transition-all duration-200"
            >
              Cancel
            </button>

            <button
              onClick={(e) => {
                console.log("clicked");
                e.stopPropagation()
                onConfirm(value, imageFile);
              }}
              disabled={isLoading}
              className={`px-6 py-2.5 rounded-full ${btnColor || 'bg-white text-black'} font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50`}
            >
              {isLoading ? <ButtonLoader/> : btnText}
            </button>
          </div>
        </div>

      </div>
    </div>, document.body
  );
}

export default Modal;