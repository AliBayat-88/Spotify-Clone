import supabase from './supabase.js'

export async function getArtists(){
  const {data , error} = await supabase
    .from('artists')
    .select("*")

  if (error) throw new Error(error.message);

  return data
}

export async function getArtist(id){
  const {data , error} = await supabase
    .from('artists')
    .select("*")
    .eq("id" , id)
    .single()

  if (error) throw new Error(error.message);

  return data
}

export async function addFollowArtistApi({ userId , artistId }){
    const {data , error} = await supabase
  .from('followed_artists')
  .insert({user_id: userId, artist_id: artistId})

  if (error) throw new Error(error.message);

  return data
}

export async function deleteFollowArtistApi({ userId , artistId }){
  const {data , error} = await supabase
    .from('followed_artists')
    .delete()
    .eq("user_id" , userId)
    .eq("artist_id" , artistId);


  if (error) throw new Error(error.message);

  return data
}


export async function getFollowArtists(userId ){
  const {data , error} = await supabase
    .from('followed_artists')
    .select("*")
    .eq("user_id" , userId)

  if (error) throw new Error(error.message);

  return data
}