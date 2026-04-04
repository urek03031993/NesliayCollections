import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => { 
    const isProtectedRoute = event.url.pathname.startsWith('/admin');

    if ( isProtectedRoute ) {
        const authenticated = event.cookies.get('session');               

        if ( authenticated === undefined ){
            throw redirect(303, '/');
        }       
    }
    
    const response = await resolve(event);
    return response;
}
