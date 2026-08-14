import { NavLink } from 'react-router-dom';

function AdminSidebar({ isOpen, onClose }) {
  const navigation = [
    {
      title: 'Overview',
      path: '/dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      )
    },
    {
      title: 'Songs',
      path: '/dashboard/songs',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18V5l11-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="17" cy="16" r="3" />
        </svg>
      )
    },
    {
      title: 'Artists',
      path: '/dashboard/artists',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
          <circle cx="12" cy="8" r="3.5" />
          <path strokeLinecap="round" d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" />
        </svg>
      )
    },
    {
      title: 'Public Playlists',
      path: '/dashboard/public-playlists',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
          <path strokeLinecap="round" d="M4 6h16M4 12h10M4 18h7" />
          <path strokeLinecap="round" d="M17 15v6m-3-3h6" />
        </svg>
      )
    },
    {
      title: 'Browse Sections',
      path: '/dashboard/browse-content',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path strokeLinecap="round" d="M3 9h18M9 9v11" />
        </svg>
      )
    },
  ];

  return (
    <>
      {/* Backdrop موبایل */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sidebar اصلی */}
      <aside
        className={`fixed lg:static left-0 top-[72px] bottom-0 z-50 lg:z-auto w-[260px] shrink-0 bg-[#121212] border-r border-[#262626] flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          <div className="px-5 pt-6 pb-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Management</p>
          </div>

          <nav className="px-3">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer
                    ${isActive ? 'bg-[#1ed760]/10 text-[#1ed760]' : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'}
                  `}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="truncate">{item.title}</span>
                </NavLink>
              ))}
            </div>
          </nav>
        </div>

        {/* دکمه خروج به برنامه موزیک */}
        <div className="p-3 border-t border-[#262626]">
          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
            <span>Back to App</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;