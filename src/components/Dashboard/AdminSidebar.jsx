import { NavLink } from 'react-router-dom';

function AdminSidebar({ isOpen, onClose }) {
  const navigationGroups = [
    {
      group: 'General',
      items: [
        {
          title: 'Overview',
          path: '/dashboard',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          ),
        },
      ],
    },
    {
      group: 'Catalog & Content',
      items: [
        {
          title: 'Songs',
          path: '/dashboard/songs',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18V5l11-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="17" cy="16" r="3" />
            </svg>
          ),
        },
        {
          title: 'Artists',
          path: '/dashboard/artists',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
              <circle cx="12" cy="8" r="3.5" />
              <path strokeLinecap="round" d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" />
            </svg>
          ),
        },
        {
          title: 'Categories',
          path: '/dashboard/categories',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
          ),
        },
        {
          title: 'Public Playlists',
          path: '/dashboard/public-playlists',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h10.5m-10.5 5.25h6.75" />
              <circle cx="17.5" cy="15.5" r="2.5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 15.5V10l2.5 1" />
            </svg>
          ),
        },
        {
          title: 'Browse Sections',
          path: '/dashboard/browse-content',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path strokeLinecap="round" d="M3 9h18M9 9v11" />
            </svg>
          ),
        },
      ],
    },
    {
      group: 'Administration',
      items: [
        {
          title: 'Users & Roles',
          path: '/dashboard/users',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/75 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 z-50 lg:z-auto w-[265px] h-screen shrink-0 bg-spotify-base border-r border-spotify-card flex flex-col justify-between select-none transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="py-6">
          <div className="px-6 mb-7 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-spotify-green flex items-center justify-center text-black font-black text-sm shadow-[0_0_15px_rgba(30,215,96,0.35)]">
              SP
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold tracking-tight text-sm leading-tight">
                Spotify Admin
              </span>
              <span className="text-[11px] text-gray-500 font-medium">Management Panel</span>
            </div>
          </div>

          <nav className="px-3.5 flex flex-col gap-y-6">
            {navigationGroups.map((group, groupIdx) => (
              <div key={group.group}>
                <div className="px-3 pb-2 flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                    {group.group}
                  </p>
                  {groupIdx > 0 && <span className="h-px bg-white/5 flex-1 ml-3" />}
                </div>

                <div className="flex flex-col gap-y-1">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === '/dashboard'}
                      onClick={onClose}
                      className={({ isActive }) => `
                        group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer
                        ${
                        isActive
                          ? 'bg-spotify-green/10 text-spotify-green shadow-[inset_0_0_12px_rgba(30,215,96,0.08)]'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                      }
                      `}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-spotify-green rounded-r-full shadow-[0_0_8px_#1ed760]" />
                          )}
                          <span
                            className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                              isActive ? 'text-spotify-green' : 'text-gray-400 group-hover:text-white'
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span className="truncate">{item.title}</span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="p-3.5 border-t border-[#222222] bg-[#101010]/80">
          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:-translate-x-0.5 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-6-6 6-6" />
              </svg>
              <span>Back to App</span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono">Esc</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;