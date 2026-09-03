import PlusIcon from './icons/PlusIcon.jsx'

function SubMenu({ setSubOpen, isSubLeft, playlists, onOpenCreatePlaylist, onSelectPlaylist }) {
  return (
    <div
      onMouseLeave={() => setSubOpen(false)}
      onClick={(e) => e.stopPropagation()}
      className={`
        absolute left-0 top-full mt-1 md:top-0 md:mt-0 flex flex-col w-[200px] bg-[#1e1e1e] p-1.5 rounded-xl border border-[#2d3139] shadow-2xl gap-0.5 z-50 animate-[pop_0.15s_ease-out]
        ${!isSubLeft ? 'md:left-full md:mr-1' : 'md:-left-full md:ml-1'}
      `}
    >
      <div
        onClick={() => onOpenCreatePlaylist()}
        className="flex items-center gap-2.5 py-2 px-2.5 hover:bg-gray-600/40 text-xs text-spotify-green font-bold rounded-lg transition-colors border-b border-gray-700/40 mb-1 cursor-pointer"
      >
        <div className="border-spotify-green border-[1.5px] inline-flex p-0.5 rounded-full">
          <PlusIcon className="w-2.5 h-2.5" />
        </div>
        Create New Playlist
      </div>

      {/* 🟢 اضافه شدن key و ارسال playlist.id دقیق به تابع اصلی */}
      {playlists?.map((playlist) => (
        <div
          key={playlist?.id}
          onClick={() => onSelectPlaylist(playlist?.id)}
          className="flex items-center gap-2.5 py-2 px-2.5 hover:bg-gray-600/40 text-xs text-[#c9d1d9] hover:text-white rounded-lg transition-colors cursor-pointer"
        >
          <div className="w-5 h-5 bg-gray-700 rounded bg-[url('/playlistImg.webp')] bg-cover shrink-0"></div>
          <span className="truncate">{playlist?.name}</span>
        </div>
      ))}
    </div>
  );
}

export default SubMenu;