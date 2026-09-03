import { useState, useMemo } from 'react';
import DashboardTable from './DashboardTable.jsx';
import EditUserRoleModal from './EditUserRoleModal.jsx';
import { useUsers } from '../../features/useUsersManager.js';
import { formatDaysAgo } from '../../utils/helpers.js';

function DashboardUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  const { users = [], isLoading } = useUsers();

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const nameMatch =
        u.display_name?.toLowerCase().includes(searchQuery.toLowerCase())

      const roleMatch =
        roleFilter === 'all' ? true : (u.role || 'user') === roleFilter;

      return nameMatch && roleMatch;
    });
  }, [users, searchQuery, roleFilter]);

  const totalUsersCount = users.length;
  const adminCount = users.filter((u) => u.role === 'admin').length;
  const regularCount = totalUsersCount - adminCount;

  const tableColumns = [
    'User',
    'Assigned Role',
    'Joined Date',
    { label: 'Permissions', align: 'right' },
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-y-7 select-none">

      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Users & Roles
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage user accounts, assign admin privileges, and audit platform access.
          </p>
        </div>
      </div>

      {/* ۱. کارت‌های آماری سریع */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-spotify-surface border border-spotify-card rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Accounts</span>
          <p className="text-3xl font-black text-white mt-2">{totalUsersCount}</p>
          <div className="absolute right-4 top-5 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Z" />
            </svg>
          </div>
        </div>

        <div className="bg-spotify-surface border border-spotify-card rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <span className="text-xs font-bold text-spotify-green uppercase tracking-wider">Platform Admins</span>
          <p className="text-3xl font-black text-white mt-2">{adminCount}</p>
          <div className="absolute right-4 top-5 w-10 h-10 rounded-full bg-spotify-green/10 text-spotify-green flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </div>
        </div>

        <div className="bg-spotify-surface border border-spotify-card rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Standard Listeners</span>
          <p className="text-3xl font-black text-white mt-2">{regularCount}</p>
          <div className="absolute right-4 top-5 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* ۲. تولبار فیلتر و جستجو */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
        {/* تب‌های فیلتر نقش */}
        <div className="flex items-center bg-spotify-surface border border-spotify-card p-1 rounded-xl self-start">
          {[
            { id: 'all', label: 'All' },
            { id: 'admin', label: 'Admins' },
            { id: 'user', label: 'Users' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setRoleFilter(tab.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                roleFilter === tab.id
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* باکس جستجو */}
        <div className="relative w-full sm:w-72">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search username or ID..."
            className="w-full bg-spotify-surface text-white pl-10 pr-4 py-2 rounded-xl border border-spotify-card focus:border-white focus:ring-1 focus:ring-white outline-none text-xs font-medium placeholder-gray-600 transition-all"
          />
        </div>
      </div>

      {/* ۳. جدول نمایش کاربران */}
      <DashboardTable
        title="Registered Users"
        columns={tableColumns}
        data={filteredUsers}
        isLoading={isLoading}
        renderRow={(user) => {
          const isAdmin = user.role === 'admin';
          return (
            <tr
              key={user.id}
              className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      loading="lazy"
                      src={user.avatar_url || '/profileImg.png'}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover bg-black border border-white/10 shrink-0"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/profileImg.png';
                      }}
                    />
                    {isAdmin && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-spotify-green border-2 border-spotify-surface rounded-full shadow" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate max-w-[200px]">
                      {user.display_name || 'Anonymous User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[220px]">
                      {user.id}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                    isAdmin
                      ? 'bg-spotify-green/10 text-spotify-green border-spotify-green/30 shadow-[0_0_10px_rgba(30,215,96,0.15)]'
                      : 'bg-white/5 text-gray-300 border-white/10'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isAdmin ? 'bg-spotify-green' : 'bg-gray-400'}`} />
                  {isAdmin ? 'ADMINISTRATOR' : 'USER'}
                </span>
              </td>

              <td className="px-5 py-4 text-sm text-gray-400 font-medium">
                {user.created_at ? formatDaysAgo(user.created_at) : '—'}
              </td>

              <td className="px-5 py-4 text-right">
                <button
                  type="button"
                  onClick={() => setSelectedUser(user)}
                  className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-bold text-gray-200 hover:text-white transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3.5 h-3.5 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  Edit Role
                </button>
              </td>
            </tr>
          );
        }}
      />

      {/* مودال ویرایش نقش */}
      {selectedUser && (
        <EditUserRoleModal
          isOpen={Boolean(selectedUser)}
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default DashboardUsers;