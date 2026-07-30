import PlayListActions from './PlayListActions.jsx'
import { useNavigate } from 'react-router-dom'

function PlayList({ playlist, isLoading, isCollapsed }) {
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className={`p-2 mt-0.5 rounded-xl flex items-center animate-pulse w-full ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex gap-3 items-center">
          <div className="w-11 h-11 rounded-md bg-[#2a2a2a] shrink-0" />

          {!isCollapsed && (
            <div className="flex flex-col gap-2">
              <div className="h-4 w-28 rounded bg-[#2a2a2a]" />
              <div className="h-3 w-20 rounded bg-[#222222]" />
            </div>
          )}
        </div>

        {!isCollapsed && <div className="w-5 h-5 rounded-full bg-[#2a2a2a]" />}
      </div>
    );
  }

  return (
    <div
      onClick={() => navigate(`playList/${playlist?.id}`)}
      className={`p-2 mt-0.5 hover:bg-[#262626] transition-colors rounded-xl flex items-center cursor-pointer w-full group/item ${
        isCollapsed ? 'justify-center' : 'justify-between'
      }`}
      title={isCollapsed ? playlist?.name : ""}
    >
      <div className="flex items-center gap-3 min-w-0">
        <img
          className="w-12 h-12 rounded-md shrink-0 object-cover"
          src={playlist?.cover_url || "/playlistImg.webp"}
          alt="playlist-logo"
        />

        {!isCollapsed && (
          <div className="flex flex-col justify-between gap-0.5 min-w-0 overflow-hidden">
            <h2 className="text-sm font-semibold truncate text-white">{playlist?.name}</h2>
            <span className="text-gray-400 text-xs truncate">
              Playlist • <span>Ali bayat</span>
            </span>
          </div>
        )}
      </div>

      {!isCollapsed && <PlayListActions playlist={playlist} />}
    </div>
  );
}

export default PlayList;