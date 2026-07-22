import Header from './Header.jsx';
import LikedIcon from './LikedIcon.jsx'
import { usePlaylists } from '../features/usePlaylists.js'
import MobilePlaylist from './MobilePlaylist.jsx'

function LibraryMobile() {
  const {playlists , isLoading} = usePlaylists()


  return (
    <div className="min-h-screen bg-black text-white pb-32 select-none">
      <Header />


      <div className="px-4 mt-4 flex flex-col">
        <h1 className="text-xl font-bold mb-4 tracking-tight px-1">Your Library</h1>
        <div
          className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#262626]/50 active:bg-[#262626] transition-all duration-200 cursor-pointer active:scale-[0.99]"
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#450af5] via-[#8c11f7] to-[#c411f7] shrink-0 flex items-center justify-center shadow-lg">
<LikedIcon/>
            </div>

            <div className="flex flex-col gap-y-0.5 min-w-0">
              <h2 className="text-base font-bold text-white tracking-tight">
                Liked Songs
              </h2>
              <p className="text-[#1ed760] text-xs font-semibold flex items-center gap-1.5">
                <span>Playlist</span>
                <span className="w-1 h-1 bg-[#1ed760]/60 rounded-full inline-block"></span>

                <span>54 songs</span>
              </p>
            </div>
          </div>

          <div className="text-gray-500 group-hover:text-white transition-colors p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>

        <div className="my-3 mx-2 border-t border-[#262626] opacity-60" />

        <div className="flex flex-col gap-y-1">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
              <MobilePlaylist key={index} isLoading />
            ))
            : playlists?.map((playlist) => (
              <MobilePlaylist
                key={playlist.id}
                playlist={playlist}
              />
            ))}
        </div>

      </div>
    </div>
  );
}

export default LibraryMobile;