import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from './HomeIcon.jsx';
import { useDebounce } from '../hooks/useDebounce';
import { useLiveSearch } from '../features/useLiveSearch';
import { useOutsideClick } from '../hooks/useOutsideClick.js'
import SearchLoader from './SearchLoader.jsx'
import Button from './Button.jsx'
import { useAuth } from '../context/Auth.jsx'
import Profile from './Profile.jsx'

function SearchBox() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();
  const {user} = useAuth()

  const debouncedQuery = useDebounce(query, 500);
  const { data: results, isLoading } = useLiveSearch(debouncedQuery);

  useOutsideClick(searchContainerRef , isFocused , () => setIsFocused(false))
  const handleNavigate = (path) => {
    navigate(path);
    setQuery('');
    setIsFocused(false);
  };

  const hasResults = results && (results.songs.length > 0 || results.artists.length > 0 || results.playlists.length > 0);

  return (
    <>
      <div className="flex justify-between items-center gap-x-2">
        <div className="hidden md:block">
          <HomeIcon />
        </div>

        <div className="relative hidden md:block" ref={searchContainerRef}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search for the song..."
            className="
              bg-[#262626]
              rounded-2xl
              p-2.5 pl-11 pr-28
              text-white placeholder-gray-400
              focus:outline-none
              focus:ring-2 focus:ring-white
              transition-all duration-200
              w-full min-w-[300px] lg:min-w-[400px]
            "
          />

          <img
            src="/search.svg"
            className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 w-5 h-5"
            alt="Search"
          />

          <span className="absolute right-12 top-1/2 -translate-y-1/2 h-6 w-px bg-white/40" />

          <Link to="/search">
            <img
              src="/browse.svg"
              className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 w-5 h-5 hover:scale-110 transition-transform"
              alt="Browse"
            />
          </Link>

          {isFocused && query.trim().length > 0 && (
            <div className="absolute top-[115%] left-0 w-full bg-[#181818] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.8)] border border-[#282828] max-h-[65vh] overflow-y-auto scrollbar-hide z-50 p-3">

              {isLoading ? (
                <SearchLoader/>
              ) : !hasResults ? (
                <div className="p-4 text-center text-white text-sm font-bold flex items-center justify-center flex-col gap-y-3">
                  <img className="w-20" src="/nothing-found.png"/>
                  No results found for {query}
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {results.songs.length > 0 && (
                    <div>
                      <h3 className="text-[#a7a7a7] font-bold text-xs uppercase tracking-wider px-2 mb-3">Songs</h3>
                      {results.songs.map(song => (
                        <div key={song.id} onClick={() => handleNavigate(`/track/${song.id}`)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#282828] cursor-pointer transition-colors group">
                          <img src={song.cover_url} alt={song.name} className="w-10 h-10 object-cover rounded-md shadow-md" />
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-white text-sm font-medium truncate group-hover:text-[#1db954] transition-colors">{song.name}</span>
                            <span className="text-[#a7a7a7] text-xs truncate">{song.artists?.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {results.artists.length > 0 && (
                    <div>
                      <h3 className="text-[#a7a7a7] font-bold text-xs uppercase tracking-wider px-2 mb-3">Artists</h3>
                      {results.artists.map(artist => (
                        <div key={artist.id} onClick={() => handleNavigate(`/artist/${artist.id}`)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#282828] cursor-pointer transition-colors group">
                          <img src={artist.image_url} alt={artist.name} className="w-10 h-10 object-cover rounded-full shadow-md" />
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-white text-sm font-medium truncate group-hover:text-white">{artist.name}</span>
                            <span className="text-[#a7a7a7] text-xs truncate">Artist</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {results.playlists.length > 0 && (
                    <div>
                      <h3 className="text-[#a7a7a7] font-bold text-xs uppercase tracking-wider px-2 mb-3">Playlists</h3>
                      {results.playlists.map(playlist => (
                        <div key={playlist.id} onClick={() => handleNavigate(`/playlist/${playlist.id}`)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#282828] cursor-pointer transition-colors group">
                          <img src={playlist.cover_url} alt={playlist.title} className="w-10 h-10 object-cover rounded-md shadow-md" />
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-white text-sm font-medium truncate group-hover:text-white">{playlist.title}</span>
                            <span className="text-[#a7a7a7] text-xs truncate">Playlist</span>
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
      </div>

      {user ? <Profile/> : <Button wherePage="/login">Login</Button>}
    </>
  );
}

export default SearchBox;