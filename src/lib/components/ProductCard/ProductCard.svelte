<script lang="ts">
    import { resolve } from "$app/paths";
    import type { ProductWithPriceInfo } from "$lib/server/types/Dto";

    let { product }: { product: ProductWithPriceInfo } = $props();

    let from_price = $derived.by(()=>{
        let price = '0.00'
        if( (product.sizes).length > 0 ){
            price = product.sizes[0].price
        }
        return price
    });
    
    let imgSrc: string =  $derived.by(()=>{
        let src = '#'
        if( (product.images).length > 0 ){
            src = product.images[0].url
        }
        return src;
    });
</script>

<article class="group md:col-span-2 xl:col-span-1">
    <div class="bg-surface-container-low relative mb-6 aspect-4/5 overflow-hidden rounded-3xl">
        <img
            alt={ product.slug }
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            data-alt={ product.description }
            src={ imgSrc } 
            loading="lazy"         
        />
        <div class="absolute inset-0 bg-black/5 transition-colors group-hover:bg-black/0"></div>
        <!-- <button class="bg-surface/90 text-primary absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-4 rounded-full px-8 py-3 text-sm font-semibold opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                onclick={()=>{ goto(resolve(`/catalog/${product.id}`))}}>
            Quick View
        </button> -->
        <a class="bg-surface/90 text-primary absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-8 py-3 text-sm font-semibold backdrop-blur-md transition-all duration-300
                    opacity-100 translate-y-0
                    [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-4 
                    group-hover:translate-y-0 group-hover:opacity-100"
                href={ resolve(`/catalog/${product.id}`) }>
            Quick View
        </a>
    </div>
    <div class="flex items-start justify-between px-2">
        <div>
            <h3 class="font-notoSerif text-on-surface mb-1 text-2xl">{ product.name }</h3>
            <!-- <p class="text-on-surface-variant font-medium">Bespoke Couture</p>  -->
        </div>
        <span class="text-primary text-xl font-semibold">${ from_price }</span>
    </div>
</article>