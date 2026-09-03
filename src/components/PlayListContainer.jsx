import { useState, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrackHero from './TrackHero.jsx';
import SongRow from './SongRow.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import EmptyPlaylist from './EmptyPlaylist.jsx';
import Menu from './Menu.jsx';
import Modal from './Modal.jsx';
import PlaylistFilters from './PlaylistFilters.jsx';
import { useGetPlaylistsSongs } from '../features/useGetPlaylistsSongs.js';
import { useLikedSongs } from '../features/useLikedSongs.js';
import { useDeletePlaylist } from '../features/useDeletePlaylist.js';
import { useOutsideClick } from '../hooks/useOutsideClick.js';
import PauseBtn from './PauseBtn.jsx';
import PlayButton from './PlayButton.jsx';
import { usePlayer } from '../context/PlayerContext.jsx';
import { useUpdatePlaylist } from '../features/useUpdatePlaylist.js';

function PlayListContainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false);
  const headerMenuRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const { playSong, isPlaying, togglePlay, currentSong } = usePlayer();
  const isLikedSongsPage = String(id) === 'likedSongs';

  const { playlistData, isLoading: isLoadingPlaylist } = useGetPlaylistsSongs(isLikedSongsPage ? null : id);
  const { data: likedSongs = [], isLoading: isLoadingLiked } = useLikedSongs();

  const { deletePlaylist } = useDeletePlaylist(() => navigate('/'));
  const { updatePlaylist, isUpdating } = useUpdatePlaylist(() => setIsModalEditOpen(false));

  useOutsideClick(headerMenuRef, isHeaderMenuOpen, () => setHeaderMenuOpen(false));

  const isLoading = isLikedSongsPage ? isLoadingLiked : isLoadingPlaylist;

  const rawSongs = isLikedSongsPage
    ? likedSongs.map((item) => (item?.songs ? { ...item.songs, added_at: item.created_at } : item))
    : playlistData?.playlists_songs?.map((item) => ({
    ...item.songs,
    added_at: item.created_at,
  })) || [];

  const processedSongs = useMemo(() => {
    if (!isLikedSongsPage) return rawSongs;

    let result = [...rawSongs];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) => s?.name?.toLowerCase().includes(q) || s?.artists?.name?.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'title') {
      result.sort((a, b) => (a?.name || '').localeCompare(b?.name || ''));
    } else if (sortBy === 'artist') {
      result.sort((a, b) => (a?.artists?.name || '').localeCompare(b?.artists?.name || ''));
    } else if (sortBy === 'recent') {
      result.sort((a, b) => new Date(b?.added_at || 0) - new Date(a?.added_at || 0));
    }

    return result;
  }, [rawSongs, searchQuery, sortBy, isLikedSongsPage]);

  if (isLoading) return <LoadingSpinner />;

  const pageTitle = isLikedSongsPage ? 'Liked Songs' : playlistData?.name;
  const pagePoster = isLikedSongsPage ? '/liked songs.png' : playlistData?.cover_url || '/playlistImg.webp';
  const isCurrentPlaylistPlaying = processedSongs.some((s) => s.id === currentSong?.id);

  function handlePlay() {
    if (processedSongs.length === 0) return;
    if (isCurrentPlaylistPlaying) {
      togglePlay();
    } else {
      playSong(processedSongs[0], processedSongs);
    }
  }

  function handleDeletePlaylist() {
    if (!id || isLikedSongsPage) return;
    deletePlaylist(id);
  }

  function handleUpdate(value, imageFile) {
    if (!value?.trim() || !playlistData) return;
    updatePlaylist({
      id: playlistData.id,
      obj: { name: value, cover_url: playlistData.cover_url },
      image: imageFile,
    });
  }

  return (
    <div className="w-full text-white bg-[#121212] rounded-xl overflow-hidden select-none relative min-h-full pb-20">
      <TrackHero
        type="Playlist"
        songName={pageTitle || 'Playlist'}
        singer={`Ali bayat • ${rawSongs?.length} songs`}
        songPoster={pagePoster}
        songs={rawSongs}
      />

      <div className="relative px-4 sm:px-8 py-6 flex flex-col gap-y-6 z-10">
        <div className="flex items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-x-3">
            <button
              type="button"
              onClick={handlePlay}
              className="p-3 sm:p-4 rounded-full bg-spotify-green hover:bg-spotify-green-hover hover:scale-105 active:scale-95 transition-all inline-flex justify-center items-center cursor-pointer shadow-[0_8px_20px_rgba(30,215,96,0.3)] text-black"
            >
              {isCurrentPlaylistPlaying && isPlaying ? (
                <PauseBtn className="w-6 h-6 text-black" color="#000000" />
              ) : (
                <PlayButton className="w-6 h-6 text-black translate-x-0.5" color="#000000" />
              )}
            </button>

            {isLikedSongsPage && (
              <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-spotify-green/10 border border-white/10 px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-spotify-green animate-pulse" />
                <span className="text-xs font-bold tracking-wide text-gray-200">
                  {rawSongs.length} Liked Tracks
                </span>
              </div>
            )}

            {!isLikedSongsPage && (
              <div ref={headerMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setHeaderMenuOpen(!isHeaderMenuOpen)}
                  className="text-gray-400 hover:text-white text-3xl font-bold tracking-widest bg-transparent border-none outline-none cursor-pointer p-2 transition-colors leading-none"
                >
                  ...
                </button>

                {isHeaderMenuOpen && (
                  <Menu
                    type="playlist_page"
                    position="left"
                    isOpen={isHeaderMenuOpen}
                    setOpen={setHeaderMenuOpen}
                    onDeletePlaylist={handleDeletePlaylist}
                    onEditPlaylist={() => setIsModalEditOpen(true)}
                  />
                )}
              </div>
            )}
          </div>

          {isLikedSongsPage && rawSongs.length > 0 && (
            <PlaylistFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          )}
        </div>

        <div className="hidden lg:grid grid-cols-[40px_minmax(0,4fr)_2fr_2fr_120px] items-center gap-x-4 px-3 pb-2 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-[#a7a7a7]">
          <span className="text-center">#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <div className="flex justify-end">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </div>

        <div className="flex lg:hidden items-center justify-between px-3 pb-2 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-[#a7a7a7]">
          <span>Title</span>
          <div className="flex items-center gap-x-2 pr-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          {processedSongs.length > 0 ? (
            processedSongs.map((song, index) => (
              <SongRow
                key={song?.id || index}
                type={!isLikedSongsPage ? 'playlist' : 'liked'}
                songsList={processedSongs}
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
            <EmptyPlaylist type="user" />
          )}
        </div>
      </div>

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