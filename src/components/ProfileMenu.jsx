// components/ProfileMenu.jsx
import { NavLink, useLocation } from 'react-router-dom';
import ProfileIcon from './icons/ProfileIcon.jsx';
import LibraryIcon from './icons/LibraryIcon.jsx';
import ExitIcon from './icons/ExitIcon.jsx';
import { useUserInfo } from '../features/useUserInfo.js';

function ProfileMenu({ onLogoutClick, onClose }) {
  const { profile } = useUserInfo();
  const { pathname } = useLocation();

  const isAdmin = profile?.role === 'admin' || Boolean(profile?.isAdmin);
  const isInDashboard = pathname.startsWith('/dashboard');

  return (
    <div className="absolute right-0 top-full mt-3 z-50 w-[215px] rounded-2xl bg-[#161616]/95 backdrop-blur-xl border border-white/10 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none animate-[fadeIn_.18s_ease-out]">

      {/* ۱. سوییچر بین Dashboard و App برای ادمین */}
      {isAdmin && (
        <>
          <div className="px-2 pt-1 pb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {isInDashboard ? 'Quick Switch' : 'Admin Area'}
            </span>
          </div>

          <NavLink
            to={isInDashboard ? '/' : '/dashboard'}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${
                isActive && !isInDashboard
                  ? 'bg-spotify-green text-black font-bold'
                  : 'bg-white/[0.04] text-white hover:bg-spotify-green/15 hover:text-spotify-green border border-white/5'
              }`
            }
          >
            <div className="flex items-center gap-2">
              {isInDashboard ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-spotify-green">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2Zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2ZM9 10l12-3" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-spotify-green">
                  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
              )}
              <span className="text-xs font-bold">
                {isInDashboard ? 'Live Music App' : 'Dashboard'}
              </span>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </NavLink>

          <div className="h-px bg-white/5 my-1.5" />
        </>
      )}

      {/* ۲. گزینه‌های عمومی حساب کاربری */}
      <div className="flex flex-col gap-0.5">
        <NavLink
          to="/account"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isActive ? 'bg-white/15 text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`
          }
        >
          <span className="text-gray-400"><ProfileIcon /></span>
          <span>Account Profile</span>
        </NavLink>

        {/* لایبرری فقط در کلاینت موبایل */}
        {!isInDashboard && (
          <div className="sm:hidden block">
            <NavLink
              to="/library"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive ? 'bg-white/15 text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span className="text-gray-400"><LibraryIcon /></span>
              <span>Your Library</span>
            </NavLink>
          </div>
        )}
      </div>

      <div className="h-px bg-white/5 my-1.5" />

      {/* ۳. دکمه خروج */}
      <button
        type="button"
        onClick={() => {
          if (onClose) onClose();
          if (onLogoutClick) onLogoutClick();
        }}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-white hover:bg-red-500/15 transition-all cursor-pointer text-left"
      >
        <span className="text-red-400"><ExitIcon /></span>
        <span>Log out</span>
      </button>
    </div>
  );
}

export default ProfileMenu;