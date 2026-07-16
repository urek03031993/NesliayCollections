<script lang="ts">
	import z from "zod";
	import { v4 } from "uuid";
	import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";
	import type { PageProps } from "./$types";  
	import { onDestroy, onMount } from "svelte";
	import { toastStore } from "$lib/stores/store";
	import { sizeFormSchemaZod } from "$lib/zod/schema";
	import Modal from "$lib/components/Modal/Modal.svelte";
	import { deleteImageFromSupabaseStorage } from "$lib/supabase/supabase";
	import AdminSidebar from "$lib/components/AdminSidebar/AdminSidebar.svelte";
	import type { newImagesPreviewList, sizeParseErrors } from "$lib/zod/interfaces";
	import InputErrorText from "$lib/components/inputErrorText/inputErrorText.svelte";
	import ProductImageThumbCard from "$lib/components/ProductGalery/ProductImageThumbCard.svelte";
	    
    let { data, form }: PageProps = $props();

    $effect.pre(()=>{
        if(form?.success) {
            toastStore.success("Vestido editado satisfactoriamente");
            goto(resolve('/admin/products'));
        }

        if(form?.errors) {
            toastStore.error("Ocurrio un error al editar el vestido revise por favor");
        }
    });

    let activo = $state(true);
    let openModal = $state(false);
    let sizesList = $derived.by(() => {
        return data.product?.sizes.map(size => ({ 
            size_id: size.size_id,
            size: size.size, 
            price: size.price, 
            quantity: size.quantity,
        }));
    });

	let jsonSizes: string = $derived(JSON.stringify(sizesList));
    let addSizeError = $state<sizeParseErrors>();

    function addSize(event: Event): void {
		event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const body = Object.fromEntries(formData.entries());        

        const sizeValidation = sizeFormSchemaZod.safeParse(body);

         if (!sizeValidation.success) {
            addSizeError = z.flattenError(sizeValidation.error).fieldErrors;
            return;
         }

        const newSize = { 
            size_id: sizeValidation.data.size_id, 
            size: data.sizes.find((s) => s.id === sizeValidation.data.size_id)?.size ?? '', 
            price: sizeValidation.data.price, 
            quantity: sizeValidation.data.quantity 
        };

        sizesList = [...sizesList, newSize];
        openModal = false;
	}

	function removeSize( index: number ): void {
    	sizesList = sizesList.filter((_, i) => i !== index);
  	}

    let dataTranfer = $state<DataTransfer>();
    let files = $derived(dataTranfer?.files);
    let currentFileIndex = $state<number>();
    let allFiles = <newImagesPreviewList[]>$derived( data.product.images.map((image) => ({
                                                        id: image.id,
                                                        file_name: image.file_name,
                                                        uuid: v4(),
                                                        urlPreview: image.url,
                                                    })) ?? []);

    let fileInput = $state<HTMLInputElement>();
    
    onMount(()=>{
        if(!dataTranfer) dataTranfer = new DataTransfer();
    });

    onDestroy(()=>{
        allFiles.forEach((file) => URL.revokeObjectURL(file.urlPreview));
    });

    $effect(()=>{
        if(data.product.images.length > 0) {
            currentFileIndex = 0;
        }        
    });

    function addImage() {
        const file = fileInput?.files;

        if (!file) return;

        if (file) {            
            dataTranfer = new DataTransfer();
            allFiles = [...allFiles, {
                uuid: v4(),
                file: file[0],
                urlPreview: URL.createObjectURL(file[0]),
            }];

            currentFileIndex = allFiles.length - 1;

            allFiles.forEach((file)=>{
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

        if(currentFileIndex < allFiles.length - 1){
            currentFileIndex += 1;
        }else{
            return;
        }

    };

    async function deleteImage(uuid: string): Promise<void> {
        // loading.start();  
        currentFileIndex = undefined;

        let currentIndex = allFiles.findIndex((file) => file.uuid === uuid);
        if(allFiles[currentIndex].id !== undefined && allFiles[currentIndex].file_name !== undefined) {
                        
            const imageDeletedSupa = await deleteImageFromSupabaseStorage(allFiles[currentIndex].file_name, 'NeliayCollection');
            if (!imageDeletedSupa) {
                toastStore.error("Ocurrió un error al eliminar la imagen en el bucket de Supabase");
                return;
            }

           await handleDeleteImage(allFiles[currentIndex].id);
 
        }

        allFiles = allFiles.filter((file)=> file.uuid !== uuid);
        if (allFiles.length === 0) return;
        currentFileIndex = 0;
        // loading.stop();
    }

    async function handleDeleteImage(imageId: number): Promise<void> 
    {
        const response = await fetch(`/api/images/${imageId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            toastStore.error("Ocurrió un error al eliminar la imagen");           
        }

        toastStore.success("Imagen eliminada satisfactoriamente");
    }
</script>

<AdminSidebar/>

<main class="pt-24 lg:pl-72 pb-20 px-6 lg:px-12 min-h-screen">
  <div class="max-w-5xl mx-auto">
        <div class="mb-12">
            <h1 class="font-notoSerif text-4xl lg:text-5xl tracking-tight text-on-surface mb-2">
                { data.product.name }
            </h1>
            {#if typeof(form?.errors) === "string"}    
                <p class="text-red-600">{ form?.errors }</p>
            {/if}          
        </div>

        <form name="productEditForm" class="grid grid-cols-1 gap-8 md:grid-cols-12" method="POST" enctype="multipart/form-data" data-netlify="true">
            <div class="space-y-1 md:col-span-12">
                <label for="name" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Name</label>
                <input class="bg-surface-container-low focus:ring-primary/20 font-headline placeholder:text-outline w-full rounded-lg border-none p-4 text-xl italic transition-all focus:ring-2"
                        type="text" name="name" id="name" bind:value={ data.product.name } placeholder="e.g., Princess Dress Velvet Tuxedo" required />
                {#if typeof(form?.errors) !== "string" && form?.errors?.name}
                    <InputErrorText text={ form?.errors?.name[0] }/>
                {/if}   
            </div>

            <div class="space-y-8 md:col-span-7">

                <div class="space-y-6">
                    <div class="relative group aspect-4/5 w-full bg-surface-container-low rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(115,92,0,0.06)] border border-outline-variant/20 transition-all duration-500">
                        <div class="absolute inset-0 flex items-center justify-center bg-[#fdfaf5]">
                            {#if currentFileIndex === undefined}
                                <svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-icon lucide-image text-surface-container select-none"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                            {:else }
                                <img src={allFiles[currentFileIndex].urlPreview} alt="" class="w-full h-full object-cover">                
                            {/if}  

                            {#if currentFileIndex !== undefined && currentFileIndex > 0 && allFiles.length > 1 }
                                <button class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-md text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-sm" 
                                        type="button" 
                                        aria-label="leftCarrouselImage"
                                        onclick={()=> previousImage()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left text-xl"><path d="m15 18-6-6 6-6"/></svg>
                                </button>                
                            {/if}

                            {#if currentFileIndex !== undefined && currentFileIndex < (allFiles.length - 1)}
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
                                {#each allFiles as image(image.uuid) }
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
                                        hidden
                                        bind:files={ files }
                                        />

                                {#if allFiles.length < 5}
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
                
                <div class="bg-surface-container-lowest p-8 rounded-xl shadow-[0_8px_32px_rgba(28,28,24,0.04)] space-y-6">
                    <input id="jsonSizes" bind:value={ jsonSizes } type="hidden" name="jsonSizes"/>
                    <div class="flex justify-between items-center mb-2">
                        <h2 class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Inventory Management</h2>
                    </div>
                    {#if typeof(form?.errors) !== "string" && form?.errors?.sizes}    
                        <p class="text-red-600">{ form?.errors?.sizes[0] }</p>
                    {/if}
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-separate border-spacing-y-3">
                            <thead>
                                <tr class="text-[10px] uppercase tracking-widest text-outline font-bold">
                                    <th class="pb-2 pl-2">Size</th>
                                    <th class="pb-2">Price (USD)</th>
                                    <th class="pb-2">Stock</th>
                                    <th class="pb-2 text-right pr-2">Action</th>
                                </tr>
                            </thead>
                            <tbody class="font-manrope">
                                {#each sizesList as size, index (index)}
                                    <tr class="group">
                                        <td class="bg-surface-container-low rounded-l-lg p-3">
                                            { size.size }
                                        </td>
                                        <td class="bg-surface-container-low p-3">
                                            <div class="relative">
                                                <span class="absolute left-0 top-1/2 -translate-y-1/2 text-primary/40 text-xs">$</span>
                                                { size.price }
                                            </div>
                                        </td>
                                        <td class="bg-surface-container-low p-3">
                                            { size.quantity }
                                        </td>
                                        <td class="bg-surface-container-low rounded-r-lg p-3 text-right">
                                            <button class="text-outline-variant hover:text-error transition-colors" 
                                                    type="button" 
                                                    aria-label="delete_size"
                                                    onclick={() => removeSize(index)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                            </button>
                                        </td>
                                    </tr>
                                {/each}                                
                            </tbody>
                        </table>
                    </div>
                    <button class="w-full mt-2 flex items-center justify-center gap-2 py-3 border-2 border-dashed border-outline-variant/40 rounded-lg text-on-surface-variant hover:border-primary/60 hover:bg-primary/5 transition-all group" 
                            type="button"
                            onclick={() => openModal = true}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus text-primary group-hover:scale-110 transition-transform"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                        <span class="text-xs font-bold uppercase tracking-widest">Add Size</span>
                    </button>
                </div>
            </div>

            <div class="space-y-8 md:col-span-5">      
                <div class="bg-surface-container-lowest space-y-6 rounded-xl p-8 shadow-[0_8px_32px_rgba(28,28,24,0.04)]">
                    <div class="space-y-2">
                        <label for="color" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Color</label>
                        <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                                type="text" name="color" id="color" bind:value={ data.product.color } placeholder="Blue" required />
                        {#if typeof(form?.errors) !== "string" && form?.errors?.color}    
                            <p class="text-red-600">{ form?.errors?.color[0] }</p>
                        {/if}
                    </div>

                    <div class="space-y-2">                        
                        <label for="" class="text-on-surface-variant font-manrope block text-xs font-bold tracking-widest uppercase">
                            Category
                        </label>
                        {#if typeof(form?.errors) !== "string" && form?.errors?.category}    
                            <p class="text-red-600">{ form?.errors?.category[0] }</p>
                        {/if}
                        <select class="bg-surface-container-low focus:ring-primary/20 font-body w-full rounded-lg border-none p-4 transition-all focus:ring-2"
                                id="category" name="category" bind:value={ data.product.category }>
                            <option value="mommy_and_me">Mommy and Me</option>
                            <option value="boys">Boys</option>
                            <option value="girls">Girls</option>
                        </select>
                    </div>
                </div>

                <div class="bg-surface-container-lowest space-y-6 rounded-xl p-8 shadow-[0_8px_32px_rgba(28,28,24,0.04)]">
                    <div class="space-y-2">
                        <label for="description" class="text-on-surface-variant font-manrope block text-xs font-bold tracking-widest uppercase">
                            Description
                        </label>
                        {#if typeof(form?.errors) !== "string" && form?.errors?.description}    
                            <p class="text-red-600">{ form?.errors?.description[0] }</p>
                        {/if}
                        <textarea  id="description" name="description" 
                            class="bg-surface-container-low focus:ring-primary/20 font-body text-on-surface placeholder:text-outline w-full rounded-lg border-none p-4 leading-relaxed transition-all focus:ring-2"
                            placeholder="Describe the fabric, the drape, and the inspiration behind this piece..."
                            rows="5"
                            bind:value={ data.product.description }
                        ></textarea>
                    </div>                    
                </div>

                <div class="bg-surface-container-lowest space-y-4 rounded-xl p-8 shadow-[0_8px_32px_rgba(28,28,24,0.04)]">
                    <label for="" class="text-on-surface-variant font-manrope mb-2 block text-xs font-bold tracking-widest uppercase">
                        Archived properties
                    </label>
                    <label class="relative inline-flex items-center cursor-pointer group">
                        <input type="checkbox" class="sr-only peer" name="activo" bind:checked={activo}>
                        <div class="w-10 h-5 bg-secondary-container peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer 
                                    transition-all duration-300 ease-in-out
                                    peer-checked:bg-primary
                                    group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                        </div>
                        <div class="absolute left-0.5 top-1 bg-white w-4 h-4 rounded-full shadow-md transition-all duration-300 ease-in-out
                                    peer-checked:translate-x-4.5 peer-checked:scale-110
                                    flex items-center justify-center">
                            {#if activo}
                                <svg class="w-3 h-3 text-slate-400 peer-checked:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x w-3 h-3 text-slate-400 peer-checked:text-blue-500 transition-colors duration-300">
                                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                                </svg>											
                            {/if}
                            
                        </div>
                        <span class="ml-3 text-black">Activo</span>
                    </label>
                    {#if typeof(form?.errors) !== "string" && form?.errors?.activo}    
                        <p class="text-red-600">{ form?.errors?.activo[0] }</p>
                    {/if}
                </div>

                <div class="flex flex-col gap-4 pt-4">
                    <button class="text-on-primary font-manrope w-full scale-100 rounded-full py-4 text-base font-bold shadow-xl transition-all hover:scale-[1.02] hover:opacity-90 active:scale-95"
                            style="background: linear-gradient(to right, #735c00, #d4af37);"
                            type="submit">
                            Save Piece
                    </button>
                    <button class="bg-surface-container-highest text-primary font-manrope hover:bg-surface-container-high w-full rounded-full py-4 text-base font-bold transition-all"
                            type="button" onclick={()=>{goto(resolve('/admin/products'))}}>Cancel</button>
                </div>
            </div>
        </form>
    </div>    
</main>

<Modal bind:open={ openModal }>
    <form class="space-y-6 rounded-xl p-8 shadow-[0_8px_32px_rgba(28,28,24,0.04)]" onsubmit = { addSize }>
        <div class="space-y-2">
            <label for="" class="text-on-surface-variant font-manrope block text-xs font-bold tracking-widest uppercase">
                Size
            </label>
            {#if addSizeError?.size_id}    
                <p class="text-red-600">{ addSizeError.size_id }</p>
            {/if}
            <select class="bg-surface-container-low focus:ring-primary/20 font-body w-full rounded-lg border-none p-4 transition-all focus:ring-2"
                    id="size" name="size_id">
                {#each data.sizes as size(size.id)}
                    <option value={ size.id }>{ size.size }</option>            
                {/each}
            </select>
        </div>                    

        <div class="space-y-2">
            <label for="" class="text-on-surface-variant font-manrope block text-xs font-bold tracking-widest uppercase">
                Rental Price (USD)
            </label>
            {#if addSizeError?.price}    
                <p class="text-red-600">{ addSizeError.price }</p>
            {/if}
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
            {#if addSizeError?.quantity}    
                <p class="text-red-600">{ addSizeError.quantity }</p>
            {/if}
            <input class="bg-surface-container-low focus:ring-primary/20 font-body w-full rounded-lg border-none p-4 pl-8 transition-all focus:ring-2"
                    type="number" name="quantity" id="quantity" placeholder="3" required />
        </div>

        <div class="flex flex-col gap-4 pt-4">
            <button class="text-on-primary font-manrope w-full scale-100 rounded-full py-4 text-base font-bold shadow-xl transition-all hover:scale-[1.02] hover:opacity-90 active:scale-95"
                    style="background: linear-gradient(to right, #735c00, #d4af37);"
                    type="submit">
                    Add Size
            </button>            
        </div>
    </form>
</Modal>
