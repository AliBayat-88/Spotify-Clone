import { useState, useMemo } from 'react';
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
      if (targetId) map.set(targetId, item.id);
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

    const existingSectionItemId = attachedMap.get(entityId);

    if (existingSectionItemId) {
      removeItem(existingSectionItemId);
    } else {
      addItem({
        sectionId: section.id,
        songId: isSongType ? entityId : null,
        artistId: isArtistType ? entityId : null,
      });
    }
  }

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage ${section?.title} (${section?.type?.toUpperCase()}S)`}
      maxWidth="max-w-xl"
    >
      <div className="flex flex-col gap-y-4 max-h-[70vh]">

        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${isSongType ? 'songs' : 'artists'} to add...`}
            className="w-full bg-black text-white pl-10 pr-4 py-2.5 rounded-xl border border-[#282828] focus:border-white focus:ring-1 focus:ring-white outline-none text-xs font-medium"
          />
        </div>

        <div className="overflow-y-auto pr-1 flex flex-col gap-y-1.5 min-h-[250px] max-h-[360px]">
          {isLoading ? (
            <div className="py-12 flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : availableList.length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-500">
              No items match your search.
            </div>
          ) : (
            availableList.map((item) => {
              const isAttached = attachedMap.has(item.id);
              const poster = isSongType
                ? item.cover_url
                : item.image_url || item.image || '/profileImg.png';

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    isAttached
                      ? 'bg-spotify-green/5 border-spotify-green/30'
                      : 'bg-black/40 border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      loading="lazy"
                      src={poster}
                      alt={item.name}
                      className={`w-10 h-10 object-cover bg-[#222] shrink-0 shadow-sm ${
                        isSongType ? 'rounded-lg' : 'rounded-full'
                      }`}
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-[280px]">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-gray-400 truncate">
                        {isSongType ? item.artists?.name : `ID: ${item.id}`}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleToggle(item.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isAttached
                        ? 'bg-spotify-green text-black hover:bg-red-500 hover:text-white shadow-[0_0_10px_rgba(30,215,96,0.3)]'
                        : 'bg-white/10 text-gray-300 hover:bg-white hover:text-black'
                    }`}
                  >
                    {isAttached ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                        </svg>
                        <span>Added</span>
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
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-gray-400">
          <span>{attachedMap.size} items currently selected</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white text-black font-bold text-xs hover:scale-105 transition-transform cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </ModalLayout>
  );
}

export default ManageSectionItemsModal;