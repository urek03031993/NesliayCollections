import type { Actions, PageServerLoad } from "./$types";
import type { Product } from "$lib/server/types/models";
import { fail } from "@sveltejs/kit";


export const load: PageServerLoad = async({ fetch }) => {
    const response = await fetch(`/api/products`);
    
    const products: Product[] = await response.json();

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