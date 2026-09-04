import React, { useState, useMemo } from 'react';
import ModalLayout from './ModalLayout.jsx';
import LoadingSpinner from '../LoadingSpinner.jsx';
import { useSongs } from '../../features/useSongs.js';
import { useArtists } from '../../features/useArtists.js';
import { useSectionItems, useToggleSectionItem } from '../../features/useSectionItems.js';

function ManageSectionItemsModal({ isOpen, onClose, section }) {
  const [searchQuery, setSearchQuery] = useState('');

  const { songs = [], isLoading: isLoadingSongs } = useSongs();
  const { artists = [], isLoading: isLoadingArtists } = useArtists();

  const { sectionItems = [], isLoading: isLoadingItems } = useSectionItems(section?.id);
  const { addItem, removeItem, isProcessing } = useToggleSectionItem(section?.id);

  const isSongType = section?.type === 'song';
  const isArtistType = section?.type === 'artist';
  const isLoading = isLoadingItems || (isSongType ? isLoadingSongs : isLoadingArtists);

  const attachedMap = useMemo(() => {
    const map = new Map();
    sectionItems.forEach((item) => {
      const targetId = isSongType ? item.song_id : item.artist_id;
      if (targetId) map.set(Number(targetId), item.id);
    });
    return map;
  }, [sectionItems, isSongType]);

  const availableList = useMemo(() => {
    const baseList = isSongType ? songs : artists;
    if (!searchQuery.trim()) return baseList;

    const q = searchQuery.toLowerCase();
    return baseList.filter((item) => item.name?.toLowerCase().includes(q));
  }, [isSongType, songs, artists, searchQuery]);

  function handleToggle(entityId) {
    if (isProcessing) return;

    const numericId = Number(entityId);
    const existingSectionItemId = attachedMap.get(numericId);

    if (existingSectionItemId) {
      removeItem(existingSectionItemId);
    } else {
      addItem({
        sectionId: section.id,
        songId: isSongType ? numericId : null,
        artistId: isArtistType ? numericId : null,
      });
    }
  }

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage ${section?.title || ''} (${section?.type?.toUpperCase() || ''}S)`}
      maxWidth="max-w-xl"
    >
      <div className="flex flex-col gap-y-4 font-sans text-white select-none">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${isSongType ? 'tracks or artists' : 'artists'}...`}
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
            <div className="py-12 flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : availableList.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-8">
              No {isSongType ? 'tracks' : 'artists'} found.
            </p>
          ) : (
            availableList.map((item) => {
              const isAttached = attachedMap.has(Number(item.id));
              const poster = isSongType
                ? item.cover_url
                : item.image_url || item.image || '/profileImg.png';

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-spotify-surface hover:bg-spotify-card transition border border-transparent hover:border-white/5"
                >
                  <div className="flex items-center gap-x-3 min-w-0 pr-2">
                    <img
                      loading="lazy"
                      src={poster}
                      alt={item.name}
                      className={`w-10 h-10 object-cover shrink-0 bg-black shadow-sm ${
                        isSongType ? 'rounded-md' : 'rounded-full'
                      }`}
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold truncate text-white">
                        {item.name}
                      </span>
                      <span className="text-xs text-spotify-subtext truncate">
                        {isSongType ? item.artists?.name || 'Unknown Artist' : 'Artist'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleToggle(item.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 flex items-center gap-1.5 active:scale-95 disabled:opacity-50 ${
                      isAttached
                        ? 'bg-spotify-green text-black hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 border border-transparent group'
                        : 'bg-white text-black hover:scale-105'
                    }`}
                  >
                    {isAttached ? (
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
                      <span>+ Add</span>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-spotify-subtext">
          <span>{attachedMap.size} items selected</span>
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

export default ManageSectionItemsModal;