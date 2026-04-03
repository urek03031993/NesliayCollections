<script lang="ts">
	import Header from '$lib/components/Header/Header.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
</script>

<Header />

<main class="mx-auto w-full max-w-7xl grow px-6 pt-32 pb-24 md:px-12">
	<!-- Page Title -->
	<div class="mb-12">
		<h1 class="font-notoSerif text-primary mb-4 text-5xl tracking-tight md:text-6xl">
			Your Selection
		</h1>
		<p class="text-on-surface-variant font-manrope text-xs tracking-wide uppercase">
			Curating your bespoke journey
		</p>
	</div>
	<!-- Checkout Layout: Asymmetric Bento Style -->
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
		<!-- Cart Items List (Column 1-7) -->
		<div class="space-y-8 lg:col-span-7">
			<!-- Item 1 -->
			<div
				class="group bg-surface-container-lowest flex flex-col gap-8 rounded-3xl p-6 transition-all duration-500 hover:shadow-[0_8px_32px_rgba(28,28,24,0.06)] md:flex-row"
			>
				<div class="bg-surface-container aspect-4/5 w-full overflow-hidden rounded-2xl md:w-48">
					<img
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						alt=""
						data-alt="Ethereal silk evening gown in champagne"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuDExP0KhjptA0Yi9Oz1Wms8lH6GcPGf5XYtMFqfaUoCyY3o2_eUmfd51Dv124cXLsRUDbC8zV877eVPmWkvsWSdP0t9ZEgHIs7qwPBZjul-1Du-dXqmehGZolitEz13wR6f91g2XxMiNlzjcKxLXHHHRFPCXsJfgn_NqqAWZxSQx6cKoAZeA6D5rNnLlR96yzB5OWWJOawUWV4EdkwCNhPQIGVUXDYlgjcT0dlg5JxRRKo2HBZ7ZAAN3r_SL5ryhn6NRTCsu2rhsMRt"
					/>
				</div>
				<div class="flex grow flex-col justify-between py-2">
					<div class="flex items-start justify-between">
						<div>
							<h3 class="font-notoSerif text-on-surface mb-1 text-2xl">Aurelia Silk Gown</h3>
							<p class="text-on-surface-variant mb-4 text-sm italic">
								Bespoke Collection • Champagne Gold
							</p>
							<div class="flex gap-4">
								<span
									class="bg-secondary-container text-on-secondary-container rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
									>Size: EU 38</span
								>
								<span
									class="bg-surface-container-high text-on-surface-variant rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
									>Custom Fitting</span
								>
							</div>
						</div>
						<button class="text-on-surface-variant hover:text-error transition-colors">
							<span class="material-symbols-outlined">close</span>
						</button>
					</div>
					<div class="mt-8 flex items-end justify-between">
						<div class="bg-surface-container-low flex items-center gap-4 rounded-full px-4 py-2">
							<button class="text-primary transition-transform hover:scale-110"
								><span class="material-symbols-outlined text-sm">remove</span></button
							>
							<span class="font-manrope w-4 text-center text-sm font-bold">1</span>
							<button class="text-primary transition-transform hover:scale-110"
								><span class="material-symbols-outlined text-sm">add</span></button
							>
						</div>
						<div class="text-right">
							<span class="text-on-surface-variant mb-1 block text-xs tracking-widest uppercase"
								>Subtotal</span
							>
							<span class="font-notoSerif text-primary text-2xl">$3,450.00</span>
						</div>
					</div>
				</div>
			</div>
			<!-- Item 2 -->
			<div
				class="group bg-surface-container-lowest flex flex-col gap-8 rounded-3xl p-6 transition-all duration-500 hover:shadow-[0_8px_32px_rgba(28,28,24,0.06)] md:flex-row"
			>
				<div class="bg-surface-container aspect-4/5 w-full overflow-hidden rounded-2xl md:w-48">
					<img
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						alt=""
						data-alt="Delicate lace veil with floral embroidery"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM2prMwl5w-8IxAdAYPQ40tA-8sUvn3UXh5PF8g3v7jxnPZCee5aj5L2D8MHPgxzfnZ2zEXMTyC2K4Y8zw4R40q5LOgI8pX2FO6byVyN4-bCaLA26DNGVsAS7wcVV8tqo5Xp9tRYLMtl8f7k7Sss2_8XKQ1SigvTolMpl9qL3o5cjx9xE-MzddA1FPt4lwRsmC556pGSCcSvgEf6lvlfTAyj-emQUupe-6XFim5_6dr-WInYQ2w8_rPj-ncYPoV2A4j2Kg1R8xVwGG"
					/>
				</div>
				<div class="flex grow flex-col justify-between py-2">
					<div class="flex items-start justify-between">
						<div>
							<h3 class="font-notoSerif text-on-surface mb-1 text-2xl">Celestial Lace Veil</h3>
							<p class="text-on-surface-variant mb-4 text-sm italic">Accessories • Pure Ivory</p>
							<div class="flex gap-4">
								<span
									class="bg-secondary-container text-on-secondary-container rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
									>One Size</span
								>
							</div>
						</div>
						<button class="text-on-surface-variant hover:text-error transition-colors">
							<span class="material-symbols-outlined">close</span>
						</button>
					</div>
					<div class="mt-8 flex items-end justify-between">
						<div class="bg-surface-container-low flex items-center gap-4 rounded-full px-4 py-2">
							<button class="text-primary transition-transform hover:scale-110"
								><span class="material-symbols-outlined text-sm">remove</span></button
							>
							<span class="font-manrope w-4 text-center text-sm font-bold">1</span>
							<button class="text-primary transition-transform hover:scale-110"
								><span class="material-symbols-outlined text-sm">add</span></button
							>
						</div>
						<div class="text-right">
							<span class="text-on-surface-variant mb-1 block text-xs tracking-widest uppercase"
								>Subtotal</span
							>
							<span class="font-notoSerif text-primary text-2xl">$850.00</span>
						</div>
					</div>
				</div>
			</div>
			<!-- Newsletter / Fitting Note (Asymmetric touch) -->
			<div class="bg-surface-container-low border-outline-variant/10 mt-12 rounded-3xl border p-8">
				<div class="mb-4 flex items-center gap-4">
					<span class="material-symbols-outlined text-tertiary">auto_awesome</span>
					<h4 class="font-notoSerif text-on-surface text-xl">Atelier Service</h4>
				</div>
				<p class="text-on-surface-variant mb-6 text-sm leading-relaxed">
					Every piece from The Digital Atelier includes a complimentary virtual fitting with our
					head couturier. Would you like to schedule yours now?
				</p>
				<button
					class="text-primary flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-transform hover:translate-x-1"
				>
					Schedule Private Fitting <span class="material-symbols-outlined text-sm"
						>arrow_forward</span
					>
				</button>
			</div>
		</div>
		<!-- Summary Section (Column 8-12) -->
		<div class="lg:col-span-5">
			<div class="sticky top-32 space-y-6">
				<div
					class="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_8px_32px_rgba(28,28,24,0.04)]"
				>
					<h2 class="font-notoSerif text-on-surface mb-8 text-3xl">Order Summary</h2>
					<div class="mb-8 space-y-4">
						<div class="text-on-surface-variant flex justify-between">
							<span class="text-sm">Items Subtotal</span>
							<span class="font-manrope font-medium">$4,300.00</span>
						</div>
						<div class="text-on-surface-variant flex justify-between">
							<span class="text-sm">White Glove Delivery</span>
							<span class="font-manrope font-medium">$120.00</span>
						</div>
						<div class="text-on-surface-variant flex justify-between">
							<span class="text-sm">Estimated Taxes</span>
							<span class="font-manrope font-medium">$344.00</span>
						</div>
					</div>
					<div
						class="border-outline-variant/15 mb-10 flex items-baseline justify-between border-t pt-6"
					>
						<span class="font-notoSerif text-on-surface text-xl">Total</span>
						<span class="font-notoSerif text-primary text-4xl">$4,764.00</span>
					</div>
					<!-- Secure Checkout Button -->
					<button
						class="bg-primary-gradient text-on-primary font-manrope shadow-primary/10 mb-8 flex w-full items-center justify-center gap-3 rounded-full py-5 text-sm font-extrabold tracking-[0.2em] uppercase shadow-xl transition-all hover:opacity-90 active:scale-95"
					>
						<span class="material-symbols-outlined text-lg">lock</span>
						Secure Checkout
					</button>
					<!-- Payment Icons -->
					<div class="flex flex-col items-center gap-4">
						<span class="text-on-surface-variant/60 text-[10px] font-bold tracking-widest uppercase"
							>Accepted At The Atelier</span
						>
						<div
							class="flex gap-4 opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
						>
							<span class="material-symbols-outlined text-3xl">credit_card</span>
							<span class="material-symbols-outlined text-3xl">account_balance</span>
							<span class="material-symbols-outlined text-3xl">contactless</span>
							<span class="material-symbols-outlined text-3xl">payments</span>
						</div>
					</div>
				</div>
				<!-- Trust Signals -->
				<div class="grid grid-cols-2 gap-4">
					<div
						class="bg-surface-container-low flex flex-col items-center rounded-2xl p-4 text-center"
					>
						<span class="material-symbols-outlined text-primary mb-2">shield</span>
						<span class="text-on-surface-variant text-[10px] font-bold tracking-widest uppercase"
							>Insured Shipping</span
						>
					</div>
					<div
						class="bg-surface-container-low flex flex-col items-center rounded-2xl p-4 text-center"
					>
						<span class="material-symbols-outlined text-primary mb-2">history_edu</span>
						<span class="text-on-surface-variant text-[10px] font-bold tracking-widest uppercase"
							>Heritage Guarantee</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Empty State (Hidden by default, used for logic) -->
	<div class="hidden flex-col items-center justify-center py-24 text-center">
		<div class="text-outline-variant/30 mb-8 h-32 w-32">
			<span
				class="material-symbols-outlined text-[120px]"
				style="font-variation-settings: 'wght' 100;">shopping_basket</span
			>
		</div>
		<h2 class="font-notoSerif text-on-surface mb-4 text-4xl">Your basket is empty</h2>
		<p class="text-on-surface-variant mb-12 max-w-sm">
			Return to our collections to discover pieces crafted for enchantment and timeless elegance.
		</p>
		<a
			class="bg-surface-container-highest text-primary hover:bg-primary rounded-full px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:text-white"
			href="#/"
		>
			Explore Collections
		</a>
	</div>
