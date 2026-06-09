import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
import { buildImageName, buildSlug } from '$lib/utils/utils';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);


export async function uploadFileToSupabaseStorage(fileName: string, buffer: ArrayBuffer, contentType: string, storageName: string) {
    const { data, error } = await supabase.storage.from(storageName).upload(fileName, buffer, {contentType: contentType});
    
    return { data, error };
}

export function getPublicUrlSupabase(fileName: string, storageName: string) {
    const { data: urlData } = supabase.storage.from(storageName).getPublicUrl(fileName);

    return urlData;
}


export type supabaseUploadImage = { 
    success: boolean, 
    file_name?: string, 
    url?: string, 
    short_description?: string
}


export async function uploadImage(file: File | null, dressName: string, color: string): Promise<supabaseUploadImage> {
    if(!file || !(file instanceof File)) return { success: false, file_name: undefined, url: undefined, short_description: undefined }

    const buffer = await file.arrayBuffer();
    const fileName = buildImageName(file.name);

    const { data, error } = await uploadFileToSupabaseStorage(fileName, buffer, file.type, 'NeliayCollection');

    if (error || !data  ) return { success: false, file_name: undefined, url: undefined, short_description: undefined }

    const urlData = getPublicUrlSupabase(fileName, 'NeliayCollection');
    
    return {
        success: true,
        file_name: fileName,
        url: urlData.publicUrl ?? file.name,
        short_description: buildSlug(dressName, color)
    }
}
