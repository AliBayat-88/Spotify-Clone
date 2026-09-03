import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon.jsx';
import { useDebounce } from '../hooks/useDebounce';
import { useLiveSearch } from '../features/useLiveSearch';
import { useOutsideClick } from '../hooks/useOutsideClick.js';
import SearchLoader from './SearchLoader.jsx';
import Button from './Button.jsx';
import { useAuth } from '../context/Auth.jsx';
import Profile from './Profile.jsx';

function SearchBox() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const navigate = useNavigate();
  const { user, isLoading: isAuthLoading } = useAuth();

  const debouncedQuery = useDebounce(query, 500);
  const { data: results, isLoading } = useLiveSearch(debouncedQuery);

  useOutsideClick(searchContainerRef, isFocused, () => setIsFocused(false));

  const handleNavigate = (path) => {
    navigate(path);
    setQuery('');
    setIsFocused(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setQuery('');
    setIsFocused(true);

    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const isTyping = query.trim().length > 0;
  const hasResults =
    results &&
    (results.songs.length > 0 ||
      results.artists.length > 0 ||
      results.playlists.length > 0);

  return (
    <>
      <div className="flex justify-between items-center gap-x-2">
        <div className="hidden md:block">
          <HomeIcon />
        </div>

        <div className="relative hidden md:block" ref={searchContainerRef}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search for songs, artists ..."
            className="
              bg-spotify-surface
              rounded-2xl
              p-2.5 pl-11 pr-24
              text-white placeholder-gray-400
              focus:outline-none
              focus:ring-2 focus:ring-white
              transition-all duration-400
              w-full min-w-[300px] lg:min-w-[400px]
            "
          />

          {/* آیکون ذره‌بین سمت چپ */}
          <img
            loading="lazy"
            src="/search.svg"
            className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 w-5 h-5"
            alt="Search"
            onClick={() => inputRef.current?.focus()}
          />

          {isTyping && (
            <button
              type="button"
              onMouseDown={handleClear}
              className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 flex items-center justify-center cursor-pointer border-none bg-transparent outline-none"
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

          {/* خط جداکننده */}
          <span className="absolute right-11 top-1/2 -translate-y-1/2 h-5 w-px bg-white/20" />

          {/* آیکون Browse */}
          <Link to="/search" title="Browse Genres">
            <img
              loading="lazy"
              src="/browse.svg"
              className="absolute cursor-pointer right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 hover:scale-110 transition-transform"
              alt="Browse"
            />
          </Link>

          {/* تک دراپ‌داون یکپارچه */}
          {isFocused && (
            <div className="absolute top-[115%] left-0 w-full bg-spotify-surface rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.85)] border border-[#282828] max-h-[65vh] overflow-y-auto scrollbar-hide z-50 p-2.5 animate-[fadeIn_.15s_ease-out]">

              {/* گزینه همیشه ثابت بالا: Browse All Genres */}
              <div
                onClick={() => handleNavigate('/search')}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-spotify-green/10 text-spotify-green group-hover:bg-spotify-green group-hover:text-black transition-colors flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 0110.5 15.75v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V15.75zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-white">Browse All Genres</span>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>

              {/* خط جداساز */}
              {isTyping && <div className="h-px bg-white/5 my-2" />}

              {/* نتایج سرچ زنده */}
              {isTyping && (
                <>
                  {isLoading ? (
                    <SearchLoader />
                  ) : !hasResults ? (
                    <div className="p-4 text-center text-white text-sm font-bold flex items-center justify-center flex-col gap-y-2">
                      <img loading="lazy" className="w-16 opacity-80" src="/nothing-found.png" alt="Nothing found" />
                      <span className="text-gray-300">No results found</span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 mt-1">
                      {results.songs.length > 0 && (
                        <div>
                          <h3 className="text-spotify-muted font-bold text-xs uppercase tracking-wider px-2 mb-2">
                            Songs
                          </h3>
                          {results.songs.map((song) => (
                            <div
                              key={song.id}
                              onClick={() => handleNavigate(`/track/${song.id}`)}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#282828] cursor-pointer transition-colors group"
                            >
                              <img
                                loading="lazy"
                                src={song.cover_url}
                                alt={song.name}
                                className="w-10 h-10 object-cover rounded-md shadow-md shrink-0"
                              />
                              <div className="flex flex-col overflow-hidden">
                                <span className="text-white text-sm font-medium truncate group-hover:text-spotify-green transition-colors">
                                  {song.name}
                                </span>
                                <span className="text-spotify-muted text-xs truncate">
                                  {song.artists?.name}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {results.artists.length > 0 && (
                        <div>
                          <h3 className="text-spotify-muted font-bold text-xs uppercase tracking-wider px-2 mb-2">
                            Artists
                          </h3>
                          {results.artists.map((artist) => (
                            <div
                              key={artist.id}
                              onClick={() => handleNavigate(`/artist/${artist.id}`)}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#282828] cursor-pointer transition-colors group"
                            >
                              <img
                                loading="lazy"
                                src={artist.image_url}
                                alt={artist.name}
                                className="w-10 h-10 object-cover rounded-full shadow-md shrink-0"
                              />
                              <div className="flex flex-col overflow-hidden">
                                <span className="text-white text-sm font-medium truncate group-hover:text-spotify-green transition-colors">
                                  {artist.name}
                                </span>
                                <span className="text-spotify-muted text-xs truncate">Artist</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {results.playlists.length > 0 && (
                        <div>
                          <h3 className="text-spotify-muted font-bold text-xs uppercase tracking-wider px-2 mb-2">
                            Playlists
                          </h3>
                          {results.playlists.map((playlist) => (
                            <div
                              key={playlist.id}
                              onClick={() => handleNavigate(`/public-playlist/${playlist.id}`)}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#282828] cursor-pointer transition-colors group"
                            >
                              <img
                                loading="lazy"
                                src={playlist.cover_url}
                                alt={playlist.title}
                                className="w-10 h-10 object-cover rounded-md shadow-md shrink-0"
                              />
                              <div className="flex flex-col overflow-hidden">
                                <span className="text-white text-sm font-medium truncate group-hover:text-spotify-green transition-colors">
                                  {playlist.title}
                                </span>
                                <span className="text-spotify-muted text-xs truncate">Playlist</span>
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
      </div>

      {isAuthLoading ? (
        <div className="w-12 h-10 rounded-xl bg-spotify-card animate-pulse shrink-0" />
      ) : user ? (
        <Profile />
      ) : (
        <Button wherePage="/login">Login</Button>
      )}
    </>
  );
}

export default SearchBox;