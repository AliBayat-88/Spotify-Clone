import LikedIcon from './LikedIcon.jsx';
import MobilePlaylist from './MobilePlaylist.jsx';
import FollowedArtist from './FollowedArtist.jsx';
import IntroducingBox from './IntroducingBox.jsx';

import { useNavigate, useOutletContext } from 'react-router-dom';
import { usePlaylists } from '../features/usePlaylists.js';
import { useLikedSongs } from '../features/useLikedSongs.js';
import { useAuth } from '../context/Auth.jsx';
import { useFollowArtist } from '../features/useFollowArtist.js';
import { useSavedPublicPlaylists } from '../features/useSavedPublicPlaylists.js';
import { useToggleSavePublicPlaylist } from '../features/useToggleSavePublicPlaylist.js';
import { useDeleteFollowArtist } from '../features/useDeleteFollowArtist.js';

function LibraryMobile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // 🟢 دریافت تابع باز کردن مودال ساخت پلی‌لیست مستقیماً از AppLayout
  const { onOpenCreatePlaylist } = useOutletContext();

  const { playlists, isLoading: isLoadingPlaylists } = usePlaylists();
  const { data: likedSongs = [] } = useLikedSongs();
  const { data: followedArtistsData, isLoading: isLoadingArtists } = useFollowArtist();
  const { savedPublicPlaylists, isLoading: isLoadingSavedPublic } = useSavedPublicPlaylists();
  const { unsavePublicPlaylist, isUnsaving } = useToggleSavePublicPlaylist();
  const { deleteFollowArtist, isDeleting } = useDeleteFollowArtist();

  const isLoading = isLoadingPlaylists || isLoadingArtists || isLoadingSavedPublic;

  return (
    <div className="min-h-screen bg-black text-white pb-32 select-none">
      <div className="px-4 mt-4 flex flex-col">
        {/* هدر بخش لایبرری */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h1 className="text-xl font-bold tracking-tight">Your Library</h1>
        </div>

        {/* ۱. کارت Liked Songs */}
        {user && (
          <>
            <div
              onClick={() => navigate('/playList/likedSongs')}
              className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#262626]/50 active:bg-[#262626] transition-all duration-200 cursor-pointer active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#450af5] via-[#8c11f7] to-[#c411f7] shrink-0 flex items-center justify-center shadow-lg">
                  <LikedIcon />
                </div>

                <div className="flex flex-col gap-y-0.5 min-w-0">
                  <h2 className="text-base font-bold text-white tracking-tight">
                    Liked Songs
                  </h2>
                  <p className="text-[#1ed760] text-xs font-semibold flex items-center gap-1.5">
                    <span>Playlist</span>
                    <span className="w-1 h-1 bg-[#1ed760]/60 rounded-full inline-block"></span>
                    <span>{likedSongs?.length || 0} songs</span>
                  </p>
                </div>
              </div>

              <div className="text-gray-500 group-hover:text-white transition-colors p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>

            <div className="my-3 mx-2 border-t border-[#262626] opacity-60" />
          </>
        )}

        {/* ۲. لیست محتوا (کاربر لاگین‌شده) */}
        {user ? (
          <div className="flex flex-col gap-y-1">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <MobilePlaylist key={index} isLoading />
              ))
            ) : (
              <>
                {playlists?.map((playlist) => (
                  <MobilePlaylist
                    key={`user-playlist-${playlist?.id}`}
                    playlist={playlist}
                  />
                ))}

                {savedPublicPlaylists?.map((item) => (
                  <MobilePlaylist
                    key={`public-playlist-${item?.public_playlist_id || item?.id}`}
                    playlist={item?.public_playLists}
                    isPublic={true}
                    item={item}
                    onUnsavePublic={unsavePublicPlaylist}
                    isUnsaving={isUnsaving}
                    user={user}
                  />
                ))}

                {followedArtistsData?.map((artistData) => (
                  <FollowedArtist
                    key={`artist-${artistData?.id}`}
                    artistData={artistData}
                    onUnfollow={deleteFollowArtist}
                    isUnfollowing={isDeleting}
                    isLibrary={true}
                  />
                ))}
              </>
            )}
          </div>
        ) : (
          /* ۳. باکس‌های پیشنهادی (کاربر مهمان) */
          <div className="mt-2 flex flex-col gap-y-3 w-full">
            <IntroducingBox
              onClick={onOpenCreatePlaylist}
              header="Create your first playlist"
              description="It is easy, we will help you"
            />
            <IntroducingBox
              onClick={onOpenCreatePlaylist}
              header="Let's find some podcasts to follow"
              description="We will keep you updated on new episodes"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default LibraryMobile;