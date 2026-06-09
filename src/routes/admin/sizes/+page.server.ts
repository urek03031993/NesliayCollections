import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { SizeObjDto } from "$lib/server/types/Dto";


export const load: PageServerLoad = async({ fetch }) => {
    const response = await fetch(`/api/size`);

    if (!response.ok) error( response.status, 'Failed to fetch sizes');

    const sizes: SizeObjDto[] = await response.json();       

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
