import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { Configuration } from "$lib/server/types/models";


export const load: PageServerLoad = async({ fetch }) => {
    const response = await fetch(`/api/configuration`);

    if (!response.ok) error( response.status, 'Failed to fetch configurations');

    const configurations: Configuration[] = await response.json();

    return { configurations }
};


export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        if (!id || typeof id !== 'string') return fail(400, { error: 'Invalid configuration ID' });

        const response = await fetch(`/api/configuration/${id}`, {
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
