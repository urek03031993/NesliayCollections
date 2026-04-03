<script lang="ts">
	import type { ProductImageInfo } from "$lib/server/types/Dto";

    let { images }: { images: ProductImageInfo[] } = $props();

    const cantImages: number = $derived.by(()=>{
        return images.length;
    }); 
</script>

<div class="grid grid-cols-12 gap-4 lg:col-span-7">    

    {#each images as image, index (image.id)}
        {#if index === 0}
            <div class="bg-surface-container-low col-span-12 aspect-4/5 overflow-hidden rounded-xl">
                <img class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"                    
                    alt={ image.short_description }
                    src={ image.url }
                    loading="lazy"/>
            </div>
        {/if}

        {#if index === 1 || index === 2}
            <div class="bg-surface-container-low col-span-3 aspect-4/5 overflow-hidden rounded-lg">
                <img class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"                    
                    alt={ image.short_description }
                    src={ image.url }
                    loading="lazy"/>
            </div>            
        {/if}

        {#if index === 3} <!-- Selected -->
            <div class="bg-surface-container-low col-span-3 aspect-4/5 overflow-hidden rounded-lg border border-primary/20">
                <img class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"                    
                    alt={ image.short_description }
                    src={ image.url }
                    loading="lazy"/>
            </div>            
        {/if}

        {#if index >= 4 }
            <div class="bg-surface-container-low group relative col-span-3 flex aspect-4/5 cursor-pointer items-center justify-center overflow-hidden rounded-lg">
                <img class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"                    
                    alt={ image.short_description }
                    src={ image.url }
                    loading="lazy"/>

                {#if index > 5 }
                    <span class="text-on-surface font-manrope absolute font-semibold">+{ cantImages - 5 }</span>
                {/if}
            </div>            
        {/if}        				
    {/each}    
</div>