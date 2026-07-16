<script lang="ts">
	import type { ProductImageInfo } from "$lib/server/types/Dto";

    let { images }: { images: ProductImageInfo[] } = $props();

    $effect(()=>{
        if(images.length > 0) {
            currentFileIndex = 0;
        }        
    });

    let currentFileIndex = $state<number>();
    let allFiles = <ProductImageInfo[]>$derived( images.map((image) => ({
                                                        id: image.id,
                                                        url: image.url,
                                                        short_description: image.short_description,
                                                    })) ?? []);
</script>

<div class="grid grid-cols-12 gap-5 lg:col-span-7">
    <div class="bg-surface-container-low col-span-12 aspect-4/5 overflow-hidden rounded-xl">

        {#if currentFileIndex === undefined}
            <svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-icon lucide-image text-surface-container select-none"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        {:else }
            <img    class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"                    
                    alt={ allFiles[currentFileIndex].short_description }
                    src={ allFiles[currentFileIndex].url }
                    loading="lazy"/>              
        {/if}
    </div>   

    {#each images as image, index (image.id)}  
        <div class="bg-surface-container-low col-span-3 aspect-4/5 overflow-hidden rounded-lg" 
             hidden={ currentFileIndex === index }>
            <button type="button" class="h-full w-full" onclick={() => currentFileIndex = index}>
                <img class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"                    
                    alt={ image.short_description }
                    src={ image.url }
                    loading="lazy"/>
            </button>            
        </div>        				
    {/each}
</div>