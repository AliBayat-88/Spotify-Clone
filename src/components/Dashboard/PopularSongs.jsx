function PopularSongs() {

  const songs = [
    {
      id: 1,
      name: 'Blinding Lights',
      artist: 'The Weeknd',
      plays: 12450,
      cover: '/profileImg.png',
    },
    {
      id: 2,
      name: 'Starboy',
      artist: 'The Weeknd',
      plays: 10820,
      cover: '/profileImg.png',
    },
    {
      id: 3,
      name: 'Save Your Tears',
      artist: 'The Weeknd',
      plays: 9420,
      cover: '/profileImg.png',
    },
    {
      id: 4,
      name: 'One Dance',
      artist: 'Drake',
      plays: 8170,
      cover: '/profileImg.png',
    },
    {
      id: 5,
      name: 'As It Was',
      artist: 'Harry Styles',
      plays: 7630,
      cover: '/profileImg.png',
    },
  ]

  return (
    <div className="bg-[#181818] border border-[#262626] rounded-2xl overflow-hidden">

      <div className="p-5 sm:p-6 border-b border-white/5">

        <h2 className="text-lg font-bold">
          Popular Songs
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          Most played songs on the platform
        </p>

      </div>


      {/* Desktop Header */}

      <div
        className="
          hidden sm:grid
          grid-cols-[40px_1fr_180px_120px]
          items-center
          px-5 py-3
          text-[11px]
          uppercase
          tracking-wider
          text-gray-500
          border-b border-white/5
        "
      >
        <span>#</span>
        <span>Song</span>
        <span>Artist</span>
        <span className="text-right">Plays</span>
      </div>


      <div>

        {songs.map((song, index) => (

          <div
            key={song.id}
            className="
              grid
              grid-cols-[40px_1fr_auto]
              sm:grid-cols-[40px_1fr_180px_120px]
              items-center
              gap-3
              px-5
              py-3
              hover:bg-white/5
              transition-colors
            "
          >

            <span className="text-xs text-gray-500">
              {index + 1}
            </span>


            <div className="flex items-center gap-3 min-w-0">

              <img
                src={song.cover}
                alt=""
                className="w-10 h-10 rounded-md object-cover shrink-0"
              />

              <div className="min-w-0">

                <p className="text-sm font-semibold text-white truncate">
                  {song.name}
                </p>

                <p className="text-xs text-gray-500 truncate sm:hidden">
                  {song.artist}
                </p>

              </div>

            </div>


            <span className="hidden sm:block text-sm text-gray-400 truncate">
              {song.artist}
            </span>


            <span className="text-xs sm:text-sm text-gray-400 text-right">
              {song.plays.toLocaleString()}
            </span>

          </div>

        ))}

      </div>

    </div>
  )
}

export default PopularSongs