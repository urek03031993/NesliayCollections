import type { PageServerLoad } from "./$types";
import type { ProductWithPriceInfo } from "$lib/server/types/Dto";


export const load: PageServerLoad = async({ fetch }) => {
    const response = await fetch('/api/products');

    const products: ProductWithPriceInfo[] = await response.json();

    return { products: products }   
};
