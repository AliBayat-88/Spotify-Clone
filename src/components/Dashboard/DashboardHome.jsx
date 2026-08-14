import StatCard from './StatCard.jsx'
import PopularSongs from './PopularSongs.jsx'

function DashboardHome() {

  const stats = {
    users: 1284,
    artists: 86,
    songs: 1542,
    playlists: 124,
  }

  return (
    <div className="p-5 sm:p-7 lg:p-8 text-white">

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


      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">

        <StatCard
          title="Total Users"
          value={stats.users}
          type="users"
          description="Registered users"
        />

        <StatCard
          title="Artists"
          value={stats.artists}
          type="artists"
          description="Published artists"
        />

        <StatCard
          title="Songs"
          value={stats.songs}
          type="songs"
          description="Available songs"
        />

        <StatCard
          title="Public Playlists"
          value={stats.playlists}
          type="playlists"
          description="Published playlists"
        />

      </div>


      <PopularSongs />

    </div>
  )
}

export default DashboardHome