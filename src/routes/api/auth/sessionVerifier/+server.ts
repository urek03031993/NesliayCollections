import type { RequestHandler } from './$types';


export const GET: RequestHandler = async ({ cookies }) => {
    if(cookies.get('session')){
        return new Response(null, { status: 204 });
    }
    return new Response(null, { status: 401 }); 
}