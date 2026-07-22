import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function SuccessAlert({ message , description , icon , isAlertOpen , onClose,type,address }) {
  let whichIcon;

  if (icon === "success") {
    whichIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    );
  } else if (icon === "info") {
    whichIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor" // 👈 این خط رنگ آیکون رو تابع رنگِ متن کامپوننتت می‌کنه
        viewBox="0 0 48 48"
        className="w-5 h-5" // 👈 استایل‌های سایز رو هم اینجا بهش دادیم تا هماهنگ بشه
      >
        <path d="M 24 3 C 12.413858 3 3 12.413866 3 24 C 3 35.586134 12.413858 45 24 45 C 35.586142 45 45 35.586134 45 24 C 45 12.413866 35.586142 3 24 3 z M 24 5 C 34.505263 5 43 13.494744 43 24 C 43 34.505256 34.505263 43 24 43 C 13.494737 43 5 34.505256 5 24 C 5 13.494744 13.494737 5 24 5 z M 24 12.185547 C 23.159 12.185547 22.474609 12.863313 22.474609 13.695312 C 22.474609 14.535312 23.159 15.220703 24 15.220703 C 24.85 15.220703 25.541016 14.535312 25.541016 13.695312 C 25.541016 12.863312 24.85 12.185547 24 12.185547 z M 24 17.935547 C 23.305 17.935547 22.818359 18.454312 22.818359 19.195312 L 22.818359 33.757812 C 22.818359 34.498812 23.304 35.017578 24 35.017578 C 24.696 35.017578 25.181641 34.498813 25.181641 33.757812 L 25.181641 19.193359 C 25.181641 18.452359 24.695 17.935547 24 17.935547 z"></path>
      </svg>
    );
  } else {
    whichIcon = <img className="w-5 h-5" src='/cross.png' alt="cross" />;
  }

  useEffect(() => {
    if (isAlertOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isAlertOpen , onClose]);

  return (
    <div
      className={`
        fixed top-6 left-1/2 z-[100]
        flex flex-col gap-2 w-80 text-[10px] sm:text-xs
        transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
        ${isAlertOpen ? "opacity-100 translate-y-0 -translate-x-1/2" : "opacity-0 -translate-y-24 -translate-x-1/2"}
      `}
    >
      <div className="success-alert cursor-default flex items-center justify-between  rounded-xl bg-[#262626] border border-[#3e3e3e] py-3.5 px-3 shadow-2xl">
        <div className="flex gap-2 items-center">
          <div className="text-[#2b9875] bg-[#1a1a1a] p-1.5 rounded-lg border border-[#2b9875]/20">
            {whichIcon}
          </div>

          <div className="flex flex-col">
            <p className="text-white font-bold text-base sm:text-lg leading-tight">{message}</p>
            <p className="text-gray-400 text-xs mt-0.5">{description}</p>
          </div>
        </div>

        <div className="flex gap-x-1 items-center">
        <button
          onClick={onClose}
          className={`text-gray-400 hover:text-white hover:bg-white/5 p-1 rounded-md transition-colors 
        `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
          </svg>
        </button>

        {type === "link" && (
          <Link
            to={address}
            onClick={onClose}
            className="block sm:hidden cursor-pointer bg-white/5 hover:bg-white/20 p-1 transition-all rounded-xl"
          >
            <svg viewBox="0 0 32 32" width="20" height="20" stroke="2" fill="#ffffff">
              <path d="M18 6l-1.4 1.4L24.1 15H4v2h20.1l-7.5 7.6L18 26l10-10L18 6z"/>
            </svg>
          </Link>

        )}
        </div>


      </div>
    </div>
  );
}

export default SuccessAlert;