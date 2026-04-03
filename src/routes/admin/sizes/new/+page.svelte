<script lang="ts">
	import type { PageProps } from "./$types";
    import SizeForm from "$lib/components/forms/SizeForm/SizeForm.svelte";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
    
    let { form }: PageProps = $props();

    $effect.pre(()=>{
        if(form?.success) {
            goto(resolve('/admin/sizes'))
        }
    });
</script>

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
        <SizeForm size={ form?.data?.size } height={ form?.data?.height }/>
    </div>
</main>


