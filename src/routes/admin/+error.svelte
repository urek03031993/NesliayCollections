<script lang="ts">
	import { resolve } from '$app/paths';
	import Header from '$lib/components/Header/Header.svelte';
    import { page } from '$app/state';

</script>

<Header />

<main class="relative z-10 flex grow flex-col items-center justify-center px-6 pt-24 pb-12">
	<div class="mx-auto w-full max-w-4xl text-center">
		<div class="animate-float relative mb-12 md:mb-16">
			<div class="absolute inset-0 -z-10 scale-150 rounded-full bg-primary-container/10 blur-3xl"></div>
			<img    alt="Una hebra de seda dorada"
                    class="mx-auto h-100 w-full max-w-md rounded-4xl object-cover shadow-[0_32px_64px_rgba(28,28,24,0.08)] brightness-105 grayscale-[0.3]"
                    data-alt="A macro photograph of a singular, ethereal gold silk thread floating weightlessly in a luminous, high-key studio environment. The thread is captured in sharp focus against a soft, cream-colored background, creating a dreamy and minimalist editorial aesthetic. Soft, diffused lighting highlights the delicate texture of the silk, casting subtle, ambient shadows. The overall mood is serene, luxurious, and poetic, perfectly aligning with a high-end fashion atelier's visual identity."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmvG4Ska0nleP6GFjuVsxyjuDldwjRIqPHIyJwRHE4fCfYrut89u9QPJOim0zeT17kB25oxtD-Jetn18dXQ9reQ9vxyn37--SGkM5hh2viVX9SCyoD2X_FiZ8erUzRkquGa2N6ZrQinajZ7qusoy-5ERXjmlMQyfoTg3Eys55fSbEtqIMns4ihA8_ixaNcwKI7qUlTRd15mgSsHbwhetpHvvIRzfZepYuyf-vIz8XFDBm1n1bjJwEf4wcew7xFIIYVgxvbngRjYYty"
			/>
		</div>
		<h1 class="font-display mb-6 text-4xl leading-tight tracking-tight text-on-surface md:text-6xl lg:text-7xl">
			{page.status}: {page.error?.message}
		</h1>

		<p class="font-body mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-on-surface-variant opacity-90 md:text-xl">
			Incluso en el atelier más refinado, a veces los hilos se cruzan. La página que buscas parece
			haberse desvanecido como la seda en la brisa.
		</p>
        <p class="font-body mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-red-600 opacity-90 md:text-xl">
			Si persiste el error contacter con el administrador
		</p>
		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a 	class="group relative rounded-full bg-linear-to-r from-primary to-primary-container px-10 py-4 font-semibold tracking-wide text-on-primary shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/20"
				href={resolve('/')}
			>
				Volver al Inicio
			</a>
			<a  class="rounded-full bg-surface-container-highest px-10 py-4 font-semibold tracking-wide text-primary transition-all duration-300 hover:bg-surface-container-high"
				href={resolve('/collections')}
			>
				Explorar Colecciones
			</a>
		</div>
	</div>
</main>
