import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { stripeConnection } from '$lib/stripe/stripe';


export async function POST({ request }) {
    try {
        if(request.headers.get('authorization') !== `Bearer ${env.ADMIN_SECRET}`){
            return json('Invalid credentials' , { status: 401 });
        }

        const webhook = await stripeConnection.webhookEndpoints.create({
            enabled_events: ['payment_intent.payment_failed', 'payment_intent.succeeded'],
            url: 'https://mellow-frangollo-d41c8f.netlify.app/api/stripe/webhooks',
        });

        if (!webhook){
            console.error('Error al crear el webhook')
            return json({message: 'Error al crear el webhook'} , { status: 401 });
        }
       
        return json({message: 'Webhook creado satisfactoriamente', ...webhook} , { status: 201 });

    } catch (error) {
        console.error('Register error:', error);
        return json('Register error', { status: 500 });
    }
};