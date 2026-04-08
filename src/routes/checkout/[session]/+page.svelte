<!-- <script lang="ts">
	import { onMount } from 'svelte';
    import { page } from '$app/state';
	import { resolve } from '$app/paths';
	

	let state: 'verificando' | 'confirmado' | 'error';
	let orderDetails: {orderId: number, amount: number, customerEmail: string } | undefined;

	onMount(async () => {
		const sessionId = page.url.searchParams.get('session_id');

		if (!sessionId) {
			state = 'error';
			return;
		}

		try {
			// Verificar el estado del pago con tu backend
			const response = await fetch(`/api/verificar-pago?session_id=${sessionId}`);
			const data = await response.json();

			if (data.status === 'paid') {
				state = 'confirmado';
				orderDetails = data;

				// Aquí actualizas tu base de datos local
				// await fetch('/api/confirmar-orden', { method: 'POST', body: JSON.stringify({ orderId: data.orderId }) });
			} else {
				state = 'error';
			}
		} catch (error) {
            console.error(error)
			state = 'error';
		}
	});
</script>

{#if state === 'verificando'}
	<div>Verificando tu pago...</div>
{:else if state === 'confirmado'}
	<div class="success">
		<h1>¡Pago Confirmado! ✅</h1>
		<p>Orden: { orderDetails?.orderId }</p>
		<p>Monto: ${ orderDetails?.amount }</p>
		<p>Email: { orderDetails?.customerEmail }</p>
		<a href={ resolve('/checkout')}>Back to cart</a>
	</div>
{:else}
	<div class="error">
		<h1>Error en el pago</h1>
		<p>Hubo un problema confirmando tu pago. Contacta soporte.</p>
	</div>
{/if} -->
