<script lang="ts">
	import type { PageProps } from "./$types";  
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import AdminSidebar from "$lib/components/AdminSidebar/AdminSidebar.svelte";
	import Modal from "$lib/components/Modal/Modal.svelte";
	// import ProductImageUpload from "$lib/components/ProductImageUpload/ProductImageUpload.svelte";
	    
    let { data, form }: PageProps = $props();

    $effect.pre( () => {
        if(form?.success) {
            goto(resolve('/admin/products'))
        }
    });

    let openModal = $state(false);
    let sizesList = $derived.by(() => {
        return data.product?.sizes.map(size => ({ 
            size_id: size.size_id,
            size: size.size, 
            price: size.price, 
            quantity: size.quantity,
        }))
    });
	let jsonSizes: string = $derived(JSON.stringify(sizesList));

	async function addSize(event: Event): Promise<void> {
		event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        const size_id = parseInt(formData.get('size_id') as string, 10);
        const price = parseFloat(formData.get('price') as string);
        const size = data.sizes.find((s) => s.id === size_id)?.size || '';
        const quantity = parseInt(formData.get('quantity') as string, 10);

        const newSize = { size_id, size, price, quantity };
        sizesList = [...sizesList, newSize];
        openModal = false;
	}

	async function removeSize( index: number ): Promise<void> {
    	sizesList = sizesList.filter((_, i) => i !== index);
  	}

</script>

<AdminSidebar/>

{#if form?.errors }    
    <p>{ form?.errors }</p>    
{/if}

<main class="pt-24 lg:pl-72 pb-20 px-6 lg:px-12 min-h-screen">
    <div class="max-w-5xl mx-auto">
        <div class="mb-12">
            <h1 class="font-notoSerif text-4xl lg:text-5xl tracking-tight text-on-surface mb-2">
                { data.product.name }
            </h1>            
        </div>

        <form name="productEditForm" class="grid grid-cols-1 gap-8 md:grid-cols-12" method="POST" data-netlify="true">
            <div class="space-y-1 md:col-span-12">
                <label for="name" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Name</label>
                <input class="bg-surface-container-low focus:ring-primary/20 font-headline placeholder:text-outline w-full rounded-lg border-none p-4 text-xl italic transition-all focus:ring-2"
                        type="text" name="name" id="name" bind:value={ data.product.name } placeholder="e.g., Princess Dress Velvet Tuxedo" required />
            </div>

            <div class="space-y-8 md:col-span-7">
                <!-- <ProductImageUpload src={ data.product?.images[0]?.url }/> -->

                <div class="bg-surface-container-low group border-outline-variant/30 relative flex aspect-4/5 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed p-1">                    
                    <div class="z-10 px-6 text-center justify-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-upload-icon lucide-cloud-upload text-primary mb-4 text-5xl"><path d="M12 13v8"/><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m8 17 4-4 4 4"/></svg>
                        <p class="font-headline text-on-surface text-xl">Upload Creation Imagery</p>
                        <p class="text-on-surface-variant font-body mt-2 text-sm">
                            High-resolution portrait recommended (4:5 ratio)
                        </p>
                        <button class="text-primary mt-6 rounded-full bg-white px-6 py-2 text-sm font-bold shadow-sm transition-all hover:shadow-md" 
                                type="button">
                            Browse Files
                        </button>
                    </div>
                    <div class="bg-primary/5 pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </div>

                <div class="bg-surface-container-lowest space-y-6 rounded-xl p-8 shadow-[0_8px_32px_rgba(28,28,24,0.04)]">
                    <input id="jsonSizes" bind:value={ jsonSizes } type="hidden" name="jsonSizes"/>      
                    <table class="w-full border-collapse text-left">
                        <thead>
                            <tr class="border-outline-variant/10 border-b">
                                <th class="text-on-surface-variant uppercase font-manrope text-xs font-bold pb-2.5">Size</th>
                                <th class="text-on-surface-variant uppercase font-manrope text-xs font-bold pb-2.5">Rental Price (USD)</th>
                                <th class="text-on-surface-variant uppercase font-manrope text-xs font-bold pb-2.5">Quantity</th>
                                <th class="text-on-surface-variant uppercase font-manrope text-xs font-bold pb-2.5">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each sizesList as size, index (index)}
                                <tr>
                                    <td class="">{ size.size }</td>
                                    <td class="">{ size.price }</td>
                                    <td class="">{ size.quantity }</td>
                                    <td class="">
                                        <button type="button" aria-label="delete size" onclick={() => removeSize(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                        </button>                                        
                                    </td>
                                </tr>                                
                            {/each}
                            <tr>
                                <td colspan="4">
                                    <button class="flex gap-1.5 text-ms items-center text-on-surface-variant uppercase font-manrope text-xs font-bold pb-2.5" onclick={() => openModal = true} type="button" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                                        Add New Size
                                    </button>                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- <div class="space-y-2">
                        <label for="description" class="text-on-surface-variant font-manrope block text-xs font-bold tracking-widest uppercase">
                            Description
                        </label>
                        <textarea  id="description" name="description" bind:value={ data.description }
                            class="bg-surface-container-low focus:ring-primary/20 font-body text-on-surface placeholder:text-outline w-full rounded-lg border-none p-4 leading-relaxed transition-all focus:ring-2"
                            placeholder="Describe the fabric, the drape, and the inspiration behind this piece..."
                            rows="5"
                        ></textarea>
                    </div> -->
                </div>
            </div>

            <div class="space-y-8 md:col-span-5">      
                <div class="bg-surface-container-lowest space-y-6 rounded-xl p-8 shadow-[0_8px_32px_rgba(28,28,24,0.04)]">
                    <div class="space-y-2">
                        <label for="color" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Color</label>
                        <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                                type="text" name="color" id="color" bind:value={ data.product.color } placeholder="Blue" required />
                    </div>

                    <div class="space-y-2">
                        <label for="" class="text-on-surface-variant font-manrope block text-xs font-bold tracking-widest uppercase">
                            Category
                        </label>
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
                    <div class="space-y-3">
                        <label class="group flex cursor-pointer items-center">
                            <div class="border-outline group-hover:border-primary relative flex h-5 w-5 items-center justify-center rounded border transition-colors">
                                <input class="peer absolute h-full w-full cursor-pointer opacity-0" type="checkbox" name="activo" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check text-primary scale-0 text-xs transition-transform peer-checked:scale-100"><path d="M20 6 9 17l-5-5"/></svg>                                
                            </div>
                            <span class="font-body text-on-surface ml-3 text-sm">Active</span>
                        </label>				
                    </div>
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

<Modal open={ openModal }>
    <form class="space-y-6 rounded-xl p-8 shadow-[0_8px_32px_rgba(28,28,24,0.04)]" onsubmit = { addSize }>
        <div class="space-y-2">
            <label for="" class="text-on-surface-variant font-manrope block text-xs font-bold tracking-widest uppercase">
                Size
            </label>
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

        <div class="flex flex-col gap-4 pt-4">
            <button class="text-on-primary font-manrope w-full scale-100 rounded-full py-4 text-base font-bold shadow-xl transition-all hover:scale-[1.02] hover:opacity-90 active:scale-95"
                    style="background: linear-gradient(to right, #735c00, #d4af37);"
                    type="submit">
                    Add Size
            </button>            
        </div>
    </form>
</Modal>
