<script lang="ts">
	import type { PageProps } from "./$types";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { enhance } from "$app/forms";
	import AdminSidebar from "$lib/components/AdminSidebar/AdminSidebar.svelte";
    import { toastStore } from "$lib/stores/store";
    
    let { form }: PageProps = $props();

    $effect.pre(()=>{
        if(form?.success) {
            toastStore.success("Configuración agregada satisfactoriamente");
            goto(resolve('/admin/configuration'));
        }

        if(form?.errors) {
            toastStore.error("Ocurrio un error al crear la configuración revise por favor");
        }
    });
</script>

<AdminSidebar/>

<main class="pt-24 lg:pl-72 pb-20 px-6 lg:px-12 min-h-screen">
    <div class="max-w-5xl mx-auto">
        <div class="mb-12">
            <h1 class="font-notoSerif text-4xl lg:text-5xl tracking-tight text-on-surface mb-2">
                New Configuration
            </h1>
            <p class="text-on-surface-variant font-body">
                Adding a new configuration to the system.
            </p>

            {#if typeof(form?.errors) === "string"}    
                <p class="text-red-600">{ form?.errors }</p>
            {/if}
        </div>
        
        <form name="configurationForm" method="POST" use:enhance data-netlify="true">
            <div class="space-y-1 mt-5">
                <label for="key" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Key</label>
                <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                        type="text" name="key" id="key" placeholder="Configuration Key" required />
                {#if typeof(form?.errors) !== "string" && form?.errors?.key}
                    <p class="text-red-600">{ form?.errors?.key }</p>
                {/if}
            </div>

            <div class="space-y-1 mt-5">
                <label for="value" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Value</label>
                <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                        type="text" name="value" id="value" placeholder="Configuration Value" required />
                {#if typeof(form?.errors) !== "string" && form?.errors?.value}
                    <p class="text-red-600">{ form?.errors?.value }</p>
                {/if}
            </div>            

            <div class="mt-5">
                <button type="submit" class="w-25 bg-linear-to-r from-primary to-primary-container text-on-primary py-4 rounded-full font-manrope text-base font-bold shadow-xl hover:opacity-90 transition-all scale-100 hover:scale-[1.02] active:scale-95">
                    Create
                </button>
                <button class="ml-4 w-25 bg-surface-container-highest text-primary py-4 rounded-full font-manrope text-base font-bold transition-all hover:bg-surface-container-high"
                        type="button"
                        onclick={()=>{goto(resolve('/admin/configuration'))}}>
                    Cancel
                </button>
            </div>    
        </form>
    </div>
</main>


