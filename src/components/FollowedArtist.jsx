import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth.jsx';
import Modal from './Modal.jsx';

function FollowedArtist({ artistData, isCollapsed, onUnfollow, isUnfollowing, isLibrary = false }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  // استخراج اطلاعات خواننده
  const artist = artistData?.artists;
  const artistId = artist?.id || artistData?.artist_id;
  const artistName = artist?.name || "Unknown Artist";
  const artistImage = artist?.image_url || "/playlistImg.webp";

  function handleConfirmUnfollow() {
    if (!user || !artistId) return;

    if (onUnfollow) {
      onUnfollow({ userId: user.id, artistId });
    }
  }

  // 🟢 حالت ۱: استایل مخصوص لایبرری موبایل (کاملاً کارتی و هم‌سبک با MobilePlaylist)
  if (isLibrary) {
    return (
      <div
        onClick={() => navigate(`/artist/${artistId}`)}
        className="group relative bg-neutral-900 flex items-center justify-between p-2.5 rounded-xl hover:bg-[#262626]/50 active:bg-[#262626] transition-all duration-200 cursor-pointer active:scale-[0.99] my-0.5"
      >
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-[#262626] shadow-md border border-white/10">
            <img loading="lazy" className="w-full h-full object-cover" src={artistImage} alt={artistName} />
          </div>

          <div className="flex flex-col gap-y-0.5 min-w-0">
            <h2 className="text-base font-semibold text-white truncate tracking-tight">
              {artistName}
            </h2>
            <p className="text-gray-400 text-xs font-medium flex items-center gap-1.5">
              <span>Artist</span>
            </p>
          </div>
        </div>

        {/* دکمه آن‌فالو مستقیم بدون هوور */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalDeleteOpen(true);
          }}
          className="p-2 rounded-full text-gray-400 hover:text-red-500 active:scale-90 transition-all shrink-0 border-none bg-transparent outline-none cursor-pointer"
          title="Unfollow Artist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
        </button>

        <Modal
          isLoading={isUnfollowing}
          onClose={() => setIsModalDeleteOpen(false)}
          onConfirm={handleConfirmUnfollow}
          btnColor="bg-red-500 hover:bg-red-600"
          explanation={`Do you really want to UNFOLLOW ${artistName}?`}
          type="delete"
          isOpen={isModalDeleteOpen}
          btnText="Unfollow"
        />
      </div>
    );
  }

  // 🟢 حالت ۲: استایل اصلی دسکتاپ/سایدبار (بدون دستکاری و ۱۰۰٪ همان کد اولیه)
  return (
    <div
      onClick={() => navigate(`/artist/${artistId}`)}
      className={`p-2 mt-0.5 hover:bg-[#262626] transition-colors rounded-xl flex items-center cursor-pointer w-full group/item ${
        isCollapsed ? 'justify-center' : 'justify-between'
      }`}
      title={isCollapsed ? artistName : ""}
    >
      <div className="flex items-center gap-3 min-w-0">
        <img
          loading="lazy"
          className="w-12 h-12 rounded-full shrink-0 object-cover border border-white/5"
          src={artistImage}
          alt={artistName}
        />

        {!isCollapsed && (
          <div className="flex flex-col justify-between gap-0.5 min-w-0 overflow-hidden">
            <h2 className="text-sm font-semibold truncate text-white">{artistName}</h2>
            <span className="text-gray-400 text-xs truncate">
              Artist
            </span>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalDeleteOpen(true);
          }}
          className="opacity-0 group-hover/item:opacity-100 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-white/10 active:scale-90 transition-all shrink-0 border-none bg-transparent outline-none cursor-pointer"
          title="Unfollow Artist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
        </button>
      )}

      <Modal
        isLoading={isUnfollowing}
        onClose={() => setIsModalDeleteOpen(false)}
        onConfirm={handleConfirmUnfollow}
        btnColor="bg-red-500 hover:bg-red-600"
        explanation={`Do you really want to UNFOLLOW ${artistName}?`}
        type="delete"
        isOpen={isModalDeleteOpen}
        btnText="Unfollow"
      />
    </div>
  );
}

export default React.memo(FollowedArtist);