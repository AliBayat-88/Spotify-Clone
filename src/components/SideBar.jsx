import PlayList from './PlayList.jsx'
import FollowedArtist from './FollowedArtist.jsx'
import IntroducingBox from './IntroducingBox.jsx'
import { useNavigate } from 'react-router-dom'
import { usePlaylists } from '../features/usePlaylists.js'
import { useAuth } from '../context/Auth.jsx'
import { useState } from 'react'
import { useFollowArtist } from '../features/useFollowArtist.js'
import { useSavedPublicPlaylists } from '../features/useSavedPublicPlaylists.js'
import { useToggleSavePublicPlaylist } from '../features/useToggleSavePublicPlaylist.js'
import { useDeleteFollowArtist } from '../features/useDeleteFollowArtist.js'

function SideBar({ onOpenModal }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const { playlists, isLoading: isLoadingPlaylists } = usePlaylists();
  const { data: followedArtistsData, isLoading: isLoadingArtists } = useFollowArtist();
  const { savedPublicPlaylists, isLoading: isLoadingSavedPublic } = useSavedPublicPlaylists();
  const { unsavePublicPlaylist, isUnsaving } = useToggleSavePublicPlaylist();
  const { deleteFollowArtist , isDeleting } = useDeleteFollowArtist()
  const { user } = useAuth();

  const isLoading = isLoadingPlaylists || isLoadingArtists || isLoadingSavedPublic;

  return (
    <aside
      className={`hidden shrink-0 lg:flex flex-col bg-[#171717] h-full rounded-xl text-white overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out select-none group ${
        isCollapsed ? 'w-[72px] p-2 items-center' : 'w-[28%] xl:w-[23%] p-4'
      }`}
    >
      {/* هدر سایدبار */}
      <div
        className={`flex items-center mb-4 w-full h-10 ${
          isCollapsed ? 'justify-center' : 'justify-between'
        }`}
      >
        {!isCollapsed && (
          <span className="text-base font-semibold truncate text-white">
            Your library
          </span>
        )}

        <div className="flex items-center gap-x-1 shrink-0">
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className={`${!isCollapsed && "invisible"} group-hover:visible transition-opacity duration-200 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#262626] cursor-pointer bg-transparent border-none outline-none flex items-center justify-center`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className={`w-5 h-5 transition-transform duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5M4.5 4.5v15"
              />
            </svg>
          </button>

          {!isCollapsed && (
            <button
              onClick={onOpenModal}
              className="inline-flex justify-center items-center gap-1 px-3 py-1.5 rounded-xl bg-[#2b2b2b] hover:bg-[#383838] transition active:scale-95 text-xs font-semibold cursor-pointer"
            >
              <img className="w-3.5 h-3.5" src="/plus.svg" alt="create" />
              <span className="hidden xl:inline">create</span>
            </button>
          )}
        </div>
      </div>

      {/* آیتم ثابتی: Liked Songs */}
      <div
        onClick={() => navigate("/playList/likedSongs")}
        className={`p-2 hover:bg-[#262626] transition-colors rounded-xl flex items-center cursor-pointer w-full mb-0.5 ${
          isCollapsed ? 'justify-center' : 'justify-between'
        }`}
        title={isCollapsed ? "Liked Songs" : ""}
      >
        <div className="flex items-center gap-3 min-w-0">
          <img
            className="w-12 h-12 rounded-md shrink-0 object-cover"
            src="/liked%20songs.png"
            alt="liked-songs"
          />

          {!isCollapsed && (
            <div className="flex flex-col justify-center min-w-0 overflow-hidden">
              <h2 className="text-sm font-semibold truncate text-white">Liked songs</h2>
              <span className="text-gray-400 text-xs truncate">Playlist • 20 songs</span>
            </div>
          )}
        </div>
      </div>

      {/* لیست ترکیبی لایبرری */}
      <div className="w-full flex flex-col gap-y-0.5 items-center">
        {user ? (
          isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <PlayList key={index} isLoading isCollapsed={isCollapsed} />
            ))
          ) : (
            <>
              {/* ۱. رندر پلی‌لیست‌های شخصی */}
              {playlists?.map((playlist) => (
                <PlayList
                  key={`user-playlist-${playlist?.id}`}
                  playlist={playlist}
                  isCollapsed={isCollapsed}
                />
              ))}

              {/* ۲. رندر پلی‌لیست‌های عمومی ذخیره‌شده */}
              {savedPublicPlaylists?.map((item) => (
                <PlayList
                  key={`public-playlist-${item?.public_playlist_id || item?.id}`}
                  playlist={item?.public_playLists}
                  isPublic={true}
                  isCollapsed={isCollapsed}
                  item={item}
                  onUnsavePublic={unsavePublicPlaylist}
                  isUnsaving={isUnsaving} // 🟢 پاس دادن لودینگ حذف
                  user={user}
                />
              ))}

              {/* ۳. رندر خواننده‌های فالوشده */}
              {/* رندر خواننده‌های فالوشده */}
              {followedArtistsData?.map((artistData) => (
                <FollowedArtist
                  key={`artist-${artistData?.id}`}
                  artistData={artistData}
                  isCollapsed={isCollapsed}
                  onUnfollow={deleteFollowArtist}
                  isUnfollowing={isDeleting} // وضعیت لودینگ آن‌فالو از هوور/کوئری
                />
              ))}
            </>
          )
        ) : null}
      </div>

      {/* باکس‌های پیشنهادی (در صورت لاگین نبودن) */}
      {!isCollapsed && !user && (
        <div className="mt-4 flex flex-col gap-y-3 w-full">
          <IntroducingBox
            onClick={onOpenModal}
            header="Create your first playlist"
            description="It is easy, we will help you"
          />
          <IntroducingBox
            onClick={onOpenModal}
            header="Let's find some podcasts to follow"
            description="We will keep you updated on new episodes"
          />
        </div>
      )}
    </aside>
  );
}

export default SideBar;