import React, { useState, useMemo, useEffect } from 'react';
import ModalLayout from '../Dashboard/ModalLayout.jsx';
import { useSongs } from '../../features/useSongs.js';
import { usePublicPlaylistSongs } from '../../features/usePublicPlaylistSongs.js';
import { useManagePublicPlaylistSongs } from '../../features/useManagePublicPlaylistSongs.js';
import LoadingSpinner from '../LoadingSpinner.jsx';

function AddSongsToPublicPlaylistModal({ isOpen, onClose, playlistId }) {
  const [search, setSearch] = useState('');

  const { songs = [], isLoading: isLoadingAllSongs } = useSongs();

  const { publicPlaylistSongs, isLoading: isLoadingPlaylistSongs } = usePublicPlaylistSongs(playlistId);
  const { addSong, removeSong } = useManagePublicPlaylistSongs(playlistId);

  const [assignedIds, setAssignedIds] = useState(new Set());

  useEffect(() => {
    if (publicPlaylistSongs) {
      const items =
        publicPlaylistSongs?.section_items?.map((item) => item.songs?.id || item.song_id) ||
        publicPlaylistSongs?.songs?.map((s) => s.id) ||
        [];
      setAssignedIds(new Set(items.map(Number)));
    }
  }, [publicPlaylistSongs]);

  const filteredSongs = useMemo(() => {
    if (!search.trim()) return songs;
    const q = search.toLowerCase();
    return songs.filter(
      (s) => s.name?.toLowerCase().includes(q) || s.artists?.name?.toLowerCase().includes(q)
    );
  }, [songs, search]);

  function handleToggleSong(songId) {
    const numericId = Number(songId);
    const isAlreadyIn = assignedIds.has(numericId);

    setAssignedIds((prev) => {
      const next = new Set(prev);
      if (isAlreadyIn) {
        next.delete(numericId);
      } else {
        next.add(numericId);
      }
      return next;
    });

    if (isAlreadyIn) {
      removeSong({ playlistId, songId: numericId });
    } else {
      addSong({ playlistId, songId: numericId });
    }
  }

  const isLoading = isLoadingAllSongs || isLoadingPlaylistSongs;

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Manage Playlist Tracks">
      <div className="flex flex-col gap-y-4 text-white select-none">

        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tracks or artists..."
            className="w-full bg-black text-white pl-10 pr-4 py-2.5 rounded-xl border border-[#282828] focus:border-white outline-none text-sm transition-colors placeholder:text-gray-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>

        <div className="max-h-80 overflow-y-auto flex flex-col gap-y-2 pr-1 scrollbar-hide">
          {isLoading ? (
            <div className="py-12 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : filteredSongs.length > 0 ? (
            filteredSongs.map((song) => {
              const isAdded = assignedIds.has(Number(song.id));

              return (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-spotify-surface hover:bg-spotify-card transition border border-transparent hover:border-white/5"
                >
                  <div className="flex items-center gap-x-3 min-w-0 pr-2">
                    <img
                      src={song.cover_url || '/default-cover.png'}
                      alt=""
                      className="w-10 h-10 rounded-md object-cover shrink-0 bg-black"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold truncate text-white">
                        {song.name}
                      </span>
                      <span className="text-xs text-spotify-subtext truncate">
                        {song.artists?.name || 'Unknown Artist'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleSong(song.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 flex items-center gap-1.5 active:scale-95 ${
                      isAdded
                        ? 'bg-spotify-green text-black hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 border border-transparent group'
                        : 'bg-white text-black hover:scale-105'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3.5 h-3.5 group-hover:hidden"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                          stroke="currentColor"
                          className="w-3.5 h-3.5 hidden group-hover:inline"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        <span className="group-hover:hidden">Added</span>
                        <span className="hidden group-hover:inline">Remove</span>
                      </>
                    ) : (
                      <>
                        <span>+ Add</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-center text-sm text-gray-500 py-8">No tracks found.</p>
          )}
        </div>

        <div className="flex justify-end pt-3 border-t border-white/5">
        <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-white text-black font-bold text-xs hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}

export default AddSongsToPublicPlaylistModal;