import type { Actions } from "./$types";
import { error, fail } from "@sveltejs/kit";

export const actions = {
    default: async ({ request, cookies, fetch }) => {
        const data = await request.formData();

        const username = data.get('username')
        const password = data.get('password')

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',            
            body: JSON.stringify({
                username: username,
                password: password
            })
        });        
        
        const json = await response.json();

        if (!response.ok){
            if (response.status === 500 && response.statusText === 'BackendOffline'){
                error(500, json)
            }

            return fail(response.status, json);  
        } 
        
        cookies.set('session', 'admin-neliay', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 8,
        });       

        return { success: true, json }
    }
         
} satisfies Actions;