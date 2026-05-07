import { fail, json } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { Size } from "$lib/server/types/models";
import { buildImageName, buildRequestBody, buildSlug } from "$lib/utils/utils";
import { getPublicUrlSupabase, uploadDressImage } from "$lib/supabase/supabase";


export const load: PageServerLoad = async({ fetch }) => {
    const response = await fetch(`/api/size`);

    const sizes: Size[] = await response.json()

    return { sizes: sizes }   
};


export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        formData.set('activo', formData.get('activo') ? 'true' : 'false');
        const jsonSizes = JSON.parse( formData.get('jsonSizes') as string ?? '' );
        const file = formData.get('images');
        const body = buildRequestBody(formData);
        body['sizes'] = jsonSizes;


        if (file && (file instanceof File)){
            const buffer = await file.arrayBuffer();
            const fileName = buildImageName(file.name);

            const { data, error } = await uploadDressImage(fileName, buffer, file.type);

            if (error) return json('Error uploading file', { status: 500 });

            if(data){
                body['file_name'] = fileName
                body['short_description'] = buildSlug(formData.get('name') as string ?? 'no_name', formData.get('color')  as string ?? 'false')

                const urlData = getPublicUrlSupabase(fileName);            
                body['url'] = urlData.publicUrl ?? file.name;
            }
        }

        const response = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',            
            body: JSON.stringify(body)
        });

        const jsonResponse = await response.json();    

        if( !response.ok ){
            return fail(400, {
                errors: jsonResponse as string,  
            });           
        };        

        return { success: true, product: jsonResponse  }; 
    } 
} satisfies Actions;