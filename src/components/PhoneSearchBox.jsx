import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { useLiveSearch } from '../features/useLiveSearch';
import { useOutsideClick } from '../hooks/useOutsideClick.js';
import SearchLoader from './SearchLoader.jsx';

function PhoneSearchBox() {
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

  const hasResults = results && (results.songs.length > 0 || results.artists.length > 0 || results.playlists.length > 0);

  return (
    <div ref={searchContainerRef} className="relative z-50">

      <div
        className={`p-2.5 overflow-hidden h-11 bg-[#262626] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex items-center transition-all duration-300 ease-in-out ${
          isFocused ? 'w-[270px]' : 'w-11'
        }`}
      >
        <div
          className="flex items-center justify-center fill-white cursor-pointer flex-shrink-0"
          onClick={() => setIsFocused(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22"
            height="22"
          >
            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className={`outline-none bg-transparent text-white font-normal px-4 transition-opacity duration-300 ${
            isFocused ? 'opacity-100 w-full' : 'opacity-0 w-0'
          }`}
        />
      </div>

      {isFocused && query.trim().length > 0 && (
        <div
          className="
            absolute top-[120%]
            left-1/2 -translate-x-1/2
            w-[280px] sm:w-[340px]
            bg-[#181818] rounded-xl
            shadow-[0_8px_30px_rgba(0,0,0,0.9)]
            border border-[#282828]
            max-h-[60vh] overflow-y-auto
            scrollbar-hide p-3
          "
        >
          {isLoading ? (
            <SearchLoader />
          ) : !hasResults ? (
            <div className="p-4 text-center text-white text-sm font-bold flex items-center justify-center flex-col gap-y-3">
              <img className="w-16" src="/nothing-found.png" alt="Not found" />
              No results
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {results.songs.length > 0 && (
                <div>
                  <h3 className="text-[#a7a7a7] font-bold text-[10px] uppercase tracking-wider px-2 mb-2">Songs</h3>
                  {results.songs.map(song => (
                    <div key={song.id} onClick={() => handleNavigate(`/track/${song.id}`)} className="flex items-center gap-3 p-2 rounded-lg active:bg-[#282828] cursor-pointer">
                      <img src={song.cover_url} alt={song.name} className="w-10 h-10 object-cover rounded-md shadow-md" />
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
                  <h3 className="text-[#a7a7a7] font-bold text-[10px] uppercase tracking-wider px-2 mb-2">Artists</h3>
                  {results.artists.map(artist => (
                    <div key={artist.id} onClick={() => handleNavigate(`/artist/${artist.id}`)} className="flex items-center gap-3 p-2 rounded-lg active:bg-[#282828] cursor-pointer">
                      <img src={artist.image_url} alt={artist.name} className="w-10 h-10 object-cover rounded-full shadow-md" />
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-white text-sm font-medium truncate">{artist.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PhoneSearchBox;