// import { json } from '@sveltejs/kit';
// import type { RequestHandler } from './$types';
// import { stripeConnection } from '$lib/stripe/stripe';


// // export async function POST({ request }) {
// // 	const payload = await request.text();
// // 	const signature = request.headers.get('stripe-signature');

// // 	let event;
// // 	try {
// // 		event = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);
// // 	} catch (err) {
// // 		return new Response('Webhook error', { status: 400 });
// // 	}

// // 	if (event.type === 'checkout.session.completed') {
// // 		const session = event.data.object;
// // 		// Aquí actualizas tu base de datos: marcar orden como pagada
// // 		console.log('Pago exitoso:', session.id);
// // 	}

// // 	return new Response('OK');
// // }