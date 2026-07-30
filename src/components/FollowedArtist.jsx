import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth.jsx';
import Modal from './Modal.jsx';

function FollowedArtist({ artistData, isCollapsed, onUnfollow, isUnfollowing }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  // استخراج اطلاعات خواننده از داده‌های تو در تو
  const artist = artistData?.artists;
  const artistId = artist?.id || artistData?.artist_id;
  const artistName = artist?.name || "Unknown Artist";
  const artistImage = artist?.image_url || "/playlistImg.webp";

  function handleConfirmUnfollow() {
    if (!user || !artistId) return;

    if (onUnfollow) {
      onUnfollow(
        { userId: user.id, artistId },
      );
    }
  }

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

      {/* دکمه آن‌فالو اختصاصی در زمان هوور (باز کردن مودال) */}
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

      {/* مودال تایید آن‌فالو */}
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