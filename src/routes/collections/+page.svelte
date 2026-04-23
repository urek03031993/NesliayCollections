<script lang="ts">
	import { resolve } from "$app/paths";
	import Header from "$lib/components/Header/Header.svelte";
	import MobileNav from "$lib/components/MobileNav/MobileNav.svelte";

	import boys from '$lib/assets/product/images/boys.jpeg'
	import mommy_and_me from '$lib/assets/product/images/mommy_and_me.jpeg'
	import girls from '$lib/assets/product/images/girls.jpeg'
</script>

<Header />

<main class="mx-auto max-w-screen-2xl px-8 pt-32 pb-24">
	<div class="mb-16 flex flex-col items-baseline justify-between gap-6 md:flex-row">
		<div>
			<h1 class="font-notoSerif text-primary mb-4 text-5xl tracking-tight md:text-6xl">
				Find Your Magic
			</h1>
			<p class="text-on-surface-variant max-w-lg leading-relaxed">
				Discover the enchanting world of our collections, where every piece is crafted with love and care. 				
				Explore our curated selection and find the perfect pieces that resonate with your unique style and personality.
			</p>
		</div>
	</div>

	<div class="flex flex-col gap-12 lg:flex-row"> 
		<div class="grid grow grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">

			<article class="group md:col-span-2 xl:col-span-1">
				<div class="bg-surface-container-low relative mb-6 aspect-4/5 overflow-hidden rounded-3xl">					
					<img
						alt="Boys Collection"
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						src={ boys }
						loading="lazy"         
					/>
					<div class="absolute inset-0 bg-black/5 transition-colors group-hover:bg-black/0"></div>
					<!-- <button class="bg-surface/90 text-primary absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-4 rounded-full px-8 py-3 text-sm font-semibold opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
							onclick={()=>{ goto(resolve(`/collections/boys`))}}>
						Go To
					</button> -->
					<a class="bg-surface/90 text-primary absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-8 py-3 text-sm font-semibold backdrop-blur-md transition-all duration-300
								opacity-100 translate-y-0
								[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-4 
								group-hover:translate-y-0 group-hover:opacity-100"
							href={ resolve(`/collections/boys`) }>
						Go To
					</a>
				</div>
				<div class="flex items-start justify-between px-2">
					<div>
						<h3 class="font-notoSerif text-on-surface mb-1 text-2xl">Boys</h3>
						<p class="text-on-surface-variant font-medium">Bespoke Couture</p> 
					</div>
					
				</div>
			</article>


			<article class="group md:col-span-2 xl:col-span-1">
				<div class="bg-surface-container-low relative mb-6 aspect-4/5 overflow-hidden rounded-3xl">
					<img
						alt="Mommy and Me Collection"
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						src={ mommy_and_me }
						loading="lazy"         
					/>
					<div class="absolute inset-0 bg-black/5 transition-colors group-hover:bg-black/0"></div>
					<!-- <button class="bg-surface/90 text-primary absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-4 rounded-full px-8 py-3 text-sm font-semibold opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
							onclick={()=>{ goto(resolve(`/collections/mommy_and_me`))}}>
						Go To
					</button> -->
					<a class="bg-surface/90 text-primary absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-8 py-3 text-sm font-semibold backdrop-blur-md transition-all duration-300
								opacity-100 translate-y-0
								[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-4 
								group-hover:translate-y-0 group-hover:opacity-100"
							href={ resolve(`/collections/mommy_and_me`) }>
						Go To
					</a>
				</div>
				<div class="flex items-start justify-between px-2">
					<div>
						<h3 class="font-notoSerif text-on-surface mb-1 text-2xl">Mommy and Me</h3>
						<p class="text-on-surface-variant font-medium">Bespoke Couture</p> 
					</div>
					<!-- <span class="text-primary text-xl font-semibold">${ from_price }</span> -->
				</div>
			</article>


			<article class="group md:col-span-2 xl:col-span-1">
				<div class="bg-surface-container-low relative mb-6 aspect-4/5 overflow-hidden rounded-3xl">
					<img
						alt="Girls Collection"
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						src={ girls }
						loading="lazy"         
					/>
					<div class="absolute inset-0 bg-black/5 transition-colors group-hover:bg-black/0"></div>
					<!-- <button class="bg-surface/90 text-primary absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-4 rounded-full px-8 py-3 text-sm font-semibold opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
							onclick={()=>{ goto(resolve(`/collections/girls`))}}>
						Go To
					</button> -->
					<a class="bg-surface/90 text-primary absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-8 py-3 text-sm font-semibold backdrop-blur-md transition-all duration-300
								opacity-100 translate-y-0
								[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-4 
								group-hover:translate-y-0 group-hover:opacity-100"
							href={ resolve(`/collections/girls`) }>
						Go To
					</a>
				</div>
				<div class="flex items-start justify-between px-2">
					<div>
						<h3 class="font-notoSerif text-on-surface mb-1 text-2xl">Girls</h3>
						<p class="text-on-surface-variant font-medium">Bespoke Couture</p> 
					</div>
					<!-- <span class="text-primary text-xl font-semibold">${ from_price }</span> -->
				</div>
			</article>

		</div>
	</div>
</main>

<MobileNav/>


