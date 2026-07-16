import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
import { buildImageName, buildSlug } from '$lib/utils/utils';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);


export type supabaseUploadImage = { 
    success: boolean, 
    file_name?: string, 
    url?: string, 
    short_description?: string
}

export async function uploadFileToSupabaseStorage(fileName: string, buffer: ArrayBuffer, contentType: string, storageName: string) {
    const { data, error } = await supabase.storage.from(storageName).upload(fileName, buffer, {contentType: contentType});
    
    return { data, error }
}

export function getPublicUrlSupabase(fileName: string, storageName: string) {
    const { data: urlData } = supabase.storage.from(storageName).getPublicUrl(fileName);

    return urlData;
}

export async function uploadImages(files: File[], dressName: string, color: string): Promise<supabaseUploadImage[]> {
    const uploadedImages: supabaseUploadImage[] = [];

    if(files.length === 0) return uploadedImages;    

    for (const file of files) {
        const buffer = await file.arrayBuffer();
        const fileName = buildImageName(file.name);

        const { data, error } = await uploadFileToSupabaseStorage(fileName, buffer, file.type, 'NeliayCollection');

        if (error || !data) continue;

        uploadedImages.push({
            success: true,
            file_name: fileName,
            url: getPublicUrlSupabase(fileName, 'NeliayCollection').publicUrl ?? file.name,
            short_description: buildSlug(dressName, color)
        });
    }

    return uploadedImages;
}

export async function deleteImageFromSupabaseStorage(fileName: string, storageName: string): Promise<boolean> {
    const { data, error } = await supabase.storage.from(storageName).remove([fileName]);

    if (error || !data) {
        console.error('Error deleting image from Supabase Storage:', error);
        return false;
    }

    return true;
}

    

    