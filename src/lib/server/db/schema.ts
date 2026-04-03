import {    pgTable, 
            serial, 
            varchar, 
            text, 
            integer, 
            boolean, 
            decimal, 
            // date, 
            timestamp,
            // unique,            
            } from 'drizzle-orm/pg-core';

import {  sizeTypeEnum, 
        //   rentalStatusEnum, 
        //   paymentOrderStatusEnum,
        //   guaranteeStatusEnum,
        //   paymentTypeEnum,
        //   paymentMethodEnum,
        //   reservationTypeEnum
        } from './enums.ts';


export const user = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('username').notNull().unique(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    token: text('token'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


export const product = pgTable('product', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),    
    color: varchar('color', { length: 7 }).notNull(),
    activo: boolean('activo').default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});


export const image = pgTable('images', {
    id: serial('id').primaryKey(),
    product_id: integer('product_id').notNull().references(() => product.id, { onDelete: 'cascade' }),  
    url: varchar('url', { length: 500 }).notNull(),
    urlThumbnail: varchar('url_thumbnail', { length: 500 }),
    file_name: varchar('file_name', { length: 255 }),  
    short_description: varchar('short_description', { length: 500 }),
    createdAt: timestamp('created_at').defaultNow(),
});


export const size = pgTable('size', {
    id: serial('id').primaryKey(),
    height: sizeTypeEnum('height').notNull(),
    size: varchar('size', { length: 10 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});


export const product_size = pgTable('product_size', {
    id: serial('id').primaryKey(),
    product_id: integer('product_id').notNull().references(() => product.id, { onDelete: 'cascade' }), 
    size_id: integer('size_id').notNull().references(() => size.id, { onDelete: 'cascade' }), 
    price: decimal('precio', { precision: 10, scale: 2 }).notNull(),
    quantity: integer('quantity').notNull().default(1),
    available_quantity: integer('available_quantity').notNull().default(1),
    reserved_quantity: integer('reserved_quantity').default(0),
});

































// export const client = pgTable('client', {
//     id: serial('id').primaryKey(),
//     name: varchar('name', { length: 100 }).notNull(),
//     last_name: varchar('last_name', { length: 100 }).notNull(),
//     email: varchar('email', { length: 255 }).notNull().unique(),
//     phone: varchar('phone', { length: 20 }),
//     document_type: varchar('document_type', { length: 20 }).default('license'), 
//     identification_document: varchar('identification_document', { length: 20 }).notNull().unique(), 
//     address: text('address'),
//     city: varchar('city', { length: 100 }),
//     postal_code: varchar('postal_code', { length: 20 }),
//     country: varchar('country', { length: 50 }).default('United States'),
//     birth_date: date('birth_date'),
//     createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
//     updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
// });


// export const categorie = pgTable('categorie', {
//     id: serial('id').primaryKey(),
//     name: varchar('name', { length: 50 }).notNull().unique(),
//     description: text('description'),
//     slug: varchar('slug', { length: 50 }).notNull().unique(),
//     order: integer('order').default(0),
//     active: boolean('active').default(true),
//     createdAt: timestamp('created_at').defaultNow(),
// });


// export const rental = pgTable('rental', {
//     id: serial('id').primaryKey(),
//     reservation_code: varchar('reservation_code', { length: 20 }).notNull().unique(),
//     client_id: integer('cliente_id').notNull().references(() => client.id),
//     start_date: date('start_date').notNull(),
//     end_date: date('end_date').notNull(), 
//     discount: decimal('discount', { precision: 10, scale: 2 }).default('0').notNull(),
//     tax_amount: decimal('tax_amount', { precision: 10, scale: 2 }).default('0').notNull(),
//     tax_percent: decimal('tax_percent', { precision: 5, scale: 2 }).default('0'),
//     subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
//     total: decimal('total', { precision: 10, scale: 2 }).notNull(), 
//     guaranty_amount: decimal('guaranty_amount', { precision: 10, scale: 2 }).default('0').notNull(),
//     guaranty_state: guaranteeStatusEnum('guaranty_state').default('pending').notNull(),  
//     state: rentalStatusEnum('state').default('draft').notNull(),
//     notes: text('notes'),
//     confirmadoAt: timestamp('confirmado_at', { withTimezone: true }),
//     preparadoAt: timestamp('preparado_at', { withTimezone: true }),
//     entregadoAt: timestamp('entregado_at', { withTimezone: true }),
//     devueltoAt: timestamp('devuelto_at', { withTimezone: true }),
//     completadoAt: timestamp('completado_at', { withTimezone: true }),
//     canceladoAt: timestamp('cancelado_at', { withTimezone: true }),
//     creadoAt: timestamp('creado_at', { withTimezone: true }).defaultNow().notNull(),
//     updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
// });


// export const rental_items = pgTable('rental_items', {
//     id: serial('id').primaryKey(),
//     rental_id: integer('rental_id').notNull().references(() => rental.id, { onDelete: 'cascade' }),
//     // variant_id: integer('variant_id').notNull().references(() => product_variant.id),  
//     quantity: integer('cantidad').notNull().default(1),
//     unit_price: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
//     subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
//     product_name: varchar('product_name', { length: 255 }),
//     variant_size: varchar('variant_size', { length: 10 }),
//     delivered: boolean('delivered').default(false),
//     returned: boolean('returned').default(false),
//     good_condition: boolean('good_condition').default(true),
//     notes: text('notes'),  
//     createdAt: timestamp('created_at').defaultNow(),
// });


// export const reservations_calendar = pgTable('reservations_calendar', {
//     id: serial('id').primaryKey(),
//     // variant_id: integer('variant_id').notNull().references(() => product_variant.id, { onDelete: 'cascade' }),
//     rental_id: integer('rental_id').references(() => rental.id, { onDelete: 'cascade' }),  
//     start_date: date('start_date').notNull(),
//     end_date: date('end_date').notNull(),  
//     reservation_type: reservationTypeEnum('reservation_type').default('rental').notNull(),
//     createdAt: timestamp('created_at').defaultNow(),
//     }, 
//     (table) => [
//         unique().on( table.start_date, table.end_date, table.rental_id),
//     ]
// );


// export const payment_orders = pgTable('payment_orders', {
//     id: serial('id').primaryKey(),  
//     rental_id: integer('rental_id').notNull().references(() => rental.id, { onDelete: 'cascade' }),
//     order_code: varchar('order_code', { length: 50 }).unique(),
//     rental_type: paymentTypeEnum('rental_type').default('rental').notNull(),
//     state: paymentOrderStatusEnum('state').default('pending').notNull(),
//     amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
//     amount_received: decimal('amount_received', { precision: 10, scale: 2 }),
//     payment_method: paymentMethodEnum('payment_method').default('credit_card'),
//     reference: varchar('reference', { length: 100 }),
//     payment_gate: varchar('payment_gate', { length: 50 }),
//     transaction_data: text('transaction_data'),
//     expiration_at: timestamp('expiration_at', { withTimezone: true }),
//     paid_at: timestamp('paid_at', { withTimezone: true }),
//     refunded_at: timestamp('refunded_at', { withTimezone: true }),
//     notes: text('notes'),  
//     createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
//     updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
// });


// export const rental_history = pgTable('rental_history', {
//     id: serial('id').primaryKey(),
//     rental_id: integer('rental_id').notNull().references(() => rental.id, { onDelete: 'cascade' }),  
//     previous_state: rentalStatusEnum('previous_state'),
//     new_state: rentalStatusEnum('new_state').notNull(),
//     createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
// });


// export const configuration = pgTable('configuration', {
//     id: serial('id').primaryKey(),
//     key: varchar('key', { length: 50 }).notNull().unique(),
//     value: text('value').notNull(),
//     value_type: varchar('value_type', { length: 20 }).default('string'),
//     description: text('description'),
//     updatedAt: timestamp('updated_at').defaultNow(),
// });

