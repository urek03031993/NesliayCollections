import type { PageServerLoad } from "./$types";
import type { ProductWithSizesInfo } from "$lib/server/types/Dto";


export const load: PageServerLoad = async({ params, fetch }) => {
    const response = await fetch(`/api/products/${params.id}`);
    
    const product: ProductWithSizesInfo = await response.json();

    return { product: product }
};