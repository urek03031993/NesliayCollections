import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { Configuration } from "$lib/server/types/models";
import { configurationSchemaZod } from "$lib/zod/schema";
import z from "zod";


export const load: PageServerLoad = async({ params, fetch }) => {
    const response = await fetch(`/api/configuration/${params.id}`);

    if (!response.ok) return error(404, 'Configuration not found');
    
    const configuration: Configuration = await response.json();    

    return configuration
};


export const actions = {
    default: async ({ request, fetch, params }) => {
        const formData = await request.formData();
        const body = {
                key: formData.get('key') ?? '',
                value: formData.get('value') ?? '',
            };

        const configurationValidation = await configurationSchemaZod.safeParseAsync(body);
        
        if (!configurationValidation.success) {
            return fail(400, {
                errors: z.flattenError(configurationValidation.error).fieldErrors,
                data: body
            });
        }

        const response = await fetch(`/api/configuration/${params.id}`, {
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