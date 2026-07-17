<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import ProductImageThumbCard from "./ProductImageThumbCard.svelte";
    import { v4 } from 'uuid';
	import type { newImagesPreviewList } from "$lib/zod/interfaces";


    let dataTranfer = $state<DataTransfer>();
    let files = $derived(dataTranfer?.files);
    let currentFileIndex = $state<number>();
    let newFiles = <newImagesPreviewList[]>$state([]);
    let fileInput = $state<HTMLInputElement>();
    
    onMount(()=>{
        if(!dataTranfer) dataTranfer = new DataTransfer();
    });

    onDestroy(()=>{
        newFiles.forEach((file) => URL.revokeObjectURL(file.urlPreview));
    });

    function addImage() {
        const file = fileInput?.files;

        if (!file) return;

        if (file) {            
            dataTranfer = new DataTransfer();
            newFiles.push({
                uuid: v4(),
                file: file[0],
                urlPreview: URL.createObjectURL(file[0]),
            });

            currentFileIndex = newFiles.length - 1;

            newFiles.forEach((file)=>{
                if(file.file) dataTranfer?.items.add(file.file);                
            });             
        } else {
            currentFileIndex = undefined;
        }
    }

    function openFileInput(): void {
        if(fileInput) fileInput.click();
	};

    function previousImage(): void {
        if(currentFileIndex === 0 || currentFileIndex === undefined) return;

        if(currentFileIndex > 0){
            currentFileIndex -= 1;
        }

    };

    function nextImage(): void {
        if(currentFileIndex === undefined) currentFileIndex = 0;

        if(currentFileIndex < newFiles.length - 1){
            currentFileIndex += 1;
        }else{
            return;
        }

    };

    function deleteImage(uuid: string): void {
        currentFileIndex = undefined;
        newFiles = newFiles.filter((file)=> file.uuid !== uuid);
    }
</script>


<div class="space-y-6">
    <div class="relative group aspect-4/5 w-full bg-surface-container-low rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(115,92,0,0.06)] border border-outline-variant/20 transition-all duration-500">
        <div class="absolute inset-0 flex items-center justify-center bg-[#fdfaf5]">
            {#if currentFileIndex === undefined}
                <svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-icon lucide-image text-surface-container select-none"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            {:else }
                <img src={newFiles[currentFileIndex].urlPreview} alt="" class="w-full h-full object-cover">                
            {/if}  

            {#if currentFileIndex !== undefined && currentFileIndex > 0 && newFiles.length > 1 }
                <button class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-md text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-sm" 
                        type="button" 
                        aria-label="leftCarrouselImage"
                        onclick={()=> previousImage()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left text-xl"><path d="m15 18-6-6 6-6"/></svg>
                </button>                
            {/if}

            {#if currentFileIndex !== undefined && currentFileIndex < (newFiles.length - 1)}
                <button class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-md text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-sm" 
                        type="button" 
                        aria-label="rightCarrouselImage"
                        onclick={()=> nextImage()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right text-xl"><path d="m9 18 6-6-6-6"/></svg>
                </button>                
            {/if}
        </div>
        <div class="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-primary/20 to-transparent pointer-events-none">
            <span class="text-white text-xs font-manrope font-bold uppercase tracking-widest opacity-80">Pre - View</span>
        </div>
    </div>
    
    <div class="relative group/thumb">
        <div class="relative">            
            <div class="flex items-center gap-4 overflow-x-auto py-3 px-2 no-scrollbar scroll-smooth">
                {#each newFiles as image(image.uuid) }
                    <ProductImageThumbCard type="inactive" imgSrc={image.urlPreview} deleteImg={deleteImage} uuid={image.uuid}/>
                {/each}

                <input  type="file"
                        accept="image/*"
                        onchange={ addImage }
                        hidden
                        bind:this={ fileInput }
                        />

                <input type="file"
                        accept="image/*"
                        name="images"
                        multiple
                        bind:files={ files }
                        />

                {#if newFiles.length < 5}
                    <button class="shrink-0 w-24 aspect-4/5 rounded-lg group cursor-pointer border-2 border-dashed border-outline-variant/40 hover:border-primary/60 hover:bg-primary/5 flex flex-col items-center justify-center gap-2 transition-all"
                            type="button"
                            onclick={()=>{ openFileInput()}}>                    
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-plus-icon lucide-image-plus text-primary group-hover:scale-110 transition-transform"><path d="M16 5h6"/><path d="M19 2v6"/><path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/><circle cx="9" cy="9" r="2"/></svg>
                        <span class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-primary">Add Image</span>
                    </button>
                {/if}                
            </div>

            <div class="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background to-transparent z-10 pointer-events-none opacity-0 group-hover/thumb:opacity-100 transition-opacity"></div>
        </div>
    </div>
</div>