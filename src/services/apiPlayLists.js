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
          created_at,
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

  const formattedSongs = data?.section_items
    ?.map((item) => item.songs)
    .filter(Boolean);

  return {
    ...data,
    songs: formattedSongs,
  };
}

export async function getPlaylists(userId) {
  if (!userId) return [];

  const { data, error } = await supabase
    .from("playlists")
    .select(`*`)
    .eq("user_id", userId)
    .is("deleted_at", null); 

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


export async function deletePlaylistApi(id) {
  const { data, error } = await supabase
    .from("playlists")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updatePlaylistApi(id , obj , imageFile) {
  let coverUrl = obj.cover_url;

  if (imageFile) {
    const fileName = `${id}-${Date.now()}-${imageFile.name}`;

    const {  error: storageError } = await supabase
      .storage
      .from('playlists')
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        upsert: true
      });

    if (storageError) throw new Error(`Storage Error: ${storageError.message}`);

    const { data: { publicUrl } } = supabase
      .storage
      .from('playlists')
      .getPublicUrl(fileName);

    coverUrl = publicUrl;
  }

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


export async function getSavedPublicPlaylistsApi(userId) {
  if (!userId) return [];

  const { data, error } = await supabase
    .from("saved_public_playlists")
    .select(`
      id,
      public_playlist_id,
      public_playLists (
        id,
        title,
        cover_url,
        description
      )
    `)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return data;
}

export async function savePublicPlaylistApi({ user_id, public_playlist_id }) {
  const { data, error } = await supabase
    .from("saved_public_playlists")
    .insert({ user_id: user_id, public_playlist_id: public_playlist_id });

  if (error) throw new Error(error.message);

  return data;
}

export async function unsavePublicPlaylistApi({ user_id, public_playlist_id }) {
  const { data, error } = await supabase
    .from("saved_public_playlists")
    .delete()
    .eq("user_id", user_id)
    .eq("public_playlist_id", public_playlist_id);

  if (error) throw new Error(error.message);

  return data;
}

export async function getDeletedPlaylistsApi(userId) {
  if (!userId) return [];

  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const { data, error } = await supabase
    .from("playlists")
    .select(`
      id,
      name,
      deleted_at,
      playlists_songs(count)
    `)
    .eq("user_id", userId)
    .not("deleted_at", "is", null)
    .gte("deleted_at", ninetyDaysAgo.toISOString())
    .order("deleted_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data.map((item) => ({
    id: item.id,
    title: item.name,
    deletedDate: new Date(item.deleted_at).toISOString().split("T")[0],
    songsCount: item.playlists_songs?.[0]?.count || 0,
  }));
}

export async function restorePlaylistApi(playlistId) {
  const { data, error } = await supabase
    .from("playlists")
    .update({ deleted_at: null })
    .eq("id", playlistId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}