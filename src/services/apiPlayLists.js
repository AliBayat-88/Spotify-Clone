import supabase from './supabase.js'

export async function getPublicPlayListsByCategory(categoryId){
  const { data, error } = await supabase
    .from("public_playLists")
    .select(`*`)
    .eq("section_id" , categoryId)

  if (error) throw new Error(error.message);

  return data;
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
        songs (
          id,
          name,
          duration,
          audio_url,
          cover_url,
          artists ( name )
        )
      )
    `)
    .eq('id', playlistId)
    .single();

  if (error) {
    console.error("Supabase Error:", error.message); // 👈 لاگ دقیق ارور سوپابیس
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