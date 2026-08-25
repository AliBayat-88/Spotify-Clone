import { useLocation, Link } from 'react-router-dom';
import AdminProfile from './AdminProfile.jsx';

const PAGE_TITLES = {
  '/dashboard': 'Overview',
  '/dashboard/songs': 'Songs Catalog',
  '/dashboard/artists': 'Artists Directory',
  '/dashboard/categories': 'Browse Categories',
  '/dashboard/public-playlists': 'Public Playlists',
  '/dashboard/browse-content': 'Browse Sections',
  '/dashboard/users': 'Users & Roles',
};

function AdminHeader({ onMenuClick }) {
  const { pathname } = useLocation();
  const currentTitle = PAGE_TITLES[pathname] || 'Dashboard';

  return (
    <header className="h-[70px] shrink-0 bg-[#0f0f0f]/90 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-4 sm:px-6 lg:px-8 relative z-40 select-none ">

      {/* 🟢 سمت چپ: دکمه موبایل + بردکرامب صفحه */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer shrink-0"
          aria-label="Open Sidebar"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* عنوان صفحه جاری */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold truncate">
          <span className="text-gray-500 hidden sm:inline">Admin</span>
          <span className="text-gray-600 hidden sm:inline">/</span>
          <h2 className="text-white font-extrabold tracking-tight truncate">
            {currentTitle}
          </h2>
        </div>
      </div>

      {/* 🟢 سمت راست: وضعیت سیستم + دکمه خروج به اپ + پروفایل */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">

        {/* ۱. نشان وضعیت اتصال سیستم */}
        <div className="hidden md:flex items-center gap-2 bg-black/40 border border-white/5 px-3 py-1.5 rounded-full shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1ed760] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1ed760]" />
          </span>
          <span className="text-[11px] font-bold text-gray-300 tracking-wide">
            Live Database
          </span>
        </div>

        {/* ۲. دکمه میانبر بازگشت به پلیر موزیک */}
        <Link
          to="/"
          className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer group"
          title="Open Spotify Client"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-3.5 h-3.5 text-[#1ed760] group-hover:scale-110 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
          <span className="hidden sm:inline">View App</span>
        </Link>

        <div className="h-5 w-px bg-white/10 hidden sm:block" />

        {/* ۳. کامپوننت پروفایل ادمین */}
        <AdminProfile />
      </div>

    </header>
  );
}

export default AdminHeader;