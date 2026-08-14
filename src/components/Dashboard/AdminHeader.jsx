import AdminLogo from './AdminLogo.jsx'
import AdminSearch from './AdminSearch.jsx'
import AdminNotifications from './AdminNotifications.jsx'
import AdminProfile from './AdminProfile.jsx'

function AdminHeader({onMenuClick}) {
  return (
    <header className="h-[72px] shrink-0 bg-[#0b0b0b] border-b border-white/[0.06] flex items-center px-4 sm:px-6 lg:px-8 relative z-40">

      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="flex items-center shrink-0 px-4">
        <AdminLogo />
      </div>

      {/* Center */}
      <div className="flex-1 flex justify-center  sm:px-8">
        <AdminSearch />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <AdminNotifications />
        <AdminProfile />
      </div>

    </header>
  )
}

export default AdminHeader