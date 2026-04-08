<script lang="ts">
	import type { ShoppingCarItem } from "../forms/ProductForm/interfaces";
    import { cart } from "$lib/stores/store";

    let { cartItem }: { cartItem: ShoppingCarItem } = $props();

    function addItem(){        
        cart.addItem(cartItem.product);		
	}

    function removeItem(productId: number, sizeId: number){
        cart.removeItem(productId, sizeId);		
	}

    function deleteItem(productId: number, sizeId: number){
        cart.deleteItem(productId, sizeId);		
	}
</script>


<div class="group bg-surface-container-lowest flex flex-col gap-8 rounded-3xl p-6 transition-all duration-500 hover:shadow-[0_8px_32px_rgba(28,28,24,0.06)] md:flex-row">
    <div class="bg-surface-container aspect-4/5 w-full overflow-hidden rounded-2xl md:w-48">
        <img class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={ cartItem.product.shortDescription }
                loading="lazy"
                src={ cartItem.product.url }/>
    </div>
    
    <div class="flex grow flex-col justify-between py-2">
        <div class="flex items-start justify-between">
            <div>
                <h3 class="font-notoSerif text-on-surface mb-4 text-2xl">{ cartItem.product.name }</h3>
                <!-- <p class="text-on-surface-variant mb-4 text-sm italic">
                    Bespoke Collection • Champagne Gold
                </p> -->
                <div class="flex gap-4">
                    <span class="bg-secondary-container text-on-secondary-container rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                        Size: { cartItem.product.size }
                    </span>
                    <!-- <span class="bg-surface-container-high text-on-surface-variant rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                        Custom Fitting
                    </span> -->
                </div>
            </div>
            <button class="text-on-surface-variant hover:text-error transition-colors" 
                    onclick={()=> deleteItem(cartItem.product.id, cartItem.product.size_id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                <!---->
            </button>
        </div>
        <div class="mt-8 flex items-end justify-between">
            <div class="bg-surface-container-low flex items-center gap-4 rounded-full px-4 py-2">
                <button class="text-primary transition-transform hover:scale-110 disabled:opacity-50"
                        disabled={ cartItem.quantity <= 0}
                        onclick={()=> removeItem(cartItem.product.id, cartItem.product.size_id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14"/></svg>                    
                    <!---->
                </button>
                <span class="font-manrope w-4 text-center text-sm font-bold">{ cartItem.quantity }</span>
                <button class="text-primary transition-transform hover:scale-110 disabled:opacity-50" 
                        disabled={ cartItem.quantity >= cartItem.product.available_quantity }
                        onclick={()=> addItem()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    <!---->
                </button>
            </div>
            <div class="text-right">
                <span class="text-on-surface-variant mb-1 block text-xs tracking-widest uppercase">
                    Subtotal
                </span>
                <span class="font-notoSerif text-primary text-2xl">${ cartItem.product.price * cartItem.quantity }</span>
            </div>
        </div>
    </div>
</div>