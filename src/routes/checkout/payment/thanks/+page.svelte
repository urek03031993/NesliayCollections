<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount, onDestroy } from 'svelte';
	import Header from "$lib/components/Header/Header.svelte";
	import { resolve } from '$app/paths';
	import { cart } from '$lib/stores/store';

    const DELAY_SECONDS = 10;
    
    let secondsLeft = $state( DELAY_SECONDS );
    let interval: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout>;
    
    onMount(() => {	
        interval = setInterval(() => {
            secondsLeft -= 1;
        }, 1000);        

        timeout = setTimeout(() => {
            goto( resolve('/')  );
        }, 
        DELAY_SECONDS * 1000);
		cart.clear();
    });
    
    onDestroy(() => {
        clearInterval(interval);
        clearTimeout(timeout);
    });	
</script>

<Header/>

<main class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20">

	<div class="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-10">
		<div class="h-full w-full bg-linear-to-l from-primary-container to-transparent"></div>
	</div>
	<div class="relative z-10 grid w-full max-w-4xl grid-cols-1 items-center gap-12 lg:grid-cols-12">

		<div class="order-2 lg:order-1 lg:col-span-5">
			<div class="relative">
				<div class="aspect-4/5 scale-95 rotate-1 overflow-hidden rounded-4xl shadow-2xl transition-transform duration-700 lg:scale-100 lg:-rotate-2">
					<img
						alt="Luxury Fabric Detail"
						class="h-full w-full object-cover"
						data-alt="Close-up of premium silk fabric with elegant gold embroidery textures in a sunlit atelier studio setting with warm lighting"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMn3x5MqKO2VOOwvWLL8z3oTPGMPhy-J7Si2hAekrQsUeJarAaYb_s-lxT49hfgo1dAxWemAVU6qkvZ64Bq0S_Ji0JHQxi7V0ItW6ZCHGunfnxD5DyjBIhyG9iYtS3hdqphafCZjwYH770ue6t7aVeZeGCKgR927YKw3QEOef_ijUjQHCtmUxBWGVanWYC_8CN5cm4mjkUfRW2geMSwSfhk6QoHGHVyuSmgptEuN46Ly3eQNgF7PVq5NYF9LjFg2fcDirz8IatWbrL"
					/>
				</div>

				<div class="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-tertiary/10 blur-3xl"></div>
			</div>
		</div>

		<div class="order-1 space-y-8 lg:order-2 lg:col-span-7">
			<div class="space-y-4">
				<span class="text-xs font-semibold tracking-widest text-primary uppercase">
                    Reservation Success
                </span>
				<h2 class="serif-text text-4xl leading-tight font-bold tracking-tight text-on-surface md:text-6xl">
					A Moment of <span class="text-primary italic">Magic</span> Confirmed
				</h2>
				<p class="max-w-lg text-lg leading-relaxed font-light text-on-surface-variant">
					Thank you for choosing Neliay Collection. Your journey into enchantment has begun.
				</p>
			</div>

			<div class="relative space-y-6 overflow-hidden rounded-4xl bg-surface-container-low p-8 shadow-sm">
				<div class="absolute top-0 right-0 p-4 opacity-5">
					<span class="material-symbols-outlined text-8xl">auto_awesome</span>
				</div>
				<div class="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3">
					<div class="space-y-1">
						<p class="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
							Service
						</p>
						<p class="font-semibold text-on-surface">Bespoke Fitting</p>
					</div>
					<div class="space-y-1">
						<p class="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
							Date
						</p>
						<p class="font-semibold text-on-surface">December 5, 2024</p>
					</div>
					<div class="space-y-1">
						<p class="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
							Artisan
						</p>
						<p class="font-semibold text-on-surface">Madame Valerius</p>
					</div>
				</div>
			</div>
			<div class="space-y-8 pt-4">
				<p class="serif-text text-xl leading-relaxed text-on-surface-variant italic">
					"We wish you a day filled with elegance and light. We look forward to creating something
					extraordinary together."
				</p>
				<div class="flex flex-col gap-4 pt-4 sm:flex-row">
					<a class="rounded-full bg-linear-to-r from-primary to-primary-container px-10 py-4 text-center font-semibold text-on-primary shadow-lg transition-transform duration-300 hover:scale-105"
					   href={ resolve('/collections') }>
						Explore Collections
					</a>
					<a  class="rounded-full bg-surface-container-highest px-10 py-4 text-center font-semibold text-primary transition-colors duration-300 hover:bg-surface-container-high"
						href={ resolve('/') }>
						Back to Atelier( in { secondsLeft }s)
					</a>
				</div>
			</div>
		</div>
	</div>
</main>
