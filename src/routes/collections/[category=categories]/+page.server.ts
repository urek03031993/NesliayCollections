import type { PageServerLoad } from "./$types";
import type { ProductWithPriceInfo } from "$lib/server/types/Dto";


export const load: PageServerLoad = async({ fetch, params }) => {
    const category = params.category;

    const response = await fetch('/api/products?category=' + category);

    const products: ProductWithPriceInfo[] = await response.json();

    return { products: products }   
};
