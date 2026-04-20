import type {	SizeType, 
				ProductCategory, 
				// RentalStatus,
				// PaymentOrderStatus, 
				// GuaranteeStatus,
				// PaymentType,
				// PaymentMethod,
				// ReservationType
			} from './models';


export interface ProductDto {
	name: string;
	slug: string;
	description?: string;
	color: string;
	category: ProductCategory;
}

export interface UpdateProductDto extends Partial<ProductDto> {
	activo?: boolean;
}

export interface SizeDto {
	size: string;
	height: SizeType;
}


export interface RentalDto {
	rentalId: string;
    start_date: string;
    end_date: string;
    subtotal: string;
    total: string;
    tax_amount: string | undefined;
    tax_percent: string | null | undefined;
    state: 'draft' | 'prebook' | 'reserved' | 'cancelled';
    notes: string | null | undefined;
}


export interface ProductSizesInfo {
	id: number; 
	size_id: number; 
	size: string;
	price: number; 
	available_quantity: number;
}


export interface ProductSizesPriceInfo {
	price: string; 
}

export interface ProductImageInfo {
	id: number;
	url: string;
	short_description: string;
}


export interface ProductWithSizesInfo {
	id: number;
	name: string;
	slug: string;
	description?: string;
	color: string;
	category: ProductCategory;
	sizes: ProductSizesInfo[];
	images: ProductImageInfo[];
}


export interface ProductWithPriceInfo {
	id: number;
	name: string;
	slug: string;
	description?: string;
	color: string;
	sizes: ProductSizesPriceInfo[];
	images: ProductImageInfo[];	
}

































// // ==========================================
// // DTOs USER
// // ==========================================
// export interface CreateUserDTO {
// 	username: string;
// 	email: string;
// 	token?: string;
// }


// // ==========================================
// // DTOs CLIENTES
// // ==========================================
// export interface CreateClienteDTO {
// 	nombre: string;
// 	apellido: string;
// 	email: string;
// 	telefono?: string;
// 	telefonoAlternativo?: string;
// 	tipoDocumento?: string;
// 	numeroDocumento?: string;
// 	direccion?: string;
// 	ciudad?: string;
// 	codigoPostal?: string;
// 	pais?: string;
// 	fechaNacimiento?: string | Date;
// 	notas?: string;
// }


// export interface UpdateClienteDTO extends Partial<CreateClienteDTO> {
//   	activo?: boolean;
// }


// // ==========================================
// // DTOs CATEGORÍAS
// // ==========================================
// export interface CreateCategoriaDTO {
// 	nombre: string;
// 	descripcion?: string;
// 	slug?: string;
// 	orden?: number;
// }


// export interface UpdateCategoriaDTO extends Partial<CreateCategoriaDTO> {
//   	activa?: boolean;
// }


// // ==========================================
// // DTOs VARIANTES
// // ==========================================
// export interface CreateVarianteDTO {
// 	productoId: number;
// 	sku?: string;
// 	tamano: SizeType;
// 	talla: string;
// 	tallaDescripcion?: string;
// 	precio: string | number;
// 	precioCompare?: string | number;
// 	cantidadTotal?: number;
// 	medidasBusto?: string;
// 	medidasCintura?: string;
// 	medidasCadera?: string;
// 	largo?: string;
// 	notas?: string;
// }

// export interface UpdateVarianteDTO extends Partial<CreateVarianteDTO> {
// 	cantidadDisponible?: number;
// 	cantidadReservada?: number;
// 	activa?: boolean;
// }

// // ==========================================
// // DTOs ALQUILERES
// // ==========================================
// export interface AlquilerItemDTO {
// 	varianteId: number;
// 	cantidad?: number;
// 	// Si quieres override del precio actual
// 	precioUnitarioOverride?: string | number;
// }

// export interface CreateAlquilerDTO {
// 	clienteId: number;
// 	items: AlquilerItemDTO[];
	
// 	// Fechas
// 	fechaInicio: string | Date;
// 	fechaFin: string | Date;
// 	fechaEvento?: string | Date;
// 	horaRetiro?: string;
// 	horaDevolucion?: string;
	
// 	// Descuento
// 	descuento?: string | number;
// 	codigoDescuento?: string;
// 	taxPorcentaje?: string | number;
	
// 	// Garantía
// 	montoGarantia?: string | number;
	
// 	// Notas
// 	notasCliente?: string;
// 	notasInternas?: string;
	
// 	// Quién crea (si es admin)
// 	creadoPor?: string;
// }

// export interface UpdateAlquilerDTO {
// 	fechaInicio?: string | Date;
// 	fechaFin?: string | Date;
// 	fechaEvento?: string | Date;
// 	horaRetiro?: string;
// 	horaDevolucion?: string;
// 	notasCliente?: string;
// 	notasInternas?: string;
// 	modificadoPor?: string;
// }

// export interface CambiarEstadoAlquilerDTO {
// 	estado: RentalStatus;
// 	motivo?: string;
// 	cambiadoPor?: string;
// }

// // ==========================================
// // DTOs ÓRDENES DE PAGO
// // ==========================================
// export interface CreateOrdenPagoDTO {
// 	alquilerId: number;
// 	tipo?: PaymentType;
// 	monto: string | number;
// 	metodoPago?: PaymentMethod;
// 	vencimientoAt?: string | Date;
// 	notas?: string;
// }

// export interface ProcesarPagoDTO {
// 	ordenId: number;
// 	referenciaExterna?: string;
// 	pasarelaPago?: string;
// 	datosTransaccion?: string; // JSON string
// 	montoRecibido?: string | number;
// }

// export interface ReembolsarPagoDTO {
// 	ordenId: number;
// 	monto?: string | number; // Si es reembolso parcial
// 	motivo?: string;
// }

// // ==========================================
// // DTOs RESERVAS CALENDARIO
// // ==========================================
// export interface CreateReservaCalendarioDTO {
// 	varianteId: number;
// 	alquilerId?: number;
// 	fechaInicio: string | Date;
// 	fechaFin: string | Date;
// 	tipo?: ReservationType;
// 	motivo?: string;
// 	creadoPor?: string;
// }

// // ==========================================
// // DTOs CHECK DISPONIBILIDAD
// // ==========================================
// export interface CheckDisponibilidadDTO {
// 	varianteId: number;
// 	fechaInicio: string | Date;
// 	fechaFin: string | Date;
// }

// export interface DisponibilidadResult {
// 	disponible: boolean;
// 	varianteId: number;
// 	fechaInicio: Date;
// 	fechaFin: Date;
// 	conflictos?: {
// 		tipo: ReservationType;
// 		fechaInicio: Date;
// 		fechaFin: Date;
// 	}[];
// }