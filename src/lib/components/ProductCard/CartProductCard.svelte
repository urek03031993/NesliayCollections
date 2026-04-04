<script lang="ts">
	import type { ShoppingCarItem } from "../forms/ProductForm/interfaces";

    let { cartItem }: { cartItem: ShoppingCarItem } = $props();
</script>


<div class="group bg-surface-container-lowest flex flex-col gap-8 rounded-3xl p-6 transition-all duration-500 hover:shadow-[0_8px_32px_rgba(28,28,24,0.06)] md:flex-row">
    <div class="bg-surface-container aspect-4/5 w-full overflow-hidden rounded-2xl md:w-48">
        <img class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt=""
                data-alt="Ethereal silk evening gown in champagne"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDExP0KhjptA0Yi9Oz1Wms8lH6GcPGf5XYtMFqfaUoCyY3o2_eUmfd51Dv124cXLsRUDbC8zV877eVPmWkvsWSdP0t9ZEgHIs7qwPBZjul-1Du-dXqmehGZolitEz13wR6f91g2XxMiNlzjcKxLXHHHRFPCXsJfgn_NqqAWZxSQx6cKoAZeA6D5rNnLlR96yzB5OWWJOawUWV4EdkwCNhPQIGVUXDYlgjcT0dlg5JxRRKo2HBZ7ZAAN3r_SL5ryhn6NRTCsu2rhsMRt"
        />
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
            <button class="text-on-surface-variant hover:text-error transition-colors">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        <div class="mt-8 flex items-end justify-between">
            <div class="bg-surface-container-low flex items-center gap-4 rounded-full px-4 py-2">
                <button class="text-primary transition-transform hover:scale-110">
                    <span class="material-symbols-outlined text-sm">remove</span>
                </button>
                <span class="font-manrope w-4 text-center text-sm font-bold">{ cartItem.quantity }</span>
                <button class="text-primary transition-transform hover:scale-110">
                    <span class="material-symbols-outlined text-sm">add</span>
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