// import { db } from '$lib/server';
// import { payment_orders, rental, rental_items } from '$lib/server/db';
// import { json } from '@sveltejs/kit';
// import { v4 } from 'uuid';


// export async function POST({ request }) {
// 	const { startDate, endDate, total, tax, orderItems } = await request.json();

// 	try {
// 		const paymentTransaction = await db.transaction( async(tx) => {

// 			const insertRental = await tx.insert(rental).values({
// 				rentalId: v4(),
// 				start_date: startDate,
// 				end_date: endDate,
// 				subtotal: total,
// 				tax_amount: tax,
// 				total: total + tax,
// 				state: 'in_process',				
// 			}).returning();

// 			if(!insertRental){
// 				throw new Error('Failed to create the rental')
// 			}

// 			const rentalItems = await tx.insert(rental_items).values(				
// 				orderItems.map(item => ({
// 					rental_id: insertRental[0].id,
// 					product_size_id: item.product.id,
// 					quantity: item.quantity,
// 					unit_price: item.product.price,
// 					subtotal: item.product.price * item.quantity,
// 					product_name: item.product.name,
// 					size_size: item.product.size,
// 				}))).returning();

// 			if(!rentalItems){
// 				throw new Error('Failed to create the items of rental')
// 			}

// 			const paymentsOrder = await tx.insert(payment_orders).values({
// 				orderId: insertRental[0].rentalId,
// 				rental_id: insertRental[0].id,
// 				state: "pending",
// 				amount: total,
// 			}).returning();

// 			if(!paymentsOrder){
// 				throw new Error('Failed to create the payment order')
// 			}

// 			return { rental: insertRental, rentalItems: rentalItems, paymentsOrder: paymentsOrder }
// 		});	

// 		return json({ paymentTransaction }, { status: 201 });

// 	} catch (error) {
// 		console.log(error)
// 		return new Response(JSON.stringify({ error: error }), {
// 			status: 500,
// 			headers: { 'Content-Type': 'application/json' }
// 		});
// 	}
// }



// // export async function POST({ request }) {
// // 	const { orderId, items, customerEmail }: stripePayment = await request.json();

// // 	try {
// // 		const session = await stripeConnection.checkout.sessions.create({
// // 			payment_method_types: ['card'],
// // 			line_items: items.map(item => ({
// // 				price_data: {
// // 					currency: 'usd',
// // 					product_data: { name: item.product.name, description: item.product.shortDescription || '' },
// // 					unit_amount: Math.round(item.product.price * 100),
// // 				},
// // 				quantity: item.quantity,
// // 			})),
// // 			mode: 'payment',
// // 			customer_email: customerEmail,
// // 			metadata: {
// // 				order_id: orderId,
// // 				internal_reference: `ORDER-${orderId}`
// // 			},
// // 			success_url: `${request.headers.get('origin')}/confirmacion-pago?session_id={CHECKOUT_SESSION_ID}`,
// // 			cancel_url: `${request.headers.get('origin')}/carrito?canceled=true`,
// // 		});

// // 		return new Response(JSON.stringify({ sessionId: session.id, url: session.url }), {
// // 			headers: { 'Content-Type': 'application/json' }
// // 		});

// // 	} catch (error) {
// // 		return new Response(JSON.stringify({ error: error }), {
// // 			status: 500,
// // 			headers: { 'Content-Type': 'application/json' }
// // 		});
// // 	}
// // }
