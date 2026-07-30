import supabase from './supabase.js'

export async function getPublicPlayListsByCategory(categoryId){
  const { data, error } = await supabase
    .from("public_playLists")
    .select(`*`)
    .eq("section_id" , categoryId)

  if (error) throw new Error(error.message);

  return data;
}

export async function getPublicPlaylistApi(publicPlaylistId) {
  const { data, error } = await supabase
    .from("public_playLists")
    .select(`
      *,
      section_items (
        id,
        songs (
          id,
          name,
          duration,
          audio_url,
          cover_url,
          artists (id, name , bio)
        )
      )
    `)
    .eq("id", publicPlaylistId)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Could not load public playlist");
  }

  // 🟢 مپ کردن داده‌ها برای اینکه خروجی تمیز و یک‌دست به UI بدهی
  const formattedSongs = data?.section_items
    ?.map((item) => item.songs)
    .filter(Boolean); // حذف مقادیر null احتمالی

  return {
    ...data,
    songs: formattedSongs,
  };
}

export async function getPlaylists(userId){
  const { data, error } = await supabase
    .from("playlists")
    .select(`*`)
    .eq("user_id" , userId)

  if (error) throw new Error(error.message);

  return data;
}

export async function getPlaylistSongsApi(playlistId) {
  const { data, error } = await supabase
    .from('playlists')
    .select(`
      id,
      name,
      cover_url,
      playlists_songs (
        created_at,
        songs (
          id,
          name,
          duration,
          audio_url,
          cover_url,
          artists ( name , bio )
        )
      )
    `)
    .eq('id', playlistId)
    .single();

  if (error) {
    console.error("Supabase Error:", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function createPlaylistApi(name , userId) {
  const { data, error } = await supabase
    .from("playlists")
    .insert({ name , user_id : userId });

  if (error) throw new Error(error.message);

  return data;
}


export async function addSongToPlaylistApi({ songId , playlistId }) {
  const { data, error } = await supabase
    .from("playlists_songs")
    .insert({ song_id : songId , playlist_id : playlistId });

  if (error) throw new Error(error.message);

  return data;
}


export async function deleteSongFromPlaylistApi({ songId, playlistId }) {
  const { data, error } = await supabase
    .from("playlists_songs")
    .delete()
    .eq("song_id", songId)
    .eq("playlist_id", playlistId);

  if (error) {
    console.error("Error deleting song from playlist:", error.message);
    throw new Error("Could not delete song from playlist");
  }

  return data;
}


export async function deletePlaylistApi(id){
    await supabase .from("playlists").delete().eq("id" , id)
}

export async function updatePlaylistApi(id , obj , imageFile) {
  let coverUrl = obj.cover_url;

  // 1️⃣ اگر کاربر عکس جدیدی انتخاب کرده بود، ابتدا آن را آپلود می‌کنیم
  if (imageFile) {
    // ایجاد یک نام یکتا برای فایل تا روی عکس‌های قبلی بازنویسی نشود
    const fileName = `${id}-${Date.now()}-${imageFile.name}`;

    const {  error: storageError } = await supabase
      .storage
      .from('playlists')
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        upsert: true
      });

    if (storageError) throw new Error(`Storage Error: ${storageError.message}`);

    // دریافت URL عمومی فایل آپلود شده
    const { data: { publicUrl } } = supabase
      .storage
      .from('playlists')
      .getPublicUrl(fileName);

    coverUrl = publicUrl;
  }

  // 2️⃣ آپدیت کردن جدول پلی‌لیست در دیتابیس
  const { data, error } = await supabase
    .from("playlists")
    .update({
      name: obj.name,
      cover_url: coverUrl
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}