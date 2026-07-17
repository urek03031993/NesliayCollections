<script lang="ts">
    import type { ProductImageInfo } from "$lib/server/types/Dto";

    let { image }: { image: ProductImageInfo } = $props();

</script>


<div class="bg-surface-container-low col-span-12 aspect-4/5 overflow-hidden rounded-xl">
    <img class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"                    
        alt={ image.short_description }
        src={ image.url }
        loading="lazy"/>
</div>