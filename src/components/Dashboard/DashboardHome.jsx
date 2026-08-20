import StatCard from './StatCard.jsx';
import PopularSongs from './PopularSongs.jsx';
import { useDashboardStats } from '../../features/useDashboardStats.js'

function DashboardHome() {
  const { stats, isLoading } = useDashboardStats();
  console.log(stats);

  return (
    <div className="p-5 sm:p-7 lg:p-8 text-white select-none ">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-gray-400 font-medium mb-1">
          Dashboard
        </p>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Overview
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Here&#39;s what&#39;s happening with your music platform.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard
          title="Total Users"
          value={isLoading ? '...' : stats.users.toLocaleString()}
          type="users"
          description="Registered users"
        />

        <StatCard
          title="Artists"
          value={isLoading ? '...' : stats.artists.toLocaleString()}
          type="artists"
          description="Published artists"
        />

        <StatCard
          title="Songs"
          value={isLoading ? '...' : stats.songs.toLocaleString()}
          type="songs"
          description="Available songs"
        />

        <StatCard
          title="Public Playlists"
          value={isLoading ? '...' : stats.playlists.toLocaleString()}
          type="playlists"
          description="Published playlists"
        />
      </div>

      <PopularSongs />
    </div>
  );
}

export default DashboardHome;