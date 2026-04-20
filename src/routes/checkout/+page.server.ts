import { fail, type Actions } from "@sveltejs/kit";

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