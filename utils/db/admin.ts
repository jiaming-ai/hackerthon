import { createClient } from '@supabase/supabase-js';
import { Database, Tables, TablesInsert, TablesUpdate } from '@/supabase/database.types';

const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function insertStory(data: TablesInsert<'story'>) {
    const { data: story, error } = await supabaseAdmin
        .from('story')
        .insert([data]).select()
    return { story, error }
}

export async function getStoryById(id: number) {
    const { data: story, error } = await supabaseAdmin
        .from('story')
        .select('*')
        .eq('id', id)
    return { story, error }
}

export async function updateStory(data: Tables<'story'>) {
    const { error } = await supabaseAdmin
        .from('story')
        .update(
            {
                pages_text: data.pages_text,
                title: data.title,
                pages_image: data.pages_image,
                cover_image: data.cover_image,
                generation_data: data.generation_data,
            })
        .eq('id', data.id)
    if (error) {
        console.error(error)
    }
}