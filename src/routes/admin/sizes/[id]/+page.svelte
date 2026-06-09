<script lang="ts">
	import { enhance } from "$app/forms";
	import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";
	import type { PageProps } from "./$types";
	import { toastStore } from "$lib/stores/store";
	import AdminSidebar from "$lib/components/AdminSidebar/AdminSidebar.svelte";
    
    let { data, form }: PageProps = $props();
    
    $effect.pre(()=>{
        if(form?.success) {
            toastStore.success("Talla editada satisfactoriamente");
            goto(resolve('/admin/sizes'));
        }

        if(form?.errors) {
            toastStore.error("Ocurrio un error al editar la talla revise por favor");
        }
    });
</script>

<AdminSidebar/>


<main class="pt-24 lg:pl-72 pb-20 px-6 lg:px-12 min-h-screen">
    <div class="max-w-5xl mx-auto">
        <div class="mb-12">
            <h1 class="font-notoSerif text-4xl lg:text-5xl tracking-tight text-on-surface mb-2">
                New Size
            </h1>
            <p class="text-on-surface-variant font-body">
                Adding a new size to the Collection.
            </p>

            {#if typeof(form?.errors) === "string"}    
                <p class="text-red-600">{ form?.errors }</p>
            {/if}
        </div>
        
        <form name="sizeEditForm" method="POST" use:enhance data-netlify="true">
            <div class="space-y-1 mt-5">
                <label for="size" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">size</label>
                <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                        type="text" name="size" id="size" bind:value={ data.size } placeholder="XL" required />
                {#if typeof(form?.errors) !== "string" && form?.errors?.size}    
                    <p class="text-red-600">{ form?.errors?.size }</p>
                {/if}
            </div>

            <div class="space-y-1 mt-5">
                <label for="height" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Height</label>
                <select id="height" name="height"
                        class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-amber-600/20 transition-all font-sans" 
                        bind:value={ data.height }>
                    <option value="child">Child</option>
                    <option value="adult">Adult</option>
                </select>
                {#if typeof(form?.errors) !== "string" && form?.errors?.height}    
                    <p class="text-red-600">{ form?.errors?.height }</p>
                {/if}
            </div>

            <div class="mt-5">
                <button type="submit" class="w-25 bg-linear-to-r from-primary to-primary-container text-on-primary py-4 rounded-full font-manrope text-base font-bold shadow-xl hover:opacity-90 transition-all scale-100 hover:scale-[1.02] active:scale-95">
                    Edit
                </button>
                <button class="ml-4 w-25 bg-surface-container-highest text-primary py-4 rounded-full font-manrope text-base font-bold transition-all hover:bg-surface-container-high"
                        type="button" 
                        onclick={()=>{ goto(resolve('/admin/sizes')) }}>
                    Cancel
                </button>
            </div>    
        </form>

    </div>
</main>

