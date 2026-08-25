import  supabase  from "./supabase";

export async function getSongs() {
  const { data, error } = await supabase
    .from("songs")
    .select(`* , artists(id , name , image_url , bio)`);

  if (error) throw new Error(error.message);

  return data;
}

export async function getSong(id) {
  const { data, error } = await supabase
    .from("songs")
    .select(`* , artists(id , name , image_url , bio)`)
    .eq("id",id)
    .single()

  if (error) throw new Error(error.message);

  return data
}

export async function getSongsByArtist(artistId) {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("artist_id", artistId);

  if (error) throw new Error(error.message);

  return data;
}

export async function getSectionDetails(sectionId) {
  const { data, error } = await supabase
    .from("sections")
    .select(`
      id,
      title,
      type,
      public_playLists (*),
      section_items (
        songs (*),
        artists (*)
      )
    `)
    .eq("id", sectionId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
export async function getHomeSections() {
  const { data, error } = await supabase
    .from("sections")
    .select(`
      id,
      title,
      type,
      section_items (
        songs (
          id,
          name,
          cover_url,
          audio_url,
          artists (name , bio)
        ),
        artists (
          id,
          name,
          image_url,
          bio
        )
      )
    `)
    .is("category_id", null);

  if (error) throw new Error(error.message);
  return data;
}


export async function trackSongPlayApi(songId) {
  if (!songId) return;
  const { error } = await supabase.rpc('increment_song_play', {
    target_song_id: songId,
  });
  if (error) console.error('Error logging play:', error.message);
}

// 🟢 ۲. دریافت ۵ آهنگ برتر بر اساس بیشترین پخش
export async function getPopularSongsApi() {
  const { data, error } = await supabase
    .from('songs')
    .select(`
      id,
      name,
      duration,
      cover_url,
      play_count,
      artists ( name )
    `)
    .order('play_count', { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);
  return data;
}


