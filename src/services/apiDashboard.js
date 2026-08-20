import supabase from './supabase.js';

export async function getDashboardStatsApi() {
  const [
    { count: usersCount, error: usersErr },
    { count: artistsCount, error: artistsErr },
    { count: songsCount, error: songsErr },
    { count: playlistsCount, error: playlistsErr },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('artists').select('*', { count: 'exact', head: true }),
    supabase.from('songs').select('*', { count: 'exact', head: true }),
    supabase.from('public_playLists').select('*', { count: 'exact', head: true }),
  ]);

  if (usersErr || artistsErr || songsErr || playlistsErr) {
    throw new Error('Failed to load dashboard metrics');
  }

  return {
    users: usersCount || 0,
    artists: artistsCount || 0,
    songs: songsCount || 0,
    playlists: playlistsCount || 0,
  };
}

//songApis

export async function insertSongApi({ name, artistId, duration, lyrics, cover, audio }) {
  // 🟢 ۱. ساخت نام‌های یکتا برای فایل‌ها جهت جلوگیری از تداخل (Overwriting)
  const fileExtCover = cover.name.split('.').pop();
  const fileExtAudio = audio.name.split('.').pop();

  const coverFileName = `cover-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExtCover}`;
  const audioFileName = `audio-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExtAudio}`;

  // 🟢 ۲. آپلود فایل کاور در باکت covers (یا songs-covers)
  const { error: coverUploadError } = await supabase.storage
    .from('songs_avatar')
    .upload(coverFileName, cover);

  if (coverUploadError) throw new Error(`Cover upload failed: ${coverUploadError.message}`);

  // 🟢 ۳. آپلود فایل صوتی در باکت songs (یا songs-audio)
  const { error: audioUploadError } = await supabase.storage
    .from('songs')
    .upload(audioFileName, audio);

  if (audioUploadError) throw new Error(`Audio upload failed: ${audioUploadError.message}`);

  // 🟢 ۴. دریافت Public URL هر دو فایل
  const { data: { publicUrl: coverUrl } } = supabase.storage
    .from('songs_avatar')
    .getPublicUrl(coverFileName);

  const { data: { publicUrl: audioUrl } } = supabase.storage
    .from('songs')
    .getPublicUrl(audioFileName);

  // 🟢 ۵. ثبت رکورد نهایی در جدول songs
  const { data, error } = await supabase
    .from('songs')
    .insert([
      {
        name,
        artist_id: artistId,
        duration,
        lyrics: lyrics || null,
        cover_url: coverUrl,
        audio_url: audioUrl,
        play_count: 0,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(`Failed to insert song: ${error.message}`);

  return data;
}

export async function deleteSongApi(songId) {
  await supabase.from('songs').delete().eq("id" , songId)
}

export async function updateSongApi({ songId, name, artistId, lyrics, coverFile, currentCoverUrl }) {
  let coverUrl = currentCoverUrl;

  if (coverFile) {
    const fileExt = coverFile.name.split('.').pop();
    const fileName = `cover-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('covers')
      .upload(fileName, coverFile);

    if (uploadError) throw new Error(`Cover upload failed: ${uploadError.message}`);

    const { data: { publicUrl } } = supabase.storage
      .from('covers')
      .getPublicUrl(fileName);

    coverUrl = publicUrl;
  }

  const { data, error } = await supabase
    .from('songs')
    .update({
      name,
      artist_id: artistId,
      lyrics: lyrics || null,
      cover_url: coverUrl,
    })
    .eq('id', songId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}



//artistApis
export async function insertArtistApi({ name, cover , bio }) {
  const fileExtCover = cover.name.split('.').pop();

  const coverFileName = `cover-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExtCover}`;

  const { error: coverUploadError } = await supabase.storage
    .from('artists_profile')
    .upload(coverFileName, cover);

  if (coverUploadError) throw new Error(`Cover upload failed: ${coverUploadError.message}`);

  // 🟢 ۴. دریافت Public URL هر دو فایل
  const { data: { publicUrl: coverUrl } } = supabase.storage
    .from('artists_profile')
    .getPublicUrl(coverFileName);


  // 🟢 ۵. ثبت رکورد نهایی در جدول songs
  const { data, error } = await supabase
    .from('artists')
    .insert([
      {
        name,
        image_url: coverUrl,
        bio
      },
    ])
    .select()
    .single();

  if (error) throw new Error(`Failed to insert song: ${error.message}`);

  return data;
}

export async function deleteArtistApi(artistId) {
  await supabase.from('artists').delete().eq("id" , artistId)
}

export async function updateArtistApi({ artistId, name, coverFile, currentCoverUrl }) {
  let coverUrl = currentCoverUrl;

  if (coverFile) {
    const fileExt = coverFile.name.split('.').pop();
    const fileName = `cover-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('artists_profile')
      .upload(fileName, coverFile);

    if (uploadError) throw new Error(`Cover upload failed: ${uploadError.message}`);

    const { data: { publicUrl } } = supabase.storage
      .from('artists_profile')
      .getPublicUrl(fileName);

    coverUrl = publicUrl;
  }

  const { data, error } = await supabase
    .from('artists')
    .update({
      name,
      image_url: coverUrl,
    })
    .eq('id', artistId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

//public playlists

export async function getAllSectionsApi() {
  const { data, error } = await supabase
    .from('sections')
    .select('id, title, category_id, type, created_at')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}


export async function getDashboardPublicPlaylistsApi() {
  const { data, error } = await supabase
    .from('public_playLists')
    .select(`
      id,
      title,
      description,
      cover_url,
      section_id,
      created_at,
      sections ( id, title, category_id )
    `)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}


export async function insertPublicPlaylistApi({ title, description, sectionId, coverFile }) {
  if (!coverFile) throw new Error('Cover image is required');

  // ۱. آپلود کاور در Storage Bucket
  const fileExt = coverFile.name.split('.').pop();
  const fileName = `playlist-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('public_playLists')
    .upload(fileName, coverFile);

  if (uploadError) throw new Error(`Cover upload failed: ${uploadError.message}`);

  const { data: { publicUrl } } = supabase.storage
    .from('public_playLists')
    .getPublicUrl(fileName);

  // ۲. درج در جدول public_playLists
  const { data, error } = await supabase
    .from('public_playLists')
    .insert([
      {
        title,
        description: description || null,
        section_id: Number(sectionId),
        cover_url: publicUrl,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}


export async function deletePublicPlaylistApi(playlistId) {
  if (!playlistId) throw new Error('Playlist ID is required');

  const { error } = await supabase
    .from('public_playLists')
    .delete()
    .eq('id', playlistId);

  if (error) throw new Error(error.message);
}