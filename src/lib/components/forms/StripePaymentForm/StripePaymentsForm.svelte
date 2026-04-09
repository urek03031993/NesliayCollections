<script lang="ts">
	// import { onMount } from 'svelte';
	// import { loadStripe } from '@stripe/stripe-js';
	// import type { Stripe, StripeElements } from '@stripe/stripe-js';
	// import { PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY } from '$env/static/public';
	// import { Elements, LinkAuthenticationElement, PaymentElement, Address } from 'svelte-stripe';
	// import { cart, cartTotal } from '$lib/stores/store';

	let { startDate, endDate } = $props(); 

	// let stripe = $state<Stripe | null>();
	// let clientSecret = $state<string | null>(null);
	// let error = $state<string | null>();
	// let elements = $state<StripeElements>();
	// let processing = $state(false);

	// onMount(async () => {
	// 	stripe = await loadStripe(PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY);
	// 	clientSecret = await createPaymentIntent();
	// });
	
	// async function createPaymentIntent() {
	// 	const response = await fetch('/api/stripe/create-payment-intent', {
	// 		method: 'POST',
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		},
	// 		body: JSON.stringify({ total: $cartTotal })
	// 	});

	// 	const { clientSecret } = await response.json();

	// 	return clientSecret;
	// }


	// async function submit(event: SubmitEvent) {
	// 	event.preventDefault();	

	// 	if (processing || !stripe || !elements || !clientSecret) return;

	// 	processing = true;

	// 	await elements.submit();

	// 	const result = await stripe.confirmPayment({
	// 		elements,
	// 		clientSecret,
	// 		confirmParams: {
	// 			return_url: `${window.location.origin}/checkout/payment/thanks`
	// 		}
	// 	});



	// 	if (result.error) {
	// 		error = result.error.message;
	// 		processing = false;

	// 	}else{

	// 		const response = await fetch('/api/checkout', {
	// 			method: 'POST',
	// 			headers: {
	// 				'content-type': 'application/json'
	// 			},
	// 			body: JSON.stringify({
	// 				startDate:  startDate, 
	// 				endDate: endDate,
	// 				total: $cartTotal,
	// 				tax: Math.round($cartTotal * 100) / 100,
	// 				orderItems: $cart					
	// 			})
	// 		});
	// 		const jsonCheckout = await response.json();

	// 		processing = false;
	// 		console.log(jsonCheckout)
	// 	}
	// }
</script>
<p>{startDate} to {endDate}</p>
<!-- 
<h4 class="font-notoSerif text-primary mb-4 text-5xl tracking-tight md:text-6xl">
	Order Payment
</h4>

{#if error}
	<p class="error">{error} Please try again.</p>
{/if}

{#if stripe && clientSecret}
    <Elements { stripe } { clientSecret } bind:elements 
            appearance = {{ theme: 'flat', labels: 'floating', variables: { colorPrimary: '#7c4dff' }, rules: { '.Input': { border: 'solid 1px #0002' }}
        }}>
        <form onsubmit = { submit }>
            <LinkAuthenticationElement />
            <PaymentElement />
            <Address mode="billing" />

            <button disabled = { processing }>
                {#if processing}
                    Processing...
                {:else}
                    Pay
                {/if}
            </button>
        </form>
    </Elements>
{:else}
    Loading...
{/if}

 -->
<style>
	.error {
		color: tomato;
		margin: 2rem 0 0;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 2rem 0;
	}

	button {
		padding: 1rem;
		border-radius: 5px;
		border: solid 1px #ccc;
		color: white;
		background: var(--link-color);
		font-size: 1.2rem;
		margin: 1rem 0;
	}
</style>
