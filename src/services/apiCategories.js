import supabase from './supabase.js'

export async function getCategories(){
  const {data , error} = await supabase
    .from('categories')
    .select("*")

  if (error) throw new Error(error.message);

  return data
}

export async function getCategory(id){
  const {data , error} = await supabase
    .from('categories')
    .select("*")
    .eq("id" , id)
    .single()

  if (error) throw new Error(error.message);

  return data
}

export async function getSectionCategories(id) {
  const { data, error } = await supabase
    .from("sections")
    .select(`
      *,
      public_playLists(*)
    `)
    .eq("category_id", id);

  if (error) throw new Error(error.message);

  return data;
}

