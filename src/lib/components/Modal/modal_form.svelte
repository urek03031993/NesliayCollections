<script lang="ts">	
	import Modal from "./Modal.svelte";

    let { open = $bindable(false) } = $props();
	let title = 'Formulario';
</script>


<Modal bind:open title={ title }>
	<h1> Form modal </h1>
	{#snippet footer()}
		<h1> footer </h1>		
	{/snippet}
</Modal>