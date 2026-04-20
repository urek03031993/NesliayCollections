import type { ProductCategory, Size } from "$lib/server/types/models";


export interface ProductForm {
    name: string;
    color: string; 
    description?: string;
    price: number;
    quantity: number; 
    size_id: number;
    activo: boolean;
    sizes: Size[];
}

export interface CreateProduct {
    name: string,
    color: string, 
    description: string,
    category: ProductCategory;
    price: number, 
    quantity: number, 
    size_id: number, 
    activo: boolean
}

export interface UpdateProduct extends Partial<CreateProduct>{
    id?: number
}

export interface ProductForm1 {
    name: string;
    color: string; 
    description?: string;
    price: number;
    quantity: number; 
    size_id: number;
    activo: boolean;
}

export interface ProductForm2 {
    productForm: ProductForm1;
    sizes: Size[];
}


export interface ShoppingCarProduct {
    id: number;
    name: string;
    color: string; 
    price: number;
    available_quantity: number; 
    size_id: number;
    size: string;
    url: string;
    shortDescription: string;
    product_size_id: number,
}


export interface ShoppingCarItem {
    product: ShoppingCarProduct;
    quantity: number; 
}


export interface ShoppingCarItemImages {
    id: number, 
    url: string, 
    product_id: number, 
    short_description: string
}