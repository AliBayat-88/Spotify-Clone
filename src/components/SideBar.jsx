import PlayList from './PlayList.jsx'
import IntroducingBox from './IntroducingBox.jsx'
import { useNavigate } from 'react-router'
import { usePlaylists } from '../features/usePlaylists.js'
import { useAuth } from '../context/Auth.jsx'
import { useState } from 'react'

function SideBar({ onOpenModal }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const { playlists, isLoading } = usePlaylists();
  const { user } = useAuth();

  return (
    <aside
      className={`hidden shrink-0 lg:flex flex-col bg-[#171717] h-full rounded-xl text-white overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out select-none group ${
        isCollapsed ? 'w-[72px] p-2 items-center' : 'w-[28%] xl:w-[23%] p-4'
      }`}
    >
      {/* 🟢 هدر سایدبار */}
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


        {/* اکشن‌های هدر */}
        <div className="flex items-center gap-x-1 shrink-0">
          {/* 🟢 آیکون باز/بسته شدن: فقط در زمان هاور سایدبار نمایش داده می‌شود */}
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className={`${!isCollapsed  &&"invisible"} group-hover:visible transition-opacity duration-200 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#262626] cursor-pointer bg-transparent border-none outline-none flex items-center justify-center`}
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

          {/* دکمه ساخت پلی‌لیست */}
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

      {/* 🟢 آیتم ثابتی: Liked Songs */}
      <div
        onClick={() => navigate("/playList/likedSongs")}
        className={`p-2 hover:bg-[#262626] transition-colors rounded-xl flex items-center cursor-pointer w-full mb-1 ${
          isCollapsed ? 'justify-center' : 'justify-between'
        }`}
        title={isCollapsed ? "Liked Songs" : ""}
      >
        <div className="flex items-center gap-3 min-w-0">
          <img
            className="w-11 h-11 rounded-md shrink-0 object-cover"
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

      {/* 🟢 لیست پلی‌لیست‌های کاربر */}
      <div className="w-full flex flex-col gap-y-1 items-center">
        {user
          ? isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
              <PlayList key={index} isLoading isCollapsed={isCollapsed} />
            ))
            : playlists?.map((playlist) => (
              <PlayList
                key={playlist?.id}
                playlist={playlist}
                isCollapsed={isCollapsed}
              />
            ))
          : null}
      </div>

      {/* 🟢 باکس‌های پیشنهادی (فقط در حالت باز) */}
      {!isCollapsed && (
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