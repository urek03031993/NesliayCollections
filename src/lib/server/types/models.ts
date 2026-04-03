import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

import {
	user,
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
} from '../db/schema';


// ==========================================
// TIPOS DE ENUMS
// ==========================================
export type SizeType = 'child' | 'adult';
export type RentalStatus = 'borrador' | 'confirmado' | 'en_proceso' | 'entregado' | 'devuelto' | 'completado' | 'atrasado' | 'cancelado';
export type PaymentOrderStatus = 'pendiente' | 'confirmado' | 'reembolsado' | 'fallido';
export type GuaranteeStatus = 'pendiente' | 'retenida' | 'devuelta' | 'parcialmente_devuelta';
export type PaymentType = 'alquiler' | 'garantia' | 'reembolso' | 'ajuste';
export type PaymentMethod = 'tarjeta_credito' | 'tarjeta_debito' | 'transferencia' | 'efectivo' | 'paypal' | 'mercadopago' | 'otro';
export type ReservationType = 'alquiler' | 'mantenimiento' | 'bloqueo_manual' | 'limpieza';


// ==========================================
// MODELOS BASE (SELECT)
// ==========================================
export type Size = InferSelectModel<typeof size>;
export type User = InferSelectModel<typeof user>;
export type Image = InferSelectModel<typeof image>;
export type Product = InferSelectModel<typeof product>;
export type ProductSize = InferSelectModel<typeof product_size>;
// export type Client = InferSelectModel<typeof client>;
// export type Categorie = InferSelectModel<typeof categorie>;
// export type Rental = InferSelectModel<typeof rental>;
// export type RentalItem = InferSelectModel<typeof rental_items>;
// export type ReservationsCalendar = InferSelectModel<typeof reservations_calendar>;
// export type PaymentOrder = InferSelectModel<typeof payment_orders>;
// export type RentalHistory = InferSelectModel<typeof rental_history>;
// export type Configuration = InferSelectModel<typeof configuration>;


// ==========================================
// MODELOS PARA INSERT (NEW)
// ==========================================
export type NewSize = InferInsertModel<typeof size>;
export type NewUser = InferInsertModel<typeof user>;
export type NewImage = InferInsertModel<typeof image>;
export type NewProduct = InferInsertModel<typeof product>;
export type NewProductSize = InferInsertModel<typeof product_size>;
// export type NewClient = InferInsertModel<typeof client>;
// export type NewCategorie = InferInsertModel<typeof categorie>;
// export type NewProductImage = InferInsertModel<typeof product_image>;
// export type NewProductVariant = InferInsertModel<typeof product_variant>;
// export type NewRental = InferInsertModel<typeof rental>;
// export type NewRentalItem = InferInsertModel<typeof rental_items>;
// export type NewReservationsCalendar = InferInsertModel<typeof reservations_calendar>;
// export type NewPaymentOrder = InferInsertModel<typeof payment_orders>;
// export type NewRentalHistory = InferInsertModel<typeof rental_history>;
// export type NewConfiguration = InferInsertModel<typeof configuration>;


// ==========================================
// MODELOS CON RELACIONES (EXTENDED)
// ==========================================
// export interface ProductWithRelations extends Product {
// 	categorie?: Categorie;
// 	variants: ProductVariantWithRelations[];
// 	images: ProductImage[];
// }

// export interface ProductVariantWithRelations extends ProductVariant {
// 	product?: Product;
// 	reservations?: ReservationsCalendar[];
// }

// export interface RentalWithRelations extends Rental {
// 	client: Client;
// 	items: ( RentalItem & {
// 		variant: ProductVariant & {
// 		product: Product;
// 		};
// 	})[];
// 	payments_orders: PaymentOrder[];
// 	rental_history: RentalHistory[];
// 	reservations_calendar?: ReservationsCalendar[];
// }

// export interface ClientWithRentals extends Client {
//   	rentals: Rental[];
// }

// export interface CategorieWithProducts extends Categorie {
//   	products: Product[];
// }

// export interface PaymentOrderWithRental extends PaymentOrder {
//   	rental: Rental;
// }