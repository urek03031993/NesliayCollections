<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let urlPath = $state(page.url.pathname)
    let activeClass: string = "rounded-l-full bg-[#ffffff] text-[#735c00] shadow-sm ml-4 pl-4";
    let defaultClass: string = "text-[#4d4635]  hover:bg-[#ffffff]/50 px-8"    
</script>

<aside class="fixed top-0 left-0 z-40 hidden h-screen w-64 flex-col bg-surface-container-low py-8 lg:flex dark:bg-slate-900">
	<div class="mb-10 px-8">
		<h2 class="font-notoSerif text-xl text-[#735c00]">Atelier Manager</h2>
		<p class="text-on-surface-variant text-xs font-medium">Royal Collection</p>
	</div>

	<nav class="flex-1 space-y-1">
		<a class="flex items-center gap-3 px-8 py-3 text-on-surface-variant transition-all duration-200 hover:bg-[#ffffff]/50"
        	href={resolve('/')} aria-label="home">			
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house">
				<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
			</svg>
			<span class="font-manrope text-sm font-medium">Home</span>
		</a>

		<a  class="flex items-center gap-3 py-3 transition-all duration-200 { urlPath.startsWith('/admin/sizes') ? activeClass  :  defaultClass }"
			href={resolve('/admin/sizes')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shirt-truler-icon lucide-shirt-t-ruler"><path d="M6 11H3c-.6 0-1-.4-1-1V6c0-1.1.8-2.3 1.9-2.6L8 2a4 4 0 0 0 8 0l4.1 1.4C21.2 3.7 22 4.9 22 6v4c0 .6-.4 1-1 1h-3"/><path d="M6 18V8"/><path d="M18 8v10"/><rect width="20" height="6" x="2" y="16" rx="2"/><path d="M10 16v2"/><path d="M14 16v2"/></svg>
			<span class="font-manrope text-sm font-medium">Sizes</span>
		</a>
		<a  class="flex items-center gap-3 py-3 transition-all duration-200 { urlPath.startsWith('/admin/products') ? activeClass  :  defaultClass }"
			href={resolve('/admin/products')}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dress-icon lucide-dress"><path d="M16 2v3a5.14 5.14 0 0 1 .7 4.8l-.2.5a7.64 7.64 0 0 0 .4 6.3C17.7 17.9 19 20 19 20s-3.1 2-7 2-7-2-7-2 1.3-2.1 2.1-3.5a7.64 7.64 0 0 0 .4-6.2l-.2-.5A5.66 5.66 0 0 1 8 5V2"/><path d="M16 5c-1.8 0-3.3 1-4 2.5C11.3 6 9.8 5 8 5"/></svg>
			<span class="font-manrope text-sm font-medium">Dresses</span>
		</a>
		<a  class="flex items-center gap-3 py-3 transition-all duration-200 { urlPath.startsWith('/admin/rentals') ? activeClass  :  defaultClass }"
			href={resolve('/admin/rentals')}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tuxedo-icon lucide-tuxedo"><path d="M10 3v2l4-2v2Z"/><path d="M18 3h1a2 2 0 0 1 1.7 3A5270.5 5270.5 0 0 0 12 21S6.8 12 3.3 6A2 2 0 0 1 5 3h1"/><path d="M12 9h.01"/><path d="M12 13h.01"/><path d="M21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/></svg>
			<span class="font-manrope text-sm font-medium">Rentals</span>
		</a>
	</nav>
	<!-- <div class="mt-auto space-y-4 px-8">
		<div class="space-y-2 pt-6">
			<a class="flex items-center gap-3 text-sm font-medium text-on-surface-variant" href={resolve('/logout')}>
				Logout
			</a>
		</div>
	</div> -->
</aside>

