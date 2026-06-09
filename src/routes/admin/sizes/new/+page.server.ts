import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { resolve } from "$app/paths";
import { sizeSchemaZod } from "$lib/zod/schema";
import z from "zod";


export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();

        const body = {
                size: formData.get('size')?.toString() ?? '',
                height: formData.get('height')?.toString() ?? '',
            };
        
        const sizeValidation = await sizeSchemaZod.safeParseAsync(body);

        if (!sizeValidation.success) {
            return fail(400, {
                errors: z.flattenError(sizeValidation.error).fieldErrors,
                data: body
            });
        };

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