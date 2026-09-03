import { useState, useRef } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick.js';

const SORT_OPTIONS = [
  { id: 'recent', label: 'Recently Added' },
  { id: 'title', label: 'Title (A-Z)' },
];

function PlaylistFilters({ searchQuery, setSearchQuery, sortBy, setSortBy }) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(Boolean(searchQuery));
  const sortRef = useRef(null);
  const searchInputRef = useRef(null);

  useOutsideClick(sortRef, isSortOpen, () => setIsSortOpen(false));

  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.id === sortBy)?.label || 'Custom Order';

  const handleToggleSearch = () => {
    if (!isSearchExpanded) {
      setIsSearchExpanded(true);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-3 select-none">
      <div
        onClick={handleToggleSearch}
        className={`flex items-center bg-spotify-elevated hover:bg-spotify-highlight border transition-all duration-300 rounded-full h-9 px-2.5 ${
          isSearchExpanded || searchQuery
            ? 'w-28 sm:w-56 border-white/20 bg-[#282828]'
            : 'w-9 border-transparent cursor-pointer justify-center'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-4 h-4 text-gray-400 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        {(isSearchExpanded || searchQuery) && (
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in liked songs..."
            className="w-full bg-transparent border-none outline-none text-xs text-white placeholder:text-gray-500 px-1"
            onClick={(e) => e.stopPropagation()}
            onBlur={() => {
              if (!searchQuery) setIsSearchExpanded(false);
            }}
          />
        )}

        {searchQuery && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSearchQuery('');
              searchInputRef.current?.focus();
            }}
            className="text-gray-400 hover:text-white text-xs p-1 cursor-pointer shrink-0"
          >
            ✕
          </button>
        )}
      </div>

      {/* ۲. دراپ‌داون سورت کاستوم */}
      <div className="relative" ref={sortRef}>
        <button
          type="button"
          onClick={() => setIsSortOpen((prev) => !prev)}
          className={`p-2 sm:px-3.5 rounded-full border text-[10px] font-black flex items-center gap-1 sm:gap-2 transition-all cursor-pointer ${
            isSortOpen
              ? 'bg-[#282828] border-white/30 text-white'
              : 'bg-spotify-elevated hover:bg-spotify-highlight border-white/5 text-gray-300 hover:text-white'
          }`}
        >
          <span className="text-gray-400 font-normal hidden sm:inline">Sort:</span>
          <span>{currentSortLabel}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
              isSortOpen ? 'rotate-180 text-white' : ''
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {isSortOpen && (
          <div className="absolute right-0 top-full mt-2 w-44 bg-[#1e1e1e] border border-[#333333] rounded-2xl shadow-2xl p-1.5 z-50 animate-[fadeIn_.15s_ease-out]">
            <div className="text-[10px] uppercase font-bold text-gray-500 px-3 py-1.5 border-b border-white/5">
              Sort by
            </div>
            {SORT_OPTIONS.map((option) => {
              const isSelected = option.id === sortBy;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setSortBy(option.id);
                    setIsSortOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors text-left cursor-pointer ${
                    isSelected
                      ? 'bg-white/10 text-spotify-green font-bold'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white font-medium'
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-3.5 h-3.5 text-spotify-green"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaylistFilters;