import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { resolve } from "$app/paths";
import { configurationSchemaZod } from "$lib/zod/schema";
import z from "zod";


export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();

        const body = {
                key: formData.get('key')?.toString() ?? '',
                value: formData.get('value')?.toString() ?? '',
            };
        
        const configurationValidation = await configurationSchemaZod.safeParseAsync(body);

        if (!configurationValidation.success) {
            return fail(400, {
                errors: z.flattenError(configurationValidation.error).fieldErrors,
                data: body
            });
        };

        const response = await fetch(resolve('/api/configuration'), {
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