import z from "zod";
import { resolve } from "$app/paths";
import { error, fail } from "@sveltejs/kit";
import { productFormSchemaZod } from "$lib/zod/schema";
import type { Actions, PageServerLoad } from "./$types";
import type { ProductCategory, Size } from "$lib/server/types/models";
import { uploadImages, type supabaseUploadImage } from "$lib/supabase/supabase";


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
    file_name: string;
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
            files: formData.getAll('images')
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
        };

        let imageUploadedData: supabaseUploadImage[] = [];

        if (productValidation.data.files) {

            imageUploadedData = await uploadImages(productValidation.data.files, body.name, body.color);
            
            if (imageUploadedData.length === 0) {
                return fail(400, {
                    errors: 'Images could not be uploaded',
                    data: {
                        name: productValidation.data.name,
                        description: productValidation.data.description,				
                        color: productValidation.data.color,
                        category: productValidation.data.category,
                        activo: productValidation.data.activo,
                        sizes: productValidation.data.sizes,
                    }
                });
            }
        }

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
                imagesData: imageUploadedData
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