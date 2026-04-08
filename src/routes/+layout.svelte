<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import MobileNav from '$lib/components/MobileNav/MobileNav.svelte';
	import { onMount } from 'svelte';
	import { cart } from '$lib/stores/store';

	onMount(()=>{
		cart.loadStoredItems();
	});

	let { children } = $props();	
</script>

<svelte:head>
	<link rel="icon" href={ favicon } />
</svelte:head>

{@render children()}

<Footer />
<MobileNav />


