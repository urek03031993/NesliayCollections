<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
		
	let { children } = $props();

	let urlPath = $state(page.url.pathname)

    function classStyle(base_url: string): string {
        let aux_class = ''        
        
        if (urlPath.startsWith(base_url)){
            aux_class = 'rounded-l-full bg-[#ffffff] text-[#735c00] shadow-sm ml-4 pl-4';
        }else{
            aux_class = 'text-[#4d4635]  hover:bg-[#ffffff]/50 px-8'
        }

        return 'flex items-center gap-3 py-3 transition-all duration-200  ' +  aux_class
    }
</script>

<aside class="fixed top-0 left-0 z-40 hidden h-screen w-64 flex-col bg-[#f6f3ed] py-8 lg:flex dark:bg-slate-900">
	<div class="mb-10 px-8">
		<h2 class="font-notoSerif text-xl text-[#735c00]">Atelier Manager</h2>
		<p class="text-on-surface-variant text-xs font-medium">Royal Collection</p>
	</div>
	<nav class="flex-1 space-y-1">
		<a class="flex items-center gap-3 px-8 py-3 text-[#4d4635] transition-all duration-200 hover:bg-[#ffffff]/50"
        	href={resolve('/')}>
			<span class="material-symbols-outlined">home</span>
			<span class="font-manrope text-sm font-medium">Home</span>
		</a>

		<a  class={ classStyle('/admin/sizes') }
			href={resolve('/admin/sizes')}>
            <span class="material-symbols-outlined">for_you</span>
			<span class="font-manrope text-sm font-medium">Sizes</span>
		</a>
		<a  class={ classStyle('/admin/products') }
			href={resolve('/admin/products')}>
			<span class="material-symbols-outlined">styler</span>
			<span class="font-manrope text-sm font-medium">Dresses</span>
		</a>
        <!-- <a  class="flex items-center gap-3 px-8 py-3 text-[#4d4635] transition-all duration-200 hover:bg-[#ffffff]/50"
			href="#">
			<span class="material-symbols-outlined">styler</span>
			<span class="font-manrope text-sm font-medium">Orders</span>
		</a>
		<a
			class="flex items-center gap-3 px-8 py-3 text-[#4d4635] transition-all duration-200 hover:bg-[#ffffff]/50"
			href="#"
		>
			<span class="material-symbols-outlined">group</span>
			<span class="font-manrope text-sm font-medium">Clients</span>
		</a>
		<a
			class="flex items-center gap-3 px-8 py-3 text-[#4d4635] transition-all duration-200 hover:bg-[#ffffff]/50"
			href="#"
		>
			<span class="material-symbols-outlined">event_seat</span>
			<span class="font-manrope text-sm font-medium">Fitting Room</span>
		</a>
		<a
			class="flex items-center gap-3 px-8 py-3 text-[#4d4635] transition-all duration-200 hover:bg-[#ffffff]/50"
			href="#"
		>
			<span class="material-symbols-outlined">insert_chart</span>
			<span class="font-manrope text-sm font-medium">Analytics</span>
		</a> -->
	</nav>
	<!-- <div class="mt-auto space-y-4 px-8">
		<button
			class="bg-primary text-on-primary font-manrope w-full rounded-full py-3 text-sm font-bold shadow-lg transition-opacity hover:opacity-90"
		>
			Book a Fitting
		</button>
		<div class="space-y-2 pt-6">
			<a class="flex items-center gap-3 text-sm font-medium text-[#4d4635]" href="#">
				<span class="material-symbols-outlined text-lg">settings</span>
				Settings
			</a>
			<a class="flex items-center gap-3 text-sm font-medium text-[#4d4635]" href="#">
				<span class="material-symbols-outlined text-lg">help_outline</span>
				Help
			</a>
		</div>
	</div> -->
</aside>


{@render children()}

