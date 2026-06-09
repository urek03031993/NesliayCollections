<script lang="ts">
	import Toast from "./Toast.svelte";
	import { toasts } from "$lib/stores/store";
</script>


<div class="fixed z-50 space-y-3 top-4 right-4">
	{#each $toasts as toast(toast.id)}
		<Toast id={toast.id} text={toast.message} type={toast.type}/>		
	{/each}
</div>
