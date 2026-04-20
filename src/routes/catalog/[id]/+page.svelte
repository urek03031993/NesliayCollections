<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';
	import Header from '$lib/components/Header/Header.svelte';
	import type { ProductSizesInfo } from '$lib/server/types/Dto';
	import ImageGalery from '$lib/components/ImageGalery/ImageGalery.svelte';
	import { cart } from '$lib/stores/store';
	import AviabilityCalendar from '$lib/components/AviabilityCalendar/AviabilityCalendar.svelte';
	import Accordion from '$lib/components/Accordion/Accordion.svelte';

	let { data }: PageProps = $props();

	let size_index: number | undefined = $state();
	let showCalendar = $state(false)
	let current_size: ProductSizesInfo | undefined = $derived.by(()=>{	
		if (data.product.sizes.length === 0) return undefined;

		if (size_index !== undefined && data.product.sizes[size_index]) {
			return data.product.sizes[size_index];
		}

		return data.product.sizes[0];
	});

	function addDress(){
		console.log('Selected size index:', size_index);
		if ( current_size ){
			cart.addItem({
				id: data.product.id,
				name: data.product.name,
				color: data.product.color,
				price: current_size.price,
				available_quantity: current_size.available_quantity,
				size_id: current_size.size_id,
				size: current_size.size,
				product_size_id: current_size.id,
				url: data.product.images.length > 0 ? data.product.images[0].url : '',
				shortDescription: data.product.images.length > 0 ? data.product.images[0].short_description : ''
			});
		}
		// console.log('Adding to cart:', {
		// 	id: data.product.id,
		// 	name: data.product.name,
		// 	color: data.product.color,
		// 	price: current_size.price,
		// 	available_quantity: current_size.available_quantity,
		// 	size_id: current_size.size_id,
		// 	size: current_size.size,
		// 	product_size_id: current_size.id,
		// 	url: data.product.images.length > 0 ? data.product.images[0].url : '',
		// 	shortDescription: data.product.images.length > 0 ? data.product.images[0].short_description : ''
		// });	
		console.log('Current cart items:', $cart);
	}	

	let initialRentals = [
		{ id: 1, start: '2026-04-10', end: '2026-04-15', quantity: 3, name: 'Reserva Semana Santa' },
		{ id: 2, start: '2026-04-20', end: '2026-04-22', quantity: 5, name: 'Evento Corporativo' }
	];
</script>

<Header />

<main class="mx-auto max-w-screen-2xl px-4 pt-32 pb-24 md:px-12">
	<a class="text-primary font-bold flex items-center gap-2 group mb-2.5" href={resolve('/catalog')}>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left-icon lucide-move-left group-hover:translate-x-1 transition-transform"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
		Back to Catalog 
	</a>

	<div class="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
		<ImageGalery images={ data.product.images }/>

		<!-- Product Info & Selectors -->
		<div class="flex flex-col gap-10 lg:sticky lg:top-32 lg:col-span-5">
			<div>
				<!-- <span class="text-tertiary font-manrope mb-3 block text-xs font-bold tracking-widest uppercase">
                    Special Occasion Collection
                </span> -->
				<h1 class="font-notoSerif text-on-surface mb-4 text-5xl leading-tight md:text-6xl">
					{ data.product.name }
				</h1>
				<div class="flex items-center gap-4">
					<span class="font-manrope text-primary text-2xl font-medium">${ current_size?.price }</span>
					<div class="bg-outline-variant/30 h-4 w-px"></div>					
				</div>
			</div>
            <div class="flex flex-col gap-4">
                <span class="text-on-surface-variant font-manrope text-sm font-semibold tracking-widest uppercase">
                    Description
                </span>
            	<p class="font-manrope text-on-surface-variant text-lg leading-relaxed italic">
                    "{ data.product.description }"
                </p>
            </div>
			
			<!-- Size Selection -->
			<div class="flex flex-col gap-4">
				<div class="flex items-end justify-between">
					<span class="text-on-surface-variant font-manrope text-sm font-semibold tracking-widest uppercase">
                        <label for="size">Select Size</label>
                    </span>					
				</div>

				<!-- class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 transition-all font-body" -->
				<div class="flex">
					<select id="size" 
							class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-amber-600/20 transition-all font-sans" 
							bind:value={ size_index }>
						{#each data.product.sizes as size, index (size.size_id) }
							<option value={ index }>{ size.size }</option>            
						{/each}
					</select>
				</div>
			</div>

			<Accordion title="Availability Calendar" open={ showCalendar }>
				<AviabilityCalendar totalQuantity={current_size?.available_quantity || 0} rentals={initialRentals} onDateSelect={null}/>
			</Accordion>

			

			<div class="mt-4 flex gap-4">				
				<button class="text-white font-manrope h-16 flex-1 rounded-full text-lg font-bold shadow-xl transition-all hover:opacity-90 active:scale-95 flex items-center gap-4 justify-center"
						style="background: linear-gradient(to right, #735c00, #d4af37);"
						onclick={()=>{ addDress(); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart flex"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
					<span>Add to Cart</span>  
				</button>
			</div>
		</div>
	</div>	
</main>

