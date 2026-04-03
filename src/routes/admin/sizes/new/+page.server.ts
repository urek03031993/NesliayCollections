import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { resolve } from "$app/paths";
import { buildRequestBody } from "$lib/utils/utils";
import type { SizeDto } from "$lib/server/types/Dto";


export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();

        const body: Partial<SizeDto> = buildRequestBody(formData);

        const response = await fetch(resolve('/api/size'), {
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