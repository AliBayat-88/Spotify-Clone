import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TrackHero from './TrackHero.jsx'
import SongRow from './SongRow.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'
import EmptyPlaylist from './EmptyPlaylist.jsx'
import Menu from './Menu.jsx'
import Modal from './Modal.jsx' // 🟢 ۱. ایمپورت کامپوننت مدال
import { useGetPlaylistsSongs } from '../features/useGetPlaylistsSongs.js'
import { useLikedSongs } from '../features/useLikedSongs.js'
import { useDeletePlaylist } from '../features/useDeletePlaylist.js'
import { useOutsideClick } from '../hooks/useOutsideClick.js'
import PauseBtn from './PauseBtn.jsx'
import PlayButton from './PlayButton.jsx'
import { usePlayer } from '../context/PlayerContext.jsx'
import { useUpdatePlaylist } from '../features/useUpdatePlaylist.js'

function PlayListContainer() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false);
  const headerMenuRef = useRef(null);

  const { playSong, isPlaying, togglePlay, currentSong } = usePlayer()
  const isLikedSongsPage = String(id) === "likedSongs"

  const { playlistData, isLoading: isLoadingPlaylist } = useGetPlaylistsSongs(isLikedSongsPage ? null : id)
  const { data: likedSongs = [], isLoading: isLoadingLiked } = useLikedSongs()

  const { deletePlaylist } = useDeletePlaylist(() => navigate('/'))
  const { updatePlaylist, isUpdating } = useUpdatePlaylist(() => setIsModalEditOpen(false));

  useOutsideClick(headerMenuRef, isHeaderMenuOpen, () => setHeaderMenuOpen(false))

  const isLoading = isLikedSongsPage ? isLoadingLiked : isLoadingPlaylist;

  if (isLoading) return <LoadingSpinner />

  const songs = isLikedSongsPage
    ? likedSongs.map(item => (item?.songs ? { ...item.songs, added_at: item.created_at } : item))
    : (playlistData?.playlists_songs?.map(item => ({
      ...item.songs,
      added_at: item.created_at
    })) || []);
  const pageTitle = isLikedSongsPage ? "Liked Songs" : playlistData?.name;
  const pagePoster = isLikedSongsPage ? "/liked songs.png" : (playlistData?.cover_url || "/playlistImg.webp");

  const isCurrentPlaylistPlaying = songs.some(s => s.id === currentSong?.id);

  function handlePlay() {
    if (songs.length === 0) return;

    if (isCurrentPlaylistPlaying) {
      togglePlay();
    } else {
      playSong(songs[0] , songs);
    }
  }

  function handleDeletePlaylist() {
    if (!id || isLikedSongsPage) return;
    deletePlaylist(id);
  }

  // 🟢 ۲. اصلاح استفاده از playlistData به جای playlist
  function handleUpdate(value, imageFile) {
    if (!value?.trim() || !playlistData) return;

    const obj = {
      name: value,
      cover_url: playlistData.cover_url
    };
    updatePlaylist({ id: playlistData.id, obj, image: imageFile });
  }

  return (
    <div className="text-white w-full child:p-4 sm:child:pb-16 lg:child:pb-24 relative">
      <TrackHero
        type="playlist"
        backColor={isLikedSongsPage ? "bg-purple-700" : "bg-green-400"}
        songName={pageTitle || "Playlist"}
        singer={`Ali bayat • ${songs?.length || 0} songs`}
        songPoster={pagePoster}
      />

      <div className="bg-[#171717]/70 min-h-[60vh] backdrop-blur-xl border-t border-white/10 rounded-t-2xl absolute sm:top-[230px] lg:top-[275px] w-full">

        {/* 🟢 اکشن‌بار بالای پلی‌لیست */}
        <div className="flex items-center gap-x-3 ">
          <button
            onClick={handlePlay}
            className="p-2.5 sm:p-3.5 rounded-full bg-green-500 hover:bg-green-600 hover:scale-105 active:scale-95 transition-all inline-flex justify-center items-center cursor-pointer shadow-lg"
          >
            {isCurrentPlaylistPlaying && isPlaying ? (
              <PauseBtn className="w-8 h-8 text-black" color="#000000" />
            ) : (
              <PlayButton className="w-8 h-8 text-black" color="#000000" />
            )}
          </button>

          {/* منوی سه نقطه */}
          { !isLikedSongsPage ? <div ref={headerMenuRef} className="relative mb-auto">
            <button
              onClick={() => setHeaderMenuOpen(!isHeaderMenuOpen)} // 🟢 ۳. اصلاح باز شدن Dropdown منو
              className="text-gray-400 hover:text-white text-3xl font-bold tracking-widest bg-transparent border-none outline-none cursor-pointer p-2 transition-colors"
            >
              ...
            </button>

            {isHeaderMenuOpen && (
              <Menu
                type="playlist_page"
                position="left"
                isOpen={isHeaderMenuOpen}
                setOpen={setHeaderMenuOpen}
                onDeletePlaylist={!isLikedSongsPage ? handleDeletePlaylist : undefined}
                onEditPlaylist={!isLikedSongsPage ? () => setIsModalEditOpen(true) : undefined} // 🟢 ۴. باز کردن مدال موقع کلیک روی گزینه ادیت
              />
            )}
          </div> : ""}
        </div>

        {/* جدول آهنگ‌ها (دسکتاپ) */}
        <div className="hidden lg:grid grid-cols-[40px_minmax(0,4fr)_2fr_2fr_120px] items-center gap-x-4 px-4 mt-4 pb-2 border-b border-white/10 text-sm text-gray-400 font-medium">
          <span className="text-center">#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <div className="flex justify-end">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </div>

        {/* هدر موبایل */}
        <div className="flex mt-4 lg:hidden items-center justify-between px-3 pb-1.5 mx-2 border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-gray-400">
          <span>Title</span>
          <div className="flex items-center gap-x-2 pr-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          </div>
        </div>

        {/* لیست آهنگ‌ها */}
        <div className="mt-4 lg:mt-2 px-2 mb-20">
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <SongRow
                key={song?.id || index}
                type={!isLikedSongsPage ? `playlist` : "liked"}
                songsList={songs}
                song={song}
                songName={song?.name}
                songPoster={song?.cover_url}
                playlistId={id}
                singer={song?.artists?.name}
                duration={song?.duration}
                index={index + 1}
              />
            ))
          ) : (
            <EmptyPlaylist/>
          )}
        </div>
      </div>

      {/* 🟢 ۵. رندر کردن کامپوننت مدال ادیت */}
      {isModalEditOpen && (
        <Modal
          isLoading={isUpdating}
          onClose={() => setIsModalEditOpen(false)}
          onConfirm={handleUpdate}
          playlist={playlistData}
          type="edit"
          isOpen={isModalEditOpen}
          btnText="Edit"
        />
      )}
    </div>
  );
}

export default PlayListContainer;