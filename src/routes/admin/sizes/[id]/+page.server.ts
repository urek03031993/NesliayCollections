import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { Size } from "$lib/server/types/models";


export const load: PageServerLoad = async({ params, fetch }) => {
    const response = await fetch(`/api/size/${params.id}`);

    if (!response.ok) return error(404, 'Size not found');
    
    const size: Size = await response.json();    

    return size
};


export const actions = {
    default: async ({ request, fetch, params }) => {
        const formData = await request.formData();
        const body = {
                size: formData.get('size') ?? '',
                height: formData.get('height') ?? '',
            };

        const response = await fetch(`/api/size/${params.id}`, {
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