import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);


export async function uploadDressImage(fileName: string, buffer: ArrayBuffer, contentType: string) {
    const { data, error } = await supabase.storage.from('NeliayCollection').upload(fileName, buffer, {contentType: contentType});
    
    return { data, error };
}

export function getPublicUrlSupabase(fileName: string) {
    const { data: urlData } = supabase.storage.from('NeliayCollection').getPublicUrl(fileName);

    return urlData;
}
