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

export async function updatePublicPlaylistApi({ playlistId, title, coverFile, currentCoverUrl , description }) {
  let coverUrl = currentCoverUrl;

  if (coverFile) {
    const fileExt = coverFile.name.split('.').pop();
    const fileName = `cover-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('public_playLists')
      .upload(fileName, coverFile);

    if (uploadError) throw new Error(`Cover upload failed: ${uploadError.message}`);

    const { data: { publicUrl } } = supabase.storage
      .from('public_playLists')
      .getPublicUrl(fileName);

    coverUrl = publicUrl;
  }

  const { data, error } = await supabase
    .from('public_playLists')
    .update({
      title,
      description,
      cover_url: coverUrl,
    })
    .eq('id', playlistId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}


// manage sections

export async function getDetailedSectionsApi() {
  const { data, error } = await supabase
    .from('sections')
    .select(`
      id,
      title,
      type,
      category_id,
      created_at,
      categories ( id, name ),
      section_items ( id ),
      public_playLists ( id )
    `)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data.map((sec) => ({
    ...sec,
    categoryName: sec.categories?.name || 'Home Page (Featured)',
    itemCount: sec.type === 'playlist'
      ? (sec.public_playLists?.length || 0)
      : (sec.section_items?.length || 0),
  }));
}

export async function createSectionApi({ title, type, categoryId }) {
  const { data, error } = await supabase
    .from('sections')
    .insert([
      {
        title,
        type,
        // اگر "home" انتخاب شده باشد مقدار null ذخیره می‌شود
        category_id: categoryId === 'home' || !categoryId ? null : Number(categoryId),
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteSectionApi(sectionId) {
  const { error } = await supabase
    .from('sections')
    .delete()
    .eq('id', sectionId);

  if (error) throw new Error(error.message);
}

export async function updateSectionApi({ sectionId, title, categoryId, type }) {
  const { data, error } = await supabase
    .from('sections')
    .update({
      title,
      type,
      category_id: categoryId === 'home' || !categoryId ? null : Number(categoryId),
    })
    .eq('id', sectionId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}


export async function getSectionItemsApi(sectionId) {
  if (!sectionId) return [];

  const { data, error } = await supabase
    .from('section_items')
    .select('id, section_id, song_id, artist_id')
    .eq('section_id', sectionId);

  if (error) throw new Error(error.message);
  return data;
}

export async function addSectionItemApi({ sectionId, songId, artistId }) {
  const insertData = {
    section_id: Number(sectionId),
    song_id: songId ? Number(songId) : null,
    artist_id: artistId ? Number(artistId) : null,
  };

  const { data, error } = await supabase
    .from('section_items')
    .insert([insertData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function removeSectionItemApi(sectionItemId) {
  const { error } = await supabase
    .from('section_items')
    .delete()
    .eq('id', sectionItemId);

  if (error) throw new Error(error.message);
}

// categories

export async function insertCategoryApi({ name, coverFile }) {
  if (!coverFile) throw new Error('Category cover image is required');

  const fileExt = coverFile.name.split('.').pop();
  const fileName = `category-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('browse_image')
    .upload(fileName, coverFile);

  if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

  const { data: { publicUrl } } = supabase.storage
    .from('browse_image')
    .getPublicUrl(fileName);

  const { data, error } = await supabase
    .from('categories')
    .insert([{ name, image_url: publicUrl }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateCategoryApi({ categoryId, name, coverFile, currentImageUrl }) {
  let imageUrl = currentImageUrl;

  if (coverFile) {
    const fileExt = coverFile.name.split('.').pop();
    const fileName = `category-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('browse_image')
      .upload(fileName, coverFile);

    if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

    const { data: { publicUrl } } = supabase.storage
      .from('browse_image')
      .getPublicUrl(fileName);

    imageUrl = publicUrl;
  }

  const { data, error } = await supabase
    .from('categories')
    .update({
      name,
      image_url: imageUrl,
    })
    .eq('id', categoryId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// 🟢 ۳. حذف دسته‌بندی
export async function deleteCategoryApi(categoryId) {
  if (!categoryId) throw new Error('Category ID is required');

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId);

  if (error) throw new Error(error.message);
}

// users

export async function getAllProfilesApi() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, display_name, avatar_url, role, created_at')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function updateUserRoleApi({ userId, newRole }) {
  if (!userId || !newRole) throw new Error('User ID and target role are required');

  const { data, error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}