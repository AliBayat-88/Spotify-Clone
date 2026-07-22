import supabase from './supabase.js'

export async function getLikedSongsApi(userId) {
  if (!userId) return [];

  const { data, error } = await supabase
    .from("liked_songs")
    .select(`
      created_at,
      songs (
        id,
        name,
        duration,
        cover_url,
        audio_url,
        artists ( id, name )
      )
    `)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  // 🟢 افزودن created_at زمانِ لایک شدن به آبجکت هر آهنگ
  return data.map((item) => ({
    ...item.songs,
    added_at: item.created_at, // زمان اضافه شدن به لایک‌ها
  }));
}
export async function addLikedSongsApi({ userId, likedSongId }) {

  const { data, error } = await supabase
    .from("liked_songs")
    .insert({ user_id: userId, song_id: likedSongId });

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteLikedSongApi({ userId, likedSongId }) {
  const { error } = await supabase
    .from("liked_songs")
    .delete()
    .eq("user_id", userId)
    .eq("song_id", likedSongId); // 🟢 زنجیره‌سازی درست شرط‌ها

  if (error) throw new Error(error.message);
}