<script lang="ts">
    import { resolve } from "$app/paths";
</script>

<nav class="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-surface/90 backdrop-blur-lg z-50 rounded-t-3xl border-t border-outline-variant/15 shadow-[0_-8px_32px_rgba(28,28,24,0.06)]">
    <a class="flex flex-col items-center justify-center bg-primary-container/20 text-primary rounded-full px-4 py-2" href={resolve('/')}>
        <span class="material-symbols-outlined">home</span>
        <span class="font-manrope text-[10px] font-medium tracking-widest uppercase">Home</span>
    </a>
    <a class="flex flex-col items-center justify-center text-on-surface-variant opacity-70" href={resolve('/catalog')}>
        <span class="material-symbols-outlined">auto_awesome</span>
        <span class="font-manrope text-[10px] font-medium tracking-widest uppercase">Catalog</span>
    </a>
    <!-- <a class="flex flex-col items-center justify-center text-on-surface-variant opacity-70" href="#">
        <span class="material-symbols-outlined">favorite</span>
        <span class="font-manrope text-[10px] font-medium tracking-widest uppercase">Favorites</span>
    </a>
    <a class="flex flex-col items-center justify-center text-on-surface-variant opacity-70" href="#">
        <span class="material-symbols-outlined">shopping_basket</span>
        <span class="font-manrope text-[10px] font-medium tracking-widest uppercase">Cart</span>
    </a> -->
</nav>

<!-- Mobile Bottom Navigation Bar -->
<!-- <nav
	class="bg-surface/90 border-outline-variant/15 fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-3xl border-t px-4 pt-3 pb-6 shadow-[0_-8px_32px_rgba(28,28,24,0.06)] backdrop-blur-lg md:hidden dark:bg-zinc-950/90"
>
	<div
		class="text-on-surface-variant flex flex-col items-center justify-center opacity-70 transition-transform active:scale-90 dark:text-zinc-500"
	>
		<span class="material-symbols-outlined" data-icon="home">home</span>
		<span class="font-manrope text-[10px] font-medium tracking-widest uppercase">Home</span>
	</div>
	<div
		class="bg-primary-container/20 dark:bg-primary/10 text-primary dark:text-primary-container flex flex-col items-center justify-center rounded-full px-4 py-2 transition-transform active:scale-90"
	>
		<span class="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
		<span class="font-manrope text-[10px] font-medium tracking-widest uppercase">Catalog</span>
	</div>
	<div
		class="text-on-surface-variant flex flex-col items-center justify-center opacity-70 transition-transform active:scale-90 dark:text-zinc-500"
	>
		<span class="material-symbols-outlined" data-icon="favorite">favorite</span>
		<span class="font-manrope text-[10px] font-medium tracking-widest uppercase">Favorites</span>
	</div>
	<div
		class="text-on-surface-variant flex flex-col items-center justify-center opacity-70 transition-transform active:scale-90 dark:text-zinc-500"
	>
		<span class="material-symbols-outlined" data-icon="shopping_basket">shopping_basket</span>
		<span class="font-manrope text-[10px] font-medium tracking-widest uppercase">Cart</span>
	</div>
</nav> -->