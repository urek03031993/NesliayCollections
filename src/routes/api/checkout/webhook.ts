// import { json } from '@sveltejs/kit';
// import type { RequestHandler } from './$types';
// import { stripeConnection } from '$lib/stripe/stripe';


// export const GET: RequestHandler = async ({ url }) => {
// 	const sessionId = url.searchParams.get('session_id');

// 	if (!sessionId) return new Response(JSON.stringify({ error: 'No session ID' }), { status: 400 });

// 	try {
// 		const session = await stripeConnection.checkout.sessions.retrieve(sessionId);

// 		if (session.payment_status === 'paid') {
// 			// Aquí puedes guardar en tu DB que la orden está pagada
// 			// const orderId = session.metadata.order_id;
// 			// await db.orders.update({ id: orderId, status: 'paid', paymentId: session.payment_intent });

// 			return json({
// 				status: 'paid',
// 				orderId: session.metadata?.order_id,
// 				amount: session.amount_total ? session.amount_total / 100 : 0,
// 				customerEmail: session.customer_email,
// 				paymentIntent: session.payment_intent
// 			});
// 		} else {
// 			return new Response(JSON.stringify({ status: 'unpaid' }), {
// 				headers: { 'Content-Type': 'application/json' }
// 			});
// 		}

// 	} catch (error) {
// 		return new Response(JSON.stringify({ error: error }), {
// 			status: 500,
// 			headers: { 'Content-Type': 'application/json' }
// 		});
// 	}
// }






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