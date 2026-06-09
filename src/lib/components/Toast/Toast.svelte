<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import type { toastProps } from "./interfaces";
    import { toastStore } from "$lib/stores/store";

    let { id, text, type, duration=3000, showToast=$bindable(true) }: toastProps = $props();

    $effect(() => {
		const timeout = setTimeout(() => { showToast = false }, duration);

		return () => {
            toastStore.remove(id);
			clearTimeout(timeout);
		};
	});
    
    let styleClass = $derived.by(()=>{
        let mainDiv = 'asdasd'
        let secondDiv = 'asdadsas'
        let text = 'asdasdasd'

        if(type === 'success'){
            mainDiv = 'border-primary/20 shadow-[0_8px_32px_rgba(115,92,0,0.08)]'
            secondDiv = 'bg-primary/10 text-primary'
            text = 'text-primary'
        }else if(type === 'error'){
            mainDiv = 'border-error/20 shadow-[0_8px_32px_rgba(186,26,26,0.06)]'
            secondDiv = 'bg-error/10 text-error'
            text = 'text-error'
        }else{
            mainDiv = 'border-tertiary/20 shadow-[0_8px_32px_rgba(123,65,179,0.06)]'
            secondDiv = 'bg-tertiary/10 text-tertiary'
            text = 'text-tertiary '
        }

        return {mainDiv: mainDiv, secondDiv: secondDiv, text: text }
    });
</script>

{#if showToast}
    <div class="floating-toast glass-effect flex max-w-md items-center gap-5 rounded-xl border bg-surface/90 p-6 { styleClass.mainDiv }"
         in:fly out:fade>
        <div class="flex h-10 w-10 items-center justify-center rounded-full { styleClass.secondDiv }">

            {#if type === 'success'}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big-icon lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
            {:else if type === 'error'}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert-icon lucide-circle-alert"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            {/if}
            
        </div>
        <div>
            <span class="mb-1 font-bold { styleClass.text }">{ text }</span>		
        </div>
    </div>
{/if}
