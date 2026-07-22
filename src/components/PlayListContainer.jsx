import TrackHero from './TrackHero.jsx'
import SongRow from './SongRow.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'
import { useGetPlaylistsSongs } from '../features/useGetPlaylistsSongs.js'
import { useParams } from 'react-router-dom'
import { useLikedSongs } from '../features/useLikedSongs.js'

function PlayListContainer() {
  const { id } = useParams()
  const isLikedSongsPage = String(id) === "likedSongs"

  const { playlistData, isLoading: isLoadingPlaylist } = useGetPlaylistsSongs(isLikedSongsPage ? null : id)

  const { data: likedSongs = [], isLoading: isLoadingLiked } = useLikedSongs()

  const isLoading = isLikedSongsPage ? isLoadingLiked : isLoadingPlaylist;

  if (isLoading) return <LoadingSpinner />

  // تعیین لیست آهنگ‌ها
  const songs = isLikedSongsPage
    ? likedSongs
    : (playlistData?.playlists_songs?.map(item => item.songs) || []);

  const pageTitle = isLikedSongsPage ? "Liked Songs" : playlistData?.name;
  const pagePoster = isLikedSongsPage ? "/liked songs.png" : (playlistData?.cover_url || "/liked songs.png");

  return (
    <div className="text-white w-full child:p-4 sm:child:pb-16 lg:child:pb-24 relative">
      <TrackHero
        type="playlist"
        backColor={isLikedSongsPage ? "bg-purple-700" : "bg-green-400"}
        songName={pageTitle || "Playlist"}
        singer={`Ali bayat • ${songs?.length || 0} songs`}
        songPoster={pagePoster}
      />

      <div className="bg-[#171717]/70 min-h-[60vh] backdrop-blur-xl border-t border-white/10 rounded-t-2xl absolute sm:top-[230px] lg:top-[275px] w-full">
        <button
          className="p-2.5 sm:p-3.5 rounded-full bg-green-500 hover:bg-green-600 inline-flex justify-center items-center">
          <img src="/play.svg" className="w-8 h-8" alt="play"/></button>

        <div className="hidden lg:grid grid-cols-[40px_minmax(0,4fr)_2fr_2fr_120px] items-center gap-x-4 px-4 mt-7 pb-2 border-b border-white/10 text-sm text-gray-400 font-medium">
          <span className="text-center">#</span>

          <span>Title</span>

          <span>Album</span>

          <span>Date added</span>

          <div className="flex justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>

        {/* هدر موبایل */}
        <div className="flex mt-7 lg:hidden items-center justify-between px-3 pb-1.5 mx-2 border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-gray-400">
          <span>Title</span>
          <div className="flex items-center gap-x-2 pr-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          </div>
        </div>

        <div className="mt-6 lg:mt-2 px-2 mb-20">
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <SongRow
                key={song?.id || index}
                type="playlist"
                song={song}
                songName={song?.name}
                songPoster={song?.cover_url}
                singer={song?.artists?.name}
                duration={song?.duration}
                index={index + 1}
              />
            ))
          ) : (
            <p className="text-gray-400 p-5 text-center">There is no song here.You can add some.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayListContainer;