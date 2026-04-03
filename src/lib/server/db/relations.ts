import { relations } from 'drizzle-orm';
import {
	product,
	image,
	size,
	product_size,
	// client,
	// categorie,
	// rental,
	// rental_items,
	// reservations_calendar,
	// payment_orders,
	// rental_history,
} from './schema.ts';


export const product_relations = relations(product, ({ many }) => ({
		images: many(image),
		sizes: many(product_size),
	})
);


export const image_relations = relations(image, ({ one }) => ({
	product: one(product, {
			fields: [image.product_id],
			references: [product.id],
		}),
	})
);


export const size_relations = relations(size, ({ many }) => ({
		products: many(product_size),
	})
);


export const product_size_relations = relations(product_size, ({ one }) => ({
		product: one(product, {
			fields: [product_size.product_id],
			references: [product.id],
		}),
		size: one(size, {
			fields: [product_size.size_id],
			references: [size.id],
		})
	})
);



















// export const client_relations = relations(client, ({ many }) => ({
// 		rental: many(rental),
// 	})
// );


// export const categorie_relations = relations(categorie, ({ many }) => ({
// 		product: many(product),
// 	})
// );








// export const variantesProductoRelations = relations(product_variant, ({ one, many }) => ({
// 		product: one(product, {
// 			fields: [product_variant.product_id],
// 			references: [product.id],
// 		}),
// 		alquilerItems: many(rental_items),
// 		reservasCalendario: many(reservations_calendar),
// 	})
// );


// export const rental_relations = relations(rental, ({ one, many }) => ({
// 		client: one(client, {
// 			fields: [rental.client_id],
// 			references: [client.id],
// 		}),
// 		items: many(rental_items),
// 		ordenesPago: many(payment_orders),
// 		reservasCalendario: many(reservations_calendar),
// 		historial: many(rental_history),
// 	})
// );


// export const rental_items_relations = relations(rental_items, ({ one }) => ({
// 		rental: one(rental, {
// 			fields: [rental_items.rental_id],
// 			references: [rental.id],
// 		}),
// 		product_variant: one(product_variant, {
// 			fields: [rental_items.rental_id],
// 			references: [product_variant.id],
// 		}),
// 	})
// );


// export const reservations_calendar_relations = relations(reservations_calendar, ({ one }) => ({
// 		product_variant: one(product_variant, {
// 			fields: [reservations_calendar.rental_id],
// 			references: [product_variant.id],
// 		}),
// 		rental: one(rental, {
// 			fields: [reservations_calendar.rental_id],
// 			references: [rental.id],
// 		}),
// 	})
// );


// export const payment_orders_relations = relations(payment_orders, ({ one }) => ({
// 	rental: one(rental, {
// 			fields: [payment_orders.rental_id],
// 			references: [rental.id],
// 		}),
// 	})
// );


// export const rental_history_relations = relations(rental_history, ({ one }) => ({
//     rental: one(rental, {
// 			fields: [rental_history.rental_id],
// 			references: [rental.id],
//     	}),
//   	})
// );