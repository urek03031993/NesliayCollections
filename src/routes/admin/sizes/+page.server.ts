import type { Actions, PageServerLoad } from "./$types";
import type { Size } from "$lib/server/types/models";
import { error, fail } from "@sveltejs/kit";


export const load: PageServerLoad = async({ fetch }) => {
    const response = await fetch(`/api/size`);

    const sizes: Size[] = await response.json();

    if (!response.ok) {
        return error(404, 'Failed to fetch sizes');
    }    

    return { sizes }
};


export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        if (!id || typeof id !== 'string') return fail(400, { error: 'Invalid size ID' });

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