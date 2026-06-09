import type { ProductCatalogList } from "$lib/server/types/Dto";
import type { Actions, PageServerLoad } from "./$types";
import { error, fail } from "@sveltejs/kit";


export const load: PageServerLoad = async({ fetch }) => {
    const response = await fetch(`/api/products`);

    if (!response.ok) error(response.status, 'Failed to fetch products');       
    
    const products: ProductCatalogList[] = await response.json();

    return { products }
};


export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
        });       
        
        if (!response.ok){  
            const json = await response.json();          
            return fail(response.status, { error: json })
        }
        
        return { success: true }
    } 

} satisfies Actions;