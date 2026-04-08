<script lang="ts">
	import { resolve } from '$app/paths';
	import { cart, cartTotal } from '$lib/stores/store';
	import Header from '$lib/components/Header/Header.svelte';
	import CartProductCard from '$lib/components/ProductCard/CartProductCard.svelte';	
	import Modal from '$lib/components/Modal/Modal.svelte';
	import StripePaymentsForm from '$lib/components/forms/StripePaymentForm/StripePaymentsForm.svelte';

	let showModal: boolean = $state(false);

	let cartItems: string = $derived(JSON.stringify($cart));
	let startDate: Date | undefined = $state();
	let endDate: Date | undefined = $state();
	let invalidRental = $state(false)

</script>

<Header />

<main class="mx-auto w-full max-w-7xl grow px-6 pt-32 pb-24 md:px-12">
	<div class="mb-12">
		<h1 class="font-notoSerif text-primary mb-4 text-5xl tracking-tight md:text-6xl">
			Your Selection
		</h1>
		<p class="text-on-surface-variant font-manrope text-xs tracking-wide uppercase">
			Curating your bespoke journey
		</p>
	</div>

	{#if $cart.length > 0}
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
			<div class="space-y-8 lg:col-span-7">
				{#each $cart as item(item.product.id + item.product.size_id)}
					<CartProductCard cartItem = { item } />
				{/each}				
			</div>

			<div class="lg:col-span-5">
				<div class="sticky top-32 space-y-6">
					<div class="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_8px_32px_rgba(28,28,24,0.04)]">
						<h2 class="font-notoSerif text-on-surface mb-8 text-3xl">Order Summary</h2>
						<form method="POST">
							<div class="mb-8 space-y-4">	
								<div class="grid grid-cols-2 gap-4">
									<div>
										<label for="" class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
										<input class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all"  
												type="date"
												name="startDate"
												required
												bind:value={ startDate }										
										/>
									</div>
									<div>
										<label for="" class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
										<input class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all"
												type="date"
												name="endDate"
												required
												bind:value={ endDate }									
										/>
									</div>									
								</div>
								{#if invalidRental }
									<p class="text-red-500 text-justify">La diferencia entre las fechas debe de ser menor a dos dias</p>	
								{/if}
													
								<div class="text-on-surface-variant flex justify-between">
									<span class="text-sm">Items Subtotal</span>
									<span class="font-manrope font-medium">${ $cartTotal }</span>
								</div>

								<div class="text-on-surface-variant flex justify-between">
									<span class="text-sm">Estimated Taxes</span>
									<span class="font-manrope font-medium">${ Math.round($cartTotal * 0.07 * 100) / 100 }</span>
								</div>
							</div>
							<div class="border-outline-variant/15 mb-10 flex items-baseline justify-between border-t pt-6">
								<span class="font-notoSerif text-on-surface text-xl">Total</span>
								<span class="font-notoSerif text-primary text-4xl">${$cartTotal + Math.round($cartTotal * 0.07 * 100) / 100}</span>
							</div>

						
							<input id="cartItems" bind:value={ cartItems } type="hidden" name="cartItems"/>					

							<button class="bg-primary-gradient text-on-primary font-manrope shadow-primary/10 mb-8 flex w-full items-center justify-center gap-3 rounded-full py-5 text-sm font-extrabold tracking-[0.2em] uppercase shadow-xl transition-all hover:opacity-90 active:scale-95"
									style="background: linear-gradient(to right, #735c00, #d4af37);"
									type="button"
									onclick={()=>{ showModal = true }}>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-keyhole-icon lucide-lock-keyhole"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>
								Secure Checkout
							</button>
						</form>
						

						<div class="flex flex-col items-center gap-4">
							<span class="text-on-surface-variant/60 text-[10px] font-bold tracking-widest uppercase">
								Accepted At The Atelier
							</span>
							<div class="flex gap-4 opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card-icon lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
								<!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-landmark-icon lucide-landmark opacity-90"><path d="M10 18v-7"/><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/></svg> -->
								<!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-banknote-icon lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg> -->
							</div>
						</div>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div class="bg-surface-container-low flex flex-col items-center rounded-2xl p-4 text-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-icon lucide-shield"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
							<span class="text-on-surface-variant text-[10px] font-bold tracking-widest uppercase">
								Insured
							</span>
						</div>
						<div class="bg-surface-container-low flex flex-col items-center rounded-2xl p-4 text-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-feather-square-icon lucide-feather-square"><path d="M10.3 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8.8"/><path d="M7 12l8.5-8.5c2-2 4.5-2 6.5 0L16.5 9H10"/></svg>
							<span class="text-on-surface-variant text-[10px] font-bold tracking-widest uppercase">
								Heritage Guarantee
							</span>
						</div>
					</div>					
				</div>
			</div>
		</div>
	{:else }	
		<div class="flex-col items-center justify-center py-24 text-center">
			<div class="text-outline-variant mb-8 h-32 w-32">
				<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
			</div>
			<h2 class="font-notoSerif text-on-surface mb-4 text-4xl">Your basket is empty</h2>
			<p class="text-on-surface-variant mb-12 max-w-sm">
				Return to our collections to discover pieces crafted for enchantment and timeless elegance.
			</p>
			<a	class="bg-surface-container-highest text-primary hover:bg-primary rounded-full px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:text-white"
				href={resolve('/catalog')}>
				Explore Collections
			</a>
		</div>	
	{/if}	
</main>


<Modal open={ showModal }>
	<StripePaymentsForm { startDate } { endDate }/>
</Modal>




