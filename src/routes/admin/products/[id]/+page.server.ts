import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { resolve } from "$app/paths";
import { buildRequestBody } from "$lib/utils/utils";
import type { ProductCategory, Size } from "$lib/server/types/models";


interface ProductSizes {
    id: number; 
    size_id: number; 
    size: string;
    price: number;
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
    slug: string;
    description?: string;
    color: string;
    category: ProductCategory;
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
        const jsonSizes = JSON.parse( formData.get('jsonSizes') as string ?? '' )
        // const file = formData.get('images');        

        const body = buildRequestBody(formData);
        body['activo'] = formData.get('activo') ? true : false;
        body['sizes'] = jsonSizes;

        const response = await fetch(resolve(`/api/products/${params.id}`), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',            
            body: JSON.stringify(body)
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