function RecentActivity() {

  const activities = [
    {
      type: 'song',
      title: 'New song added',
      name: 'Midnight',
      time: '5 min ago',
    },
    {
      type: 'artist',
      title: 'New artist added',
      name: 'The Weeknd',
      time: '32 min ago',
    },
    {
      type: 'playlist',
      title: 'Playlist created',
      name: 'Chill Vibes',
      time: '1 hour ago',
    },
    {
      type: 'user',
      title: 'New user registered',
      name: 'Ali',
      time: '2 hours ago',
    },
  ]

  return (
    <div className="bg-spotify-surface border border-spotify-card rounded-2xl p-5 sm:p-6">

      <div className="mb-5">

        <h2 className="text-lg font-bold">
          Recent Activity
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          Latest changes on your platform
        </p>

      </div>


      <div className="flex flex-col">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="
              flex items-center gap-3
              py-3
              border-b border-white/5
              last:border-none
            "
          >

            <div
              className="
                w-9 h-9
                rounded-full
                bg-[#222]
                flex items-center justify-center
                text-spotify-green
                shrink-0
              "
            >
              <span className="text-xs font-bold">
                {activity.type === 'song'
                  ? '♫'
                  : activity.type === 'artist'
                    ? 'A'
                    : activity.type === 'playlist'
                      ? 'P'
                      : 'U'}
              </span>
            </div>


            <div className="min-w-0 flex-1">

              <p className="text-sm text-gray-300 truncate">
                {activity.title}
              </p>

              <p className="text-xs text-white font-medium truncate mt-0.5">
                {activity.name}
              </p>

            </div>


            <span className="text-[11px] text-gray-500 whitespace-nowrap">
              {activity.time}
            </span>

          </div>

        ))}

      </div>

    </div>
  )
}

export default RecentActivity