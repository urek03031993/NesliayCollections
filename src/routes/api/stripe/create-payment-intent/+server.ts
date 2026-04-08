// import { json } from '@sveltejs/kit';
// import { stripeConnection } from '$lib/stripe/stripe.js';
// import type { RequestHandler } from './$types';
// // import { db } from '$lib/server/index.js';
// // import { v4 as uuidv4 } from 'uuid';


// export const POST: RequestHandler = async ({ request }) => {
// 	const { total } = await request.json();

// 	const paymentIntent = await stripeConnection.paymentIntents.create({
// 		amount: total as number,
// 		currency: 'usd',
// 		automatic_payment_methods: {
// 			enabled: true
// 		}
// 	});

// 	return json({ clientSecret: paymentIntent.client_secret });
// }

// export async function POST({ request }) {
// 	try {
// 		const { items, customer, shipping, amount } = await request.json();
// 		const orderId = uuidv4();

// 		// Create order in database
// 		// const order = await prisma.order.create({
// 		// 	data: {
// 		// 		status: 'pending',
// 		// 		total: amount,
// 		// 		customerName: customer.name,`
// 		// 		customerEmail: customer.email,
// 		// 		customerPhone: customer.phone,
// 		// 		address: shipping.address,
// 		// 		city: shipping.city,
// 		// 		postalCode: shipping.postalCode,
// 		// 		country: shipping.country,
// 		// 		items: {
// 		// 			create: items.map(item => ({
// 		// 				productId: item.productId,
// 		// 				quantity: item.quantity,
// 		// 				size: item.size,
// 		// 				color: item.color,
// 		// 				price: item.price
// 		// 			}))
// 		// 		}
// 		// 	}
// 		// });

// 		// Create Stripe PaymentIntent
// 		const paymentIntent = await stripeConnection.paymentIntents.create({
// 			amount: Math.round(amount * 100),
// 			currency: 'eur',
// 			automatic_payment_methods: {
// 				enabled: true
// 			},
// 			metadata: {
// 				orderId: orderId
// 			}
// 		});

// 		// Update order with payment intent ID
// 		// await prisma.order.update({
// 		// 	where: { id: order.id },
// 		// 	data: {
// 		// 		stripePaymentId: paymentIntent.id,
// 		// 		status: 'processing'
// 		// 	}
// 		// });

// 		return json({
// 			clientSecret: paymentIntent.client_secret,
// 			orderId: orderId
// 		});
// 	} catch (error) {
// 		console.error('Error creating payment intent:', error);
// 		return json({ error: 'Failed to create payment intent' }, { status: 500 });
// 	}
// }
