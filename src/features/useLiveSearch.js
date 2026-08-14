import { useQuery } from '@tanstack/react-query';
import supabase from '../services/supabase.js';

function sortByStartsWith(list, searchTerm) {
  if (!list) return [];
  const term = searchTerm.toLowerCase().trim();

  return list.sort((a, b) => {
    const nameA = (a.name || a.title || '').toLowerCase();
    const nameB = (b.name || b.title || '').toLowerCase();

    const aStartsWith = nameA.startsWith(term);
    const bStartsWith = nameB.startsWith(term);

    if (aStartsWith && !bStartsWith) return -1;

    if (!aStartsWith && bStartsWith) return 1;

    return 0;
  });
}

const fetchSearchResults = async (searchTerm) => {
  const cleanTerm = searchTerm?.trim();
  if (!cleanTerm) return { songs: [], artists: [], playlists: [] };

  const songsQuery = supabase
    .from('songs')
    .select('id, name, cover_url, artists(name)')
    .ilike('name', `%${cleanTerm}%`)
    .limit(8);

  const artistsQuery = supabase
    .from('artists')
    .select('id, name, image_url')
    .ilike('name', `%${cleanTerm}%`)
    .limit(8);

  const playlistsQuery = supabase
    .from('public_playLists')
    .select('id, title, cover_url')
    .ilike('title', `%${cleanTerm}%`)
    .limit(8);

  const [songsRes, artistsRes, playlistsRes] = await Promise.all([
    songsQuery,
    artistsQuery,
    playlistsQuery,
  ]);

  if (songsRes.error) throw new Error(songsRes.error.message);
  if (artistsRes.error) throw new Error(artistsRes.error.message);
  if (playlistsRes.error) throw new Error(playlistsRes.error.message);

  const sortedSongs = sortByStartsWith(songsRes.data, cleanTerm).slice(0, 4);
  const sortedArtists = sortByStartsWith(artistsRes.data, cleanTerm).slice(0, 4);
  const sortedPlaylists = sortByStartsWith(playlistsRes.data, cleanTerm).slice(0, 4);

  return {
    songs: sortedSongs,
    artists: sortedArtists,
    playlists: sortedPlaylists,
  };
};

export function useLiveSearch(searchTerm) {
  return useQuery({
    queryKey: ['search', searchTerm],
    queryFn: () => fetchSearchResults(searchTerm),
    enabled: !!searchTerm && searchTerm.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });
}