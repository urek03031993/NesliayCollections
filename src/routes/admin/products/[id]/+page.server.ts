import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { resolve } from "$app/paths";
import { buildRequestBody } from "$lib/utils/utils";
import type { CreateProduct } from "$lib/components/forms/ProductForm/interfaces";
import type { ProductWithSizesInfo } from "$lib/server/types/Dto";


export const load: PageServerLoad = async({ params, fetch }) => {
    const responseProduct = await fetch(`/api/products/${params.id}`)

    const product: ProductWithSizesInfo = await responseProduct.json()

    return product   
};


export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();

        const body: Partial<CreateProduct> = buildRequestBody(formData)

        const response = await fetch(resolve('/api/products'), {
            method: 'POST',
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