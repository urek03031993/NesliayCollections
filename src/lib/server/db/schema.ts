import {    pgTable, 
            serial, 
            varchar, 
            text, 
            integer, 
            boolean, 
            decimal, 
            date, 
            timestamp,
            // unique,            
            } from 'drizzle-orm/pg-core';

import {  sizeTypeEnum, 
          rentalStatusEnum, 
          paymentOrderStatusEnum,
        //   guaranteeStatusEnum,
        //   paymentTypeEnum,
          paymentMethodEnum,
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
    size: varchar('size', { length: 50 }).notNull().unique(),
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


export const rental = pgTable('rental', {
    id: serial('id').primaryKey(),
    rentalId: varchar('rental_id').unique().notNull(),
    start_date: date('start_date').notNull(),
    end_date: date('end_date').notNull(),
    tax_amount: decimal('tax_amount', { precision: 10, scale: 2 }).default('0').notNull(),
    tax_percent: decimal('tax_percent', { precision: 5, scale: 2 }).default('0'),
    subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
    total: decimal('total', { precision: 10, scale: 2 }).notNull(), 
    state: rentalStatusEnum('state').default('draft').notNull(),
    notes: text('notes'),
    creadoAt: timestamp('creado_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});


export const rental_items = pgTable('rental_items', {
    id: serial('id').primaryKey(),
    rental_id: integer('rental_id').notNull().references(() => rental.id, { onDelete: 'cascade' }),
    product_size_id: integer('product_size_id').notNull().references(() => product_size.id),  
    quantity: integer('cantidad').notNull().default(1),
    unit_price: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
    subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
    product_name: varchar('product_name', { length: 255 }),
    size_size: varchar('size_size', { length: 10 }),
    createdAt: timestamp('created_at').defaultNow(),
});


export const payment_orders = pgTable('payment_orders', {
    id: serial('id').primaryKey(),
    rental_id: integer('rental_id').notNull().references(() => rental.id, { onDelete: 'cascade' }),
    orderId: varchar('order_id', { length: 50 }).unique(),
    state: paymentOrderStatusEnum('state').default('pending').notNull(),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    amount_received: decimal('amount_received', { precision: 10, scale: 2 }),
    payment_method: paymentMethodEnum('payment_method').default('debit_card'),
    reference: varchar('reference', { length: 100 }),
    payment_gate: varchar('payment_gate', { length: 50 }),
    transaction_data: text('transaction_data'),
    paid_at: timestamp('paid_at', { withTimezone: true }),
    refunded_at: timestamp('refunded_at', { withTimezone: true }),
    notes: text('notes'),  
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
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


// export const configuration = pgTable('configuration', {
//     id: serial('id').primaryKey(),
//     key: varchar('key', { length: 50 }).notNull().unique(),
//     value: text('value').notNull(),
//     value_type: varchar('value_type', { length: 20 }).default('string'),
//     description: text('description'),
//     updatedAt: timestamp('updated_at').defaultNow(),
// });

