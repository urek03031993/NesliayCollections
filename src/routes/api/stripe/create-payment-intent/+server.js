// import { stripe } from '$lib/stripe.js';
// import prisma from '$lib/prisma.js';
// import { json } from '@sveltejs/kit';

// export async function POST({ request }) {
// 	try {
// 		const { items, customer, shipping, amount } = await request.json();
		
// 		// Create order in database
// 		const order = await prisma.order.create({
// 			data: {
// 				status: 'pending',
// 				total: amount,
// 				customerName: customer.name,
// 				customerEmail: customer.email,
// 				customerPhone: customer.phone,
// 				address: shipping.address,
// 				city: shipping.city,
// 				postalCode: shipping.postalCode,
// 				country: shipping.country,
// 				items: {
// 					create: items.map(item => ({
// 						productId: item.productId,
// 						quantity: item.quantity,
// 						size: item.size,
// 						color: item.color,
// 						price: item.price
// 					}))
// 				}
// 			}
// 		});
		
// 		// Create Stripe PaymentIntent
// 		const paymentIntent = await stripe.paymentIntents.create({
// 			amount: Math.round(amount * 100), // Convert to cents
// 			currency: 'eur',
// 			automatic_payment_methods: {
// 				enabled: true
// 			},
// 			metadata: {
// 				orderId: order.id
// 			}
// 		});
		
// 		// Update order with payment intent ID
// 		await prisma.order.update({
// 			where: { id: order.id },
// 			data: {
// 				stripePaymentId: paymentIntent.id,
// 				status: 'processing'
// 			}
// 		});
		
// 		return json({
// 			clientSecret: paymentIntent.client_secret,
// 			orderId: order.id
// 		});
// 	} catch (error) {
// 		console.error('Error creating payment intent:', error);
// 		return json({ error: 'Failed to create payment intent' }, { status: 500 });
// 	}
// }