</main>
<!-- Footer -->

<Footer />

<!-- Bottom Nav for Mobile -->
<div
	class="bg-surface/90 fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-3xl px-4 pt-3 pb-6 shadow-[0_-8px_32px_rgba(28,28,24,0.06)] backdrop-blur-lg md:hidden dark:bg-zinc-950/90"
>
	<button
		class="text-on-surface-variant flex flex-col items-center justify-center opacity-70 dark:text-zinc-500"
	>
		<span class="material-symbols-outlined">home</span>
		<span class="font-manrope mt-1 text-[10px] font-medium tracking-widest uppercase">Home</span>
	</button>
	<button
		class="text-on-surface-variant flex flex-col items-center justify-center opacity-70 dark:text-zinc-500"
	>
		<span class="material-symbols-outlined">auto_awesome</span>
		<span class="font-manrope mt-1 text-[10px] font-medium tracking-widest uppercase">Catalog</span>
	</button>
	<button
		class="text-on-surface-variant flex flex-col items-center justify-center opacity-70 dark:text-zinc-500"
	>
		<span class="material-symbols-outlined">favorite</span>
		<span class="font-manrope mt-1 text-[10px] font-medium tracking-widest uppercase"
			>Favorites</span
		>
	</button>
	<button
		class="bg-primary-container/20 dark:bg-primary/10 text-primary dark:text-primary-container flex flex-col items-center justify-center rounded-full px-4 py-2"
	>
		<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;"
			>shopping_basket</span
		>
		<span class="font-manrope mt-1 text-[10px] font-medium tracking-widest uppercase">Cart</span>
	</button>
</div>
