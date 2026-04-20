// import type { ShoppingCarItem } from '$lib/components/forms/ProductForm/interfaces.js';
// import { db } from '$lib/server';
// import { client, payment_orders, rental, rental_items } from '$lib/server/db';
// import { error, json } from '@sveltejs/kit';
// import { eq } from 'drizzle-orm';

// interface checkoutRequest {
// 	rentalId: string;
// 	startDate: string;
// 	endDate: string;
// 	total: string;
// 	tax: string;
// 	orderItems: ShoppingCarItem[];
// 	name: string;
// 	last_name: string;
// 	email: string;
// 	phone: string;
// 	document_type: string;
// 	identification_document: string;
// }


// export async function POST({ request }) {
// 	const { rentalId, startDate, endDate, total, tax, orderItems, 
// 			name, last_name, email, phone, document_type, identification_document }: checkoutRequest = await request.json();

// 	console.log('Received checkout request:', {
// 		rentalId,
// 		startDate,
// 		endDate,
// 		total,
// 		tax,
// 		orderItems,
// 		name,
// 		last_name,
// 		email,
// 		phone,
// 		document_type,
// 		identification_document
// 	});
	

// 	try {
// 		const paymentTransaction = await db.transaction( async(tx) => {
// 			let clientId;			
			
// 			const clientExists = await tx.query.client.findFirst({
// 				where: eq(client.email, email)
// 			});

// 			if (clientExists) {
// 				clientId = clientExists.id;				
// 			} else {
// 				const clientCreate = await tx.insert(client).values({
// 					name: name,
// 					last_name: last_name,
// 					email: email,
// 					phone: phone,
// 					document_type: document_type,
// 					identification_document: identification_document,			
// 				}).returning();

// 				if(!clientCreate){
// 					error(400, 'Failed to create the client')
// 				}

// 				clientId = clientCreate[0].id;
// 			}			

// 			console.log('Client ID:', clientId);

// 			const insertRental = await tx.insert(rental).values({
// 			 	rentalId: rentalId,
// 				clientId: clientId,
// 				start_date: startDate,
// 				end_date: endDate,
// 				subtotal: total,
// 				tax_amount: tax,
// 				total: total + tax,
// 				state: 'in_process',				
// 			}).returning();

// 			if(!insertRental){
// 				throw new Error('Failed to create the rental');
// 			}

// 			console.log('Inserted Rental:', insertRental);

// 			const rentalItems = await tx.insert(rental_items).values(				
// 				orderItems.map(item => ({
// 					rental_id: insertRental[0].id,
// 					product_size_id: item.product.product_size_id,
// 					quantity: item.quantity,
// 					unit_price: item.product.price.toString(),
// 					subtotal: (item.product.price * item.quantity).toString(),
// 					product_name: item.product.name,
// 					size_size: item.product.size.toString(),
// 				})
// 			)).returning();

// 			if(!rentalItems){
// 				throw new Error('Failed to create the items of rental')
// 			}

// 			console.log('Inserted Rental Items:', rentalItems);

// 			const paymentsOrder = await tx.insert(payment_orders).values({
// 				orderId: insertRental[0].rentalId,
// 				rental_id: insertRental[0].id,
// 				state: "pending",
// 				amount: total,
// 			}).returning();

// 			if(!paymentsOrder){
// 				throw new Error('Failed to create the payment order')
// 			}

// 			console.log('Inserted Payment Order:', paymentsOrder);

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

