<script lang="ts">
    let { sizes } = $props();    
</script>



<div class="bg-surface-container-lowest space-y-6 rounded-xl p-8 shadow-[0_8px_32px_rgba(28,28,24,0.04)]">
    <div class="space-y-2">
        <label for="" class="text-on-surface-variant font-manrope block text-xs font-bold tracking-widest uppercase">
            Size
        </label>
        <select class="bg-surface-container-low focus:ring-primary/20 font-body w-full rounded-lg border-none p-4 transition-all focus:ring-2"
                id="size" name="size_id">
            {#each sizes as size(size.id)}
                <option value={ size.id }>{ size.size }</option>            
            {/each}
        </select>
    </div>                    

    <div class="space-y-2">
        <label for="" class="text-on-surface-variant font-manrope block text-xs font-bold tracking-widest uppercase">
            Rental Price (USD)
        </label>
        <div class="relative">
            <span class="text-primary absolute top-1/2 left-4 -translate-y-1/2 font-bold">$</span>
            <input
                class="bg-surface-container-low focus:ring-primary/20 font-body w-full rounded-lg border-none p-4 pl-8 transition-all focus:ring-2"
                placeholder="0.00"
                type="number" name="price" id="price" required
            />
        </div>
    </div>

    <div class="space-y-2">
        <label for="quantity" class="text-on-surface-variant font-manrope block text-xs font-bold tracking-widest uppercase">
            Quantity
        </label>
        <input class="bg-surface-container-low focus:ring-primary/20 font-body w-full rounded-lg border-none p-4 pl-8 transition-all focus:ring-2"
                type="number" name="quantity" id="quantity" placeholder="3" required />
    </div>

    <button type="button">Add Size</button>
</div>