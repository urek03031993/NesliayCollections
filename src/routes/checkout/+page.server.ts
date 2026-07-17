import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Configuration } from "$lib/server/types/models";


export const load: PageServerLoad = async({ fetch }) => {
    const response = await fetch('/api/configuration?key=delivery&key=tax');

    const configurations: Configuration[] = await response.json();
    return { configurations: configurations }
};


export const actions  = {
    default: async ({ request, fetch }) => {
        const data = await request.formData()
        const cartItems = JSON.parse( data.get('cartItems') as string ?? '' );
        const orderId = crypto.randomUUID();   

        const response = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',            
            body: JSON.stringify({ orderId: orderId, cartItems: cartItems })
        });

        const jsonResponse = await response.json();    

        if( !response.ok ){
            return fail(400, {
                errors: jsonResponse as string,  
            });           
        };
        
        return { success: true, product: jsonResponse  }; 
    } 
} satisfies Actions;