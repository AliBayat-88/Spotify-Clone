import { usePopularSongs } from '../../features/usePopularSongs.js'
import LoadingSpinner from '../LoadingSpinner.jsx'

function PopularSongs() {
  const {songs  , isLoading} = usePopularSongs()
  console.log(songs)
  


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

        {isLoading && <LoadingSpinner/>}

        {songs.map((song, index) => (

          <div
            key={song?.id}
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
                src={song?.cover_url}
                alt=""
                className="w-10 h-10 rounded-md object-cover shrink-0"
              />

              <div className="min-w-0">

                <p className="text-sm font-semibold text-white truncate">
                  {song?.name}
                </p>

                <p className="text-xs text-gray-500 truncate sm:hidden">
                  {song?.artists?.name}
                </p>

              </div>

            </div>


            <span className="hidden sm:block text-sm text-gray-400 truncate">
              {song?.artists?.name}
            </span>


            <span className="text-xs sm:text-sm text-gray-400 text-right">
              {song?.play_count.toLocaleString()}
            </span>

          </div>

        ))}

      </div>

    </div>
  )
}

export default PopularSongs