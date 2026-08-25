import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { useLiveSearch } from '../features/useLiveSearch';
import { useOutsideClick } from '../hooks/useOutsideClick.js';
import SearchLoader from './SearchLoader.jsx';

function PhoneSearchBox() {
  const inputRef = useRef(null);

  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  const debouncedQuery = useDebounce(query, 500);
  const { data: results, isLoading } = useLiveSearch(debouncedQuery);

  useOutsideClick(searchContainerRef, isFocused, () => {
    setIsFocused(false);
    setQuery('');
  });

  const handleNavigate = (path) => {
    navigate(path);
    setQuery('');
    setIsFocused(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    e.preventDefault(); // جلوگیری از رفتار پیش‌فرض کلیک
    setQuery('');
    setIsFocused(true);

    inputRef.current?.focus();
  };


  const isTyping = query.trim().length > 0;
  const hasResults =
    results &&
    (results.songs.length > 0 ||
      results.artists.length > 0 ||
      results.playlists.length > 0);

  return (
    <div ref={searchContainerRef} className="relative z-50 shrink-0">

      {/* کادر سرچ بازشونده موبایل */}
      <div
        className={`p-1.5 overflow-hidden h-9 bg-[#262626] shadow-[2px_2px_20px_rgba(0,0,0,0.3)] rounded-full flex items-center transition-all duration-300 ease-in-out ${
          isFocused
            ? 'w-[calc(100vw-130px)] max-w-[280px] sm:max-w-[400px]'
            : 'w-9'
        }`}
      >
        <div
          className="flex items-center justify-center fill-white cursor-pointer shrink-0 mx-auto"
          onClick={() => setIsFocused(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
          >
            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
          </svg>
        </div>

        <input
          type="text"
          ref={inputRef}
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className={`outline-none bg-transparent text-white font-normal px-3 transition-opacity duration-300 w-full ${
            isFocused ? 'opacity-100 block' : 'opacity-0 hidden'
          }`}
        />

        {isTyping && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 flex items-center justify-center cursor-pointer border-none bg-transparent outline-none"
            title="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* 🟢 تک دراپ‌داون هوشمند موبایل */}
      {isFocused && (
        <div
          className="
            absolute top-[120%]
            right-0
            w-[280px] sm:w-[400px]
            bg-[#181818] rounded-2xl
            shadow-[0_12px_36px_rgba(0,0,0,0.9)]
            border border-[#282828]
            max-h-[60vh] overflow-y-auto
            scrollbar-hide p-2.5 z-50 animate-[fadeIn_.15s_ease-out]
          "
        >
          {/* میانبر Browse All Genres */}
          <div
            onClick={() => handleNavigate('/search')}
            className="flex items-center justify-between p-1.5 rounded-xl active:bg-white/15 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1ed760]/10 text-[#1ed760] flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 0110.5 15.75v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V15.75zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-white">Browse All Genres</span>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>

          {/* خط جداکننده در صورت فعال بودن سرچ */}
          {isTyping && <div className="h-px bg-white/5 my-2" />}

          {/* نتایج سرچ */}
          {isTyping && (
            <>
              {isLoading ? (
                <SearchLoader />
              ) : !hasResults ? (
                <div className="p-4 text-center text-white text-sm font-bold flex items-center justify-center flex-col gap-y-2">
                  <img loading="lazy" className="w-14 opacity-80" src="/nothing-found.png" alt="Not found" />
                  <span className="text-xs text-gray-400">No results found</span>
                </div>
              ) : (
                <div className="flex flex-col gap-3 mt-1">
                  {results.songs.length > 0 && (
                    <div>
                      <h3 className="text-[#a7a7a7] font-bold text-[11px] uppercase tracking-wider px-2 mb-1.5">Songs</h3>
                      {results.songs.map((song) => (
                        <div
                          key={song.id}
                          onClick={() => handleNavigate(`/track/${song.id}`)}
                          className="flex items-center gap-3 p-2 rounded-xl active:bg-[#282828] cursor-pointer"
                        >
                          <img loading="lazy" src={song.cover_url} alt={song.name} className="w-9 h-9 object-cover rounded-md shadow-md shrink-0" />
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-white text-sm font-medium truncate">{song.name}</span>
                            <span className="text-[#a7a7a7] text-xs truncate">{song.artists?.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {results.artists.length > 0 && (
                    <div>
                      <h3 className="text-[#a7a7a7] font-bold text-[11px] uppercase tracking-wider px-2 mb-1.5">Artists</h3>
                      {results.artists.map((artist) => (
                        <div
                          key={artist.id}
                          onClick={() => handleNavigate(`/artist/${artist.id}`)}
                          className="flex items-center gap-3 p-2 rounded-xl active:bg-[#282828] cursor-pointer"
                        >
                          <img loading="lazy" src={artist.image_url} alt={artist.name} className="w-9 h-9 object-cover rounded-full shadow-md shrink-0" />
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-white text-sm font-medium truncate">{artist.name}</span>
                            <span className="text-[#a7a7a7] text-xs truncate">Artist</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {results.playlists.length > 0 && (
                    <div>
                      <h3 className="text-[#a7a7a7] font-bold text-[11px] uppercase tracking-wider px-2 mb-1.5">
                        Playlists
                      </h3>
                      {results.playlists.map((playlist) => (
                        <div
                          key={playlist.id}
                          onClick={() => handleNavigate(`/public-playlist/${playlist.id}`)}
                          className="flex items-center gap-3 p-2 rounded-xl active:bg-[#282828] cursor-pointer"
                        >
                          <img
                            loading="lazy"
                            src={playlist.cover_url}
                            alt={playlist.title}
                            className="w-9 h-9 object-cover rounded-md shadow-md shrink-0"
                          />
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-white text-sm font-medium truncate">
                              {playlist.title}
                            </span>
                            <span className="text-[#a7a7a7] text-xs truncate">Playlist</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default PhoneSearchBox;