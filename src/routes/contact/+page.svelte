<script lang="ts">
    import Header from "$lib/components/Header/Header.svelte";
    import logo from "$lib/assets/neliay_logo.png";
</script>


<Header/>

<main class="relative flex min-h-screen flex-col items-center justify-center px-6 pt-32 pb-20">
    <div class="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-10">
        <div class="h-full w-full bg-linear-to-l from-primary-container to-transparent"></div>
    </div>
    <div class="relative z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-16 lg:grid-cols-12">        
        <div class="order-2 lg:order-1 lg:col-span-5">
            <div class="relative">
                <div class="rounded-atelier aspect-4/5 rotate-1 overflow-hidden shadow-2xl transition-transform duration-700 hover:rotate-0">
                    <img
                        alt="The Atelier Atmosphere"
                        class="h-full w-full object-cover"
                        data-alt="Soft light streaming through an open window into a minimalist designer atelier with a single mannequin"
                        src={ logo }
                    />
                </div>
                <div class="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-primary/5 blur-3xl"></div>
            </div>
        </div>

        <div class="order-1 space-y-10 lg:order-2 lg:col-span-7">
            <div class="space-y-4">
                <span class="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
                    neliay collection
                </span>
                <h1 class="serif-text text-5xl leading-tight font-bold tracking-tight text-on-surface md:text-7xl">
                    Woven with <span class="text-primary italic">Grace</span>
                </h1>
                <p class="max-w-lg text-lg leading-relaxed font-light text-on-surface-variant">
                    We are available for inquiries and requests about our current collections.
                </p>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div class="rounded-atelier flex items-start gap-4 border border-outline-variant/5 bg-surface-container-low p-3 shadow-sm md:col-span-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                    </div>
                    <div>
                        <p class="mb-1 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                            Email
                        </p>
                        <p class="serif-text text-lg font-semibold text-on-surface italic">
                            info.neliaycollection@gmail.com
                        </p>
                    </div>
                </div>
                <div class="rounded-atelier flex items-start gap-4 border border-outline-variant/5 bg-surface-container-low p-3 shadow-sm md:col-span-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-text-icon lucide-message-square-text"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/></svg>
                    </div>
                    <div>
                        <p class="mb-1 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                            Phone (just text, no calls)
                        </p>
                        <p class="serif-text text-lg font-semibold text-on-surface italic">
                            +1(786) 503-1812
                        </p>
                    </div>
                </div>
            </div>

            <div class="space-y-8 pt-6">
                <div class="flex items-center gap-6">
                    <span class="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                        Follow the Journey
                    </span>
                    <div class="flex gap-4">
                        <a href="#/" target="_blank" rel="noopener noreferrer" class="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-primary transition-transform hover:scale-110" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook w-5 h-5" aria-hidden="true">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/info.neliaycollection/" rel="external" class="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-primary transition-transform hover:scale-110" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram w-5 h-5" aria-hidden="true">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                            </svg>
                        </a>
                        <!-- <a href="#/" target="_blank" rel="noopener noreferrer" class="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-primary transition-transform hover:scale-110" aria-label="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter w-5 h-5" aria-hidden="true">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                        </a> -->
                    </div>
                </div>                
            </div>
        </div>
    </div>
</main>
