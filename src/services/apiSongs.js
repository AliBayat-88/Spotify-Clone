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
          artists (name)
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


