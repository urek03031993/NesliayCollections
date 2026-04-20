<script lang="ts">
	import Header from "$lib/components/Header/Header.svelte";
	import MobileNav from "$lib/components/MobileNav/MobileNav.svelte";
	import ProductCard from "$lib/components/ProductCard/ProductCard.svelte";

	import type { PageProps } from "./$types";
	import { page } from "$app/state";
	import { Categories } from '$lib/interfaces';
	import { resolve } from "$app/paths";

	let { data }: PageProps = $props();

	let category = $derived.by(() => {
		if (page.params.category === Categories.mommy_and_me){
			return { name : 'Mommy & Me', description: 'Discover a world of enchantment. Each piece is meticulously crafted in our atelier to bring your most magical dreams to life.' };
		}else if (page.params.category === Categories.boys){
			return { name : 'Boys', description: 'Discover a world of enchantment. Each piece is meticulously crafted in our atelier to bring your most magical dreams to life.' };
		}else if (page.params.category === Categories.girls){
			return { name : 'Girls', description: 'Discover a world of enchantment. Each piece is meticulously crafted in our atelier to bring your most magical dreams to life.' };
		}
	});
</script>
``
<Header />

<main class="mx-auto max-w-screen-2xl px-8 pt-32 pb-24">

	<div class="mb-10 flex flex-col items-baseline justify-between gap-6 md:flex-row">
		<div>
			<h1 class="font-notoSerif text-primary mb-4 text-5xl tracking-tight md:text-6xl">
				{ category?.name }
			</h1>
			<p class="text-on-surface-variant max-w-lg leading-relaxed">
				{ category?.description }
			</p>
		</div>		
	</div>

	<a class="text-primary font-bold flex items-center gap-2 group mb-2.5" href={resolve('/collections')}>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left-icon lucide-move-left group-hover:translate-x-1 transition-transform"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
		Back to Collections		
	</a>

	<div class="flex flex-col gap-12 lg:flex-row"> 
		<div class="grid grow grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
			{#each data.products as product(product.id)}				
				<ProductCard { product }/>		
			{/each}			
		</div>
	</div>
</main>

<MobileNav/>


