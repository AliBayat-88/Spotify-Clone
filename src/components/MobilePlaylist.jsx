import PlayListActions from './PlayListActions.jsx'
import { useNavigate } from 'react-router-dom'

function MobilePlaylist({playlist , isLoading}) {
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="p-3 mt-0.5 rounded-2xl flex items-center justify-between animate-pulse">
        <div className="flex gap-3 items-center">
          <div className="w-11 h-11 rounded-sm bg-[#2a2a2a]" />

          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded bg-[#2a2a2a]" />
            <div className="h-3 w-24 rounded bg-[#222222]" />
          </div>
        </div>

        <div className="w-5 h-5 rounded-full bg-[#2a2a2a]" />
      </div>
    );
  }

  return (
    <div
      className="group relative bg-neutral-900 flex items-center justify-between p-2.5 rounded-xl hover:bg-[#262626]/50 active:bg-[#262626] transition-all duration-200 cursor-pointer active:scale-[0.99]"
    >
      <div onClick={() => navigate(`/playList/${playlist?.id}`)} className="flex items-center gap-3.5 min-w-0 flex-1">
        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#262626] shadow-md">
          <img className="w-full h-full object-cover" src={playlist.cover_url || "/playlistImg.webp"} alt={playlist.name}/>
        </div>

        <div className="flex flex-col gap-y-0.5 min-w-0">
          <h2 className="text-base font-semibold text-white truncate tracking-tight">
            {playlist.name}
          </h2>
          <p className="text-gray-400 text-xs font-medium flex items-center gap-1.5">
            <span>playlist</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full inline-block"></span>
            <span className="truncate text-gray-400/90">Ali Bayat</span>
          </p>
        </div>
      </div>
      <div>

        <PlayListActions playlist={playlist} />
      </div>
    </div>
  );
}

export default MobilePlaylist;
