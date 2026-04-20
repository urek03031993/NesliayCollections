import { pgEnum } from 'drizzle-orm/pg-core';

export const sizeTypeEnum = pgEnum('size_type', ['child', 'adult']);

export const productCategoryTypeEnum = pgEnum('product_category', [
    'mommy_and_me',
    'boys',
    'girls',
]);

export const rentalStatusEnum = pgEnum('rental_status', [
    'draft',
    'prebook',
    'reserved',
    'cancelled'
]);

export const paymentOrderStatusEnum = pgEnum('payment_order_status', [
    'pending',
    'confirmed',
    'refunded',
    'failed'
]);


export const guaranteeStatusEnum = pgEnum('guarantee_status', [
    'pending',
    'held',
    'returned',
    'partially_returned'
]);

export const paymentTypeEnum = pgEnum('payment_type', [
    'rental',
    'guarantee',
    'refund',
    'adjustment'
]);
 
export const paymentMethodEnum = pgEnum('payment_method', [
    'credit_card',
    'debit_card',
    'bank transfer',
    'cash',
    'PayPal',
    'MercadoPago',
    'other'
]);

export const reservationTypeEnum = pgEnum('reservation_type', [
    'rental',
    'maintenance',
    'manual_lock',
    'cleaning'
]);