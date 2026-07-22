import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://lkykzombklthivhtphrn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWt6b21ia2x0aGl2aHRwaHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyOTEyODAsImV4cCI6MjA5Nzg2NzI4MH0.MvOdHSZpCjSKT78Y-LLa6uISZ0AWAoOn53QBivzbu2Q'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase