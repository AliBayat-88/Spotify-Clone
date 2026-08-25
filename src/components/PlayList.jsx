import PlayListActions from './PlayListActions.jsx'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal.jsx'
import { useState } from 'react'

function PlayList({ playlist, isLoading, isCollapsed, isPublic = false, item, user, onUnsavePublic, isUnsaving }) {
  const navigate = useNavigate()
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

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

  const handleNavigate = () => {
    if (isPublic) {
      navigate(`/public-playlist/${playlist?.id}`);
    } else {
      navigate(`/playList/${playlist?.id}`);
    }
  };

  function handleUnsave() {
    if (item?.public_playLists?.id) {
      onUnsavePublic({ user_id: user?.id, public_playlist_id: item?.public_playLists?.id },
      );
    }
  }

  return (
    <div
      onClick={handleNavigate}
      className={`p-2 mt-0.5 hover:bg-[#262626] transition-colors rounded-xl flex items-center cursor-pointer w-full group/item ${
        isCollapsed ? 'justify-center' : 'justify-between'
      }`}
      title={isCollapsed ? (playlist?.name || playlist?.title) : ""}
    >
      <div className="flex items-center gap-3 min-w-0">
        <img
          loading="lazy"
          className="w-12 h-12 rounded-md shrink-0 object-cover"
          src={playlist?.cover_url || "/playlistImg.webp"}
          alt="playlist-logo"
        />

        {!isCollapsed && (
          <div className="flex flex-col justify-between gap-0.5 min-w-0 overflow-hidden">
            <h2 className="text-sm font-semibold truncate text-white">
              {playlist?.name || playlist?.title}
            </h2>
            <span className="text-gray-400 text-xs truncate">
              {isPublic ? "Public Playlist" : "Playlist"}
            </span>
          </div>
        )}
      </div>

      {/* 🟢 دکمه حذف برای پابلیک پلی‌لیست‌ها */}
      {!isCollapsed && isPublic && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // جلوگیری از نویگیت شدن موقع کلیک روی حذف
            setIsModalDeleteOpen(true);
          }}
          className="opacity-0 group-hover/item:opacity-100 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-white/10 active:scale-90 transition-all shrink-0 border-none bg-transparent outline-none cursor-pointer"
          title="Remove from Library"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      )}

      <Modal
        isLoading={isUnsaving} // 🟢 پاس دادن وضعیت لودینگ صحیح
        onClose={() => setIsModalDeleteOpen(false)}
        onConfirm={handleUnsave}
        btnColor="bg-red-500 hover:bg-red-600"
        explanation={`Do you really want to DELETE ${item?.public_playLists?.title} ?`}
        type="delete"
        isOpen={isModalDeleteOpen}
        btnText="Delete"
      />

      {!isCollapsed && !isPublic && <PlayListActions playlist={playlist} />}
    </div>
  );
}

export default PlayList;