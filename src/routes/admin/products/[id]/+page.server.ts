import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { resolve } from "$app/paths";
import type { ProductCategory, Size } from "$lib/server/types/models";
// import { uploadImage } from "$lib/supabase/supabase";
import { productFormPartialSchemaZod } from "$lib/zod/schema";
import z from "zod";


interface ProductSizes {
    id: number; 
    size_id: number; 
    size: string;
    price: string;
    quantity: number;
}


interface ProductImage {
    id: number;
    url: string;
    short_description: string;
}


interface Product {
    id: number;
    name: string;
    description?: string;
    color: string;
    category: ProductCategory;
    activo: boolean;
    sizes: ProductSizes[];
    images: ProductImage[];
}


export const load: PageServerLoad = async({ params, fetch }) => {
    const responseProduct = await fetch(`/api/products/${params.id}`);
    const responseSizes = await fetch(`/api/size`);        

    const product: Product = await responseProduct.json();
    const sizes: Size[] = await responseSizes.json();

    if ( !responseProduct.ok ) {
        return error(404, 'Failed to fetch product');
    }

    if ( !responseSizes.ok ) {
        return error(404, 'Failed to fetch sizes');
    }   

    return { product, sizes }
};


export const actions = {
    default: async ({ request, params, fetch }) => {
        const formData = await request.formData();

        const body = {
            name: formData.get('name')?.toString().trim() ?? '',
            description: formData.get('description')?.toString().trim() ?? '',				
            color: formData.get('color')?.toString().trim() ?? '',
            category: formData.get('category')?.toString().trim() ?? '',
            activo: formData.get('activo') ? true : false,
            sizes: JSON.parse( formData.get('jsonSizes') as string ?? '' ),
            file: formData.get('images')
        };

        const productValidation = await productFormPartialSchemaZod.safeParseAsync(body);

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
        };

        // let imageSrc = formData.get('imageSrc') ?? undefined;
        // if(body.file){

        //     const imageUploadedData = await uploadImage(file as File, body.name, body.color);

        //     if (!imageUploadedData.success) {
        //         return fail(400, {
        //             errors: 'The image could not be uploaded',
        //             data: {
        //                 name: formData.get('name')?.toString() ?? '',
        //                 description: formData.get('description')?.toString() ?? '',				
        //                 color: formData.get('color')?.toString() ?? '',
        //                 category: formData.get('category')?.toString() ?? '',
        //                 activo: formData.get('activo') ? true : false,
        //                 sizes: JSON.parse( formData.get('jsonSizes') as string ?? '' ),
        //             }
        //         });
        //     };
        // }

        const response = await fetch(resolve(`/api/products/${params.id}`), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',            
            body: JSON.stringify({
                name: formData.get('name')?.toString() ?? '',
                description: formData.get('description')?.toString() ?? '',				
                color: formData.get('color')?.toString() ?? '',
                category: formData.get('category')?.toString() ?? '',
                activo: formData.get('activo') ? true : false,
                sizes: JSON.parse( formData.get('jsonSizes') as string ?? '' ),
                // url: imageUploadedData.url,
                // file_name: imageUploadedData.file_name,
                // short_description: imageUploadedData.short_description
            })
        });

        const jsonResponse = await response.json();          

        if( !response.ok ){
            return fail(400, {
                errors: jsonResponse as string,  
                data: body
            });           
        };               

        return { success: true, product: jsonResponse  }; 
    } 
} satisfies Actions;