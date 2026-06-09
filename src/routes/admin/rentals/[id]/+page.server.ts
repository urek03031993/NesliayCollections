import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { buildRequestBody } from "$lib/utils/utils";
import type { Client, RentalItem } from "$lib/server/types/models";


interface rental {
    id: number;
    updatedAt: Date;
    rentalId: string;
    clientId: number;
    start_date: string;
    end_date: string;
    tax_amount: string;
    tax_percent: string | null;
    subtotal: string;
    total: string;
    state: "draft" | "prebook" | "reserved" | "cancelled";
    notes: string | null;
    creadoAt: Date;
    items: RentalItem[];
    client: Client;
}


export const load: PageServerLoad = async({ params, fetch }) => {
    const response = await fetch(`/api/rentals/${params.id}`);
    
    const rental: rental = await response.json();

    return rental
};


export const actions = {
    default: async ({ request, fetch, params }) => {
        const formData = await request.formData();

        const body = buildRequestBody(formData);

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