import type { Actions, PageServerLoad } from "./$types";
import type { Size } from "$lib/server/types/models";
import { fail } from "@sveltejs/kit";


export const load: PageServerLoad = async({ fetch }) => {
    const response = await fetch(`/api/size`);
    
    const sizes: Size[] = await response.json();

    return { sizes }
};


export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        const response = await fetch(`/api/size/${id}`, {
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