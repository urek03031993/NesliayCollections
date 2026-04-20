<script lang="ts">
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import type { Stripe, StripeElements } from '@stripe/stripe-js';
	import { STRIPE_PUBLISHABLE_KEY } from '$env/static/private';
	import { Elements, PaymentElement } from 'svelte-stripe';
	import { cart, cartTotal } from '$lib/stores/store';

	let { startDate, endDate, rentalAgreement } = $props(); 

	let stripe = $state<Stripe | null>();
	let clientSecret = $state<string | null>(null);
	let error = $state<string | null>();
	let elements = $state<StripeElements>();
	let processing = $state(false);

	let name = $state();
	let last_name = $state();
	let email = $state();
	let phone = $state();
	let document_type = $state();
	let identification_document = $state();
	// let rentalId = $state<string>();

	let clientDataValid = $derived.by(() => {
		return !name || !last_name || !email || !identification_document
	});

	onMount(async () => {
		stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
	});

	
	async function createPaymentIntent(event: SubmitEvent) {
		event.preventDefault();

		const response = await fetch('/api/stripe/create-reservation', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				startDate:  startDate, 
				endDate: endDate,			
				basePrice: $cartTotal, 				
				termsAccepted: rentalAgreement,
				orderItems: $cart,
				name: name, 
				last_name: last_name,
				email: email, 
				phone: phone,
				document_type: document_type, 
				identification_document: identification_document				
			})
		});

		const json_response = await response.json();

		clientSecret = json_response.clientSecret
	}


	async function submit(event: SubmitEvent) {
		event.preventDefault();	

		if (processing || !stripe || !elements || !clientSecret) return;

		processing = true;

		await elements.submit();

		const result = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${window.location.origin}/checkout/payment/thanks`
			}
		});

		if (result.error) {
			error = result.error.message;
			processing = false;
		}
	}
</script>

<h2 class="font-notoSerif text-primary mb-4 text-3xl tracking-tight md:text-4xl">
	{#if !clientSecret}
		Personal Data
	{:else}
		Order Payment
	{/if}
</h2>

{#if error}
	<p class="error">{ error } Please try again.</p>
{/if}

{#if !clientSecret }
	<form name="clientDataForm" onsubmit={ createPaymentIntent } class="mt-2 space-y-6" data-netlify="true">

		<div class="space-y-1">
            <label for="name" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Name</label>
            <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                   type="text" name="name" id="name" bind:value={ name } placeholder="Manuel" required />
        </div>

		<div class="space-y-1">
            <label for="last_name" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Last Name</label>
            <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                   type="text" name="last_name" id="last_name" bind:value={ last_name } placeholder="Benitez Gonzalez" required />
        </div>

		<div class="space-y-1">
            <label for="email" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Email</label>
            <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                   type="text" name="email" id="email" bind:value={ email } placeholder="manuel.benitez@gmail.com" required />
        </div>

		<div class="space-y-1">
            <label for="phone" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Phone</label>
            <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                   type="text" name="phone" id="phone" bind:value={ phone } placeholder="" required />
        </div>

		<div class="space-y-1">
            <label for="document_type" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Document Type</label>
            <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                   type="text" name="document_type" id="document_type" bind:value={ document_type } placeholder="license" required />
        </div>

        <div class="space-y-1">
            <label for="identification_document" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Identification Number</label>
            <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                   type="text" name="identification_document" id="identification_document" bind:value={ identification_document } placeholder="" required />            
        </div>        

        <div class="flex justify-end">
            <button class="px-5 py-2.5 rounded-2xl font-bold text-white justify-end disabled:opacity-50 disabled:cursor-not-allowed"
                style="background: linear-gradient(to right, #735c00, #d4af37);"
                type="submit" disabled={ clientDataValid } >Acept</button>        
        </div>
	</form>
{/if}

{#if stripe && clientSecret}
    <Elements { stripe } { clientSecret } bind:elements 
            appearance = {{ theme: 'flat', labels: 'floating', variables: { colorPrimary: '#7c4dff' }, rules: { '.Input': { border: 'solid 1px #0002' }}
        }}>
        <form name="paymentForm" onsubmit = { submit } data-netlify="true">
            <PaymentElement />

            <button disabled = { processing }>
                {#if processing}
                    Processing...
                {:else}
                    Pay
                {/if}
            </button>
        </form>
    </Elements>
{/if}


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
		color: rgb(0, 0, 0);
		background: var(--link-color);
		font-size: 1.2rem;
		margin: 1rem 0;
	}
</style>
