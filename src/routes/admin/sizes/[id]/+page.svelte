<script lang="ts">
	import type { PageProps } from "./$types";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { enhance } from "$app/forms";
	import AdminSidebar from "$lib/components/AdminSidebar/AdminSidebar.svelte";
    
    let { form, data }: PageProps = $props();
    
    $effect.pre(()=>{
        if(form?.success) {
            goto(resolve('/admin/sizes'))
        }
    });
</script>

<AdminSidebar/>

{#if form?.success }    
    {goto(resolve('/admin/sizes'))} 
{/if}

{#if form?.errors }    
    <p>{ form?.errors }</p>    
{/if}

<main class="pt-24 lg:pl-72 pb-20 px-6 lg:px-12 min-h-screen">
    <div class="max-w-5xl mx-auto">
        <div class="mb-12">
            <h1 class="font-notoSerif text-4xl lg:text-5xl tracking-tight text-on-surface mb-2">
                New Size
            </h1>
            <p class="text-on-surface-variant font-body">
                Adding a new size to the Collection.
            </p>
        </div>
        
        <form name="sizeEditForm" method="POST" use:enhance data-netlify="true">
            <div class="space-y-1 mt-5">
                <label for="size" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">size</label>
                <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                        type="text" name="size" id="size" bind:value={ data.size } placeholder="XL" required />
            </div>

            <div class="space-y-1 mt-5">
                <label for="height" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Height</label>
                <select id="height" name="height"
                        class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-amber-600/20 transition-all font-sans" 
                        bind:value={ data.height }>
                    <option value="child">Child</option>
                    <option value="adult">Adult</option>
                </select>
            </div>

            <div class="mt-5">
                <button type="submit" class="w-25 bg-linear-to-r from-primary to-primary-container text-on-primary py-4 rounded-full font-manrope text-base font-bold shadow-xl hover:opacity-90 transition-all scale-100 hover:scale-[1.02] active:scale-95">
                    Edit
                </button>
                <button class="ml-4 w-25 bg-surface-container-highest text-primary py-4 rounded-full font-manrope text-base font-bold transition-all hover:bg-surface-container-high" 
                        onclick={()=>{goto(resolve('/admin/sizes'))}}>
                    Cancel
                </button>
            </div>    
        </form>

    </div>
</main>

