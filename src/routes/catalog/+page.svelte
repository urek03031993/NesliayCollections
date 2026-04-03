<script lang="ts">
	import Header from "$lib/components/Header/Header.svelte";
	import MobileNav from "$lib/components/MobileNav/MobileNav.svelte";
	import ProductCard from "$lib/components/ProductCard/ProductCard.svelte";

	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<Header />

<main class="mx-auto max-w-screen-2xl px-8 pt-32 pb-24">
	<div class="mb-16 flex flex-col items-baseline justify-between gap-6 md:flex-row">
		<div>
			<h1 class="font-notoSerif text-primary mb-4 text-5xl tracking-tight md:text-6xl">
				Our Catalog
			</h1>
			<p class="text-on-surface-variant max-w-lg leading-relaxed">
				Discover a world of enchantment. Each piece is meticulously crafted in our atelier to bring
				your most magical dreams to life.
			</p>
		</div>
	</div>

	<div class="flex flex-col gap-12 lg:flex-row"> 
		<div class="grid grow grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
			{#each data.products as product(product.id)}				
				<ProductCard { product }/>		
			{/each}			
		</div>
	</div>
</main>

<MobileNav/>


