import z from "zod";
import { fail } from "@sveltejs/kit";
import { uploadImage } from "$lib/supabase/supabase";
import type { Actions, PageServerLoad } from "./$types";
import { productFormSchemaZod } from "$lib/zod/schema";
import type { SizeObjDto } from "$lib/server/types/Dto";


export const load: PageServerLoad = async({ fetch }) => {
    const response = await fetch(`/api/size`);

    const sizes: SizeObjDto[] = await response.json()

    return { sizes: sizes }   
};


export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();

        const body = {
            name: formData.get('name')?.toString() ?? '',
            description: formData.get('description')?.toString() ?? '',				
            color: formData.get('color')?.toString() ?? '',
            category: formData.get('category')?.toString() ?? '',
            activo: formData.get('activo') ? true : false,
            sizes: JSON.parse( formData.get('jsonSizes') as string ?? '' ),
            file: formData.get('images')
        };

        const productValidation = await productFormSchemaZod.safeParseAsync(body);        

        if (!productValidation.success) {
            return fail(400, {
                errors: z.flattenError(productValidation.error).fieldErrors,
                data: {
                    name: formData.get('name')?.toString() ?? '',
                    description: formData.get('description')?.toString() ?? '',				
                    color: formData.get('color')?.toString() ?? '',
                    category: formData.get('category')?.toString() ?? '',
                    activo: formData.get('activo') ? true : false,
                    sizes: JSON.parse( formData.get('jsonSizes') as string ?? '' ),
                }
            });
        }        

        const file = formData.get('images');
        const imageUploadedData = await uploadImage(file as File, body.name, body.color);

        if (!imageUploadedData.success) {
            return fail(400, {
                errors: 'The image could not be uploaded',
                data: {
                    name: formData.get('name')?.toString() ?? '',
                    description: formData.get('description')?.toString() ?? '',				
                    color: formData.get('color')?.toString() ?? '',
                    category: formData.get('category')?.toString() ?? '',
                    activo: formData.get('activo') ? true : false,
                    sizes: JSON.parse( formData.get('jsonSizes') as string ?? '' ),
                }
            });
        }
        
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',            
            body: JSON.stringify({
                name: formData.get('name')?.toString() ?? '',
                description: formData.get('description')?.toString() ?? '',				
                color: formData.get('color')?.toString() ?? '',
                category: formData.get('category')?.toString() ?? '',
                activo: formData.get('activo') ? true : false,
                sizes: JSON.parse( formData.get('jsonSizes') as string ?? '' ),
                url: imageUploadedData.url,
                file_name: imageUploadedData.file_name,
                short_description: imageUploadedData.short_description           
            })
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