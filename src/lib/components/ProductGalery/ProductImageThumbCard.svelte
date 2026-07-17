<script lang="ts">

    let { type = 'inactive', imgSrc = undefined, deleteImg, uuid }: { type: 'active' | 'inactive' , imgSrc?: string, deleteImg: (uuid: string) => void, uuid: string } = $props();

    let typeClass = $derived.by(() => {
        if(type === 'active'){
            return 'relative border-2 border-primary shadow-md overflow-hidden transition-transform hover:scale-105';        
        }else{
            return 'relative border border-outline-variant shadow-sm overflow-hidden transition-transform hover:scale-105 hover:border-primary/50'
        }
    });
</script>

<div class="shrink-0 w-24 aspect-4/5 rounded-lg group cursor-pointer { typeClass }">    
    <div class="absolute inset-0 bg-surface-container-low flex items-center justify-center">
        {#if imgSrc}
            <img src={ imgSrc } alt="" class="w-full h-full object-cover">
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-icon lucide-image text-primary/10 select-none"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>                
        {/if}        
    </div>
    <button class="absolute top-1 right-1 p-1 bg-error text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-75" 
            type="button" 
            aria-label="closeThumb"
            onclick={()=> deleteImg(uuid)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>    
</div>
