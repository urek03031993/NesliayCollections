import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { Size } from "$lib/server/types/models";
import { buildImageName, buildRequestBody, buildSlug } from "$lib/utils/utils";
import { supabase } from "$lib/supabase/supabase";


export const load: PageServerLoad = async({ fetch }) => {
    const response = await fetch(`/api/size`);

    const sizes: Size[] = await response.json()

    return { sizes: sizes }   
};


export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        const file = formData.get('images');
        const body = buildRequestBody(formData);  


        if (file && (file instanceof File)){
            const buffer = await file.arrayBuffer();
            const fileName = buildImageName(file.name);

            const { data, error } = await supabase.storage
                .from('NesliayCollections')
                .upload(fileName, buffer, {
                    contentType: file.type
                });

            if (error) {
                console.log(error);
            }

            if(data){
                console.log('Foto subida con éxito');
                body['file_name'] = fileName
                body['short_description'] = buildSlug(formData.get('name') as string ?? 'no_name', formData.get('color')  as string ?? 'false')
                console.log(data.path)
            }           

            const { data: urlData } = supabase.storage.from('NesliayCollections').getPublicUrl(fileName);
            
            if(urlData){
                body['url'] = urlData.publicUrl ?? file.name
                console.log('Url publica foto');
            }else{
                body['url'] = file.name
            }
        }

        console.log(body, 'cliente server')

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