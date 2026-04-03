<script lang="ts">    
    import { resolve } from '$app/paths';

	import Header from '$lib/components/Header/Header.svelte';    
	import MobileNav from '$lib/components/MobileNav/MobileNav.svelte';
    import HowItWorks from '$lib/components/HowItWorks/HowItWorks.svelte';

    import main_picture from '$lib/assets/main123.png';
    import image1 from '$lib/images/3e139e85-d5b4-4186-8afc-3c25b86358e6.JPG.jpeg'
    import image2 from '$lib/images/a8f38a8b-7b1c-443c-ad51-f6d9565117fc.jpg.jpeg'
    import image3 from '$lib/images/fb615eef-b8c1-49c5-81d7-ccb73fc28d8e.jpg.jpeg'
</script>

<Header />

<main class="pt-20">
    <section class="relative min-h-230.25 flex items-center overflow-hidden">
        <div class="absolute inset-0 z-0 scale-105">
            <img alt="Ethereal ballroom setting" 
                class="w-full h-full object-cover" 
                data-alt="Grand elegant ballroom with sunlight streaming through tall windows" 
                src={ main_picture }
                loading="lazy"/>
            <div class="absolute inset-0 bg-linear-to-r from-surface via-surface/40 to-transparent"></div>
        </div>

        <div class="relative z-10 max-w-screen-2xl mx-auto px-8 w-full">
            <div class="max-w-2xl space-y-8">
                <div class="space-y-4">
                    <span class="text-tertiary font-manrope font-medium tracking-[0.2em] uppercase text-2xl block">
                        <strong>Neliay Collections</strong>
                    </span>
                    <h1 class="font-notoSerif text-6xl md:text-8xl text-on-background leading-[1.1] tracking-tighter">
                        Enchanting <br/><span class="italic text-primary">Occasions</span>
                    </h1>
                    <p class="text-on-surface-variant text-xl md:text-2xl font-manrope leading-relaxed max-w-xl">
                        Mommy &amp; Me Dress Rental, Princess Dreams, and Character Celebrations. Crafted for the moments that matter most.
                    </p>
                </div>
                <div class="flex items-center gap-6">
                    <span class="text-tertiary font-manrope font-medium tracking-[0.2em] uppercase text-2xl block">
                        <strong>Explore Our Collections</strong>
                    </span>
                </div>
            </div>
        </div>
    </section>

    <HowItWorks/>

    <section class="py-32 bg-surface-container-low overflow-hidden">
        <div class="max-w-screen-2xl mx-auto px-8">
            <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div class="space-y-4">
                    <span class="text-tertiary font-bold tracking-widest text-xs uppercase">The Atelier Selects</span>
                    <h2 class="font-notoSerif text-4xl md:text-5xl text-on-background">Best-Rental Wonders</h2>
                </div>
                <a class="text-primary font-bold flex items-center gap-2 group" href={resolve('/catalog')}>
                    Explore Full Boutique 
                    <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">trending_flat</span>
                </a>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                
                <div class="space-y-6 group">
                    <div class="aspect-4/5 relative overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0_8px_32px_rgba(28,28,24,0.04)]">
                        <img alt="Ballgown for Kids" 
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            data-alt="Exquisite white tulle ballgown with silver embroidery on a mannequin" 
                            src={ image1 }
                            loading="lazy"/>
                        <div class="absolute top-6 right-6">
                            <span class="bg-tertiary text-on-tertiary px-4 py-1 rounded-full text-xs font-bold uppercase">Must Have</span>
                        </div>
                    </div>
                    <div class="space-y-1">
                        <h4 class="font-notoSerif text-xl text-on-background">Ballgown for Kids</h4>
                        <p class="text-on-surface-variant text-sm font-medium">Layered Silk &amp; Tulle</p>
                        <p class="text-primary font-bold text-lg pt-2">$189.00</p>
                    </div>
                </div>
                
                <div class="space-y-6 group mt-12 md:mt-24">
                    <div class="aspect-4/5 relative overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0_8px_32px_rgba(28,28,24,0.04)]">
                        <img alt="Gentleman's Suit" 
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            data-alt="Miniature navy blue three-piece suit with a bowtie" 
                            src={ image2 }
                            loading="lazy"/>
                        <div class="absolute top-6 right-6">
                            <span class="bg-primary text-on-primary px-4 py-1 rounded-full text-xs font-bold uppercase">Bespoke</span>
                        </div>
                    </div>
                    <div class="space-y-1">
                        <h4 class="font-notoSerif text-xl text-on-background">Gentleman's Suit</h4>
                        <p class="text-on-surface-variant text-sm font-medium">Italian Wool Blend</p>
                        <p class="text-primary font-bold text-lg pt-2">$245.00</p>
                    </div>
                </div>
                
                <div class="space-y-6 group">
                    <div class="aspect-4/5 relative overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0_8px_32px_rgba(28,28,24,0.04)]">
                        <img alt="Frozen Inspired Outfit" 
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            data-alt="Ice-blue sequined dress with a long sheer cape" 
                            src={ image3 }
                            loading="lazy"/>
                        <div class="absolute bottom-6 left-6 right-6">
                            <div class="bg-surface/80 backdrop-blur-md p-4 rounded-2xl text-center shadow-lg">
                                <p class="text-xs text-tertiary font-bold uppercase tracking-widest">Limited Edition</p>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-1">
                        <h4 class="font-notoSerif text-xl text-on-background">Frozen Inspired Outfit</h4>
                        <p class="text-on-surface-variant text-sm font-medium">Ice Blue Sequins</p>
                        <p class="text-primary font-bold text-lg pt-2">$155.00</p>
                    </div>
                </div>
            </div>
        </div>
    </section>    
</main>

<MobileNav/>

<style>
    .text-on-primary {
        --tw-text-opacity: 1;
        color: rgb(255 255 255 / var(--tw-text-opacity, 1));
    }

    .font-bold {
        font-weight: 700;
    }

    .text-lg {
        font-size: 1.125rem;
        line-height: 1.75rem;
    }

    .font-manrope {
        font-family: Manrope, sans-serif;
    }

    .rounded-full {
        border-radius: 9999px;
    }

    .font-manrope {
        font-family: 'Manrope', sans-serif;
    }
</style>
