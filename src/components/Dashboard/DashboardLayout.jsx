import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader.jsx'
import AdminSidebar from './AdminSidebar.jsx'

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function toggleSidebar() {
    setIsSidebarOpen(prev => !prev)
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  return (
    <div className="h-screen bg-black text-white overflow-hidden">

      {/* Header */}
      <AdminHeader onMenuClick={toggleSidebar} />

      <div className="flex h-[calc(100vh-72px)]">

        {/* Desktop Sidebar */}
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        {/* Main Dashboard */}
        <main className="flex-1 min-w-0 overflow-y-auto bg-[#0b0b0b]">
          <div className="min-h-full p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  )
}

export default DashboardLayout