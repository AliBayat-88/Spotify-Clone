import { useQuery } from '@tanstack/react-query';
import supabase from '../services/supabase.js';

const fetchSearchResults = async (searchTerm) => {
  if (!searchTerm) return { songs: [], artists: [], playlists: [] };

  const songsQuery = supabase
    .from('songs')
    .select('id, name, cover_url, artists(name)')
    .ilike('name', `%${searchTerm}%`)
    .limit(4);

  // جستجو در آرتیست‌ها
  const artistsQuery = supabase
    .from('artists')
    .select('id, name, image_url')
    .ilike('name', `%${searchTerm}%`)
    .limit(4);

  // جستجو در پلی‌لیست‌ها (اسم جدول رو با دیتابیس خودت مچ کن، قبلا public_playLists بود)
  const playlistsQuery = supabase
    .from('public_playLists')
    .select('id, title, cover_url')
    .ilike('title', `%${searchTerm}%`)
    .limit(4);

  // اجرای همزمان هر ۳ درخواست برای سرعت فوق‌العاده
  const [songsRes, artistsRes, playlistsRes] = await Promise.all([
    songsQuery,
    artistsQuery,
    playlistsQuery,
  ]);

  if (songsRes.error) throw new Error(songsRes.error.message);

  return {
    songs: songsRes.data || [],
    artists: artistsRes.data || [],
    playlists: playlistsRes.data || [],
  };
};

export function useLiveSearch(searchTerm) {
  return useQuery({
    queryKey: ['search', searchTerm],
    queryFn: () => fetchSearchResults(searchTerm),
    enabled: !!searchTerm,
    staleTime: 1000 * 60 * 5,
  });
}