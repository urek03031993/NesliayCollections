<script lang="ts">
    let { product_name, size_size, unit_price, quantity, subtotal } = $props();
</script>


<div class="group flex flex-col items-center gap-8 rounded-xl bg-surface-container-lowest p-6 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(28,28,24,0.04)] md:flex-row">
    <!-- <div class="h-40 w-full overflow-hidden rounded-lg bg-surface-container md:w-32">
         <img
            alt="Aurelia Silk Gown"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            data-alt="luxurious golden silk evening gown draped elegantly on a mannequin in a sunlit Parisian atelier"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuANf_NAsOJ_YGRBjNWTOCBwP_7oJf5o_KTJeszWjZ8SXX4_8uBFwQCZyt0-Pn1BHfHFvMEYQ6it0LkqWyXZI7WVHV60twhTIYi4K9WuQ6plWgJ8RjBj7ekjl3g8TrHaKAv4Unjw9R5xGDFGnsVOO7TnVMjdyRN-RNnYR4YmZ7ZWNGrJtLLSn7nSNEcORffeKoA8uyR094N0a88v-6oTlbNLQ4w2yC1ritBgRTzDiH9szNBrLw4y1XzVI8aimiylKrHvmuU205WbYuHe"
        /> 
    </div> -->
    <div class="grow text-center md:text-left">
        <h3 class="font-headline mb-1 text-xl font-bold text-on-surface">{ product_name }</h3>
        <p class="mb-4 text-sm text-on-surface-variant"></p>
        <div class="inline-flex gap-4">
            <span class="rounded-full bg-secondary-container px-3 py-1 text-xs font-bold tracking-tighter text-on-secondary-container uppercase">
                Size: { size_size }
            </span>
            <span class="rounded-full bg-secondary-container px-3 py-1 text-xs font-bold tracking-tighter text-on-secondary-container uppercase">
                Quantity: { quantity }
            </span>
            <span class="rounded-full bg-secondary-container px-3 py-1 text-xs font-bold tracking-tighter text-on-secondary-container uppercase">
                Price Unit: ${ unit_price }
            </span>            
        </div>
    </div>
    <div class="flex flex-col items-center gap-4 md:items-end">
        <span class="font-label mb-1 block text-sm font-bold tracking-widest text-on-surface-variant uppercase">Subtotal</span>
        <span class="font-serif text-xl text-primary">${ subtotal }</span>
        <!-- <button class="flex items-center gap-2 text-sm font-bold tracking-widest text-error uppercase transition-opacity hover:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Remove
        </button> -->
    </div>
</div>