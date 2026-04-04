<script lang="ts">
	import Dialog from "./dialog.svelte";
	import type { ModalProps } from "./interfaces";	

	let { children,
		  title, 
		  footer,
		  open = $bindable(false)
		}: ModalProps = $props() ;

</script>



<Dialog bind:open>

	{#if title}				
		<div class="flex items-center p-4 md:p-5 justify-between rounded-t-lg shrink-0 text-xl font-bold text-primary uppercase">
			<h3>{title}</h3>			
		</div>
	{/if}	

	<div class="p-4 md:p-5 space-y-4 overflow-y-auto overscroll-contain">
		{@render children?.()}
	</div>

	{#if footer}
        {@render footer?.()}
	{/if}	
</Dialog>
