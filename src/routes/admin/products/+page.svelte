<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import AdminSidebar from "$lib/components/AdminSidebar/AdminSidebar.svelte";
	import ModallDelete from "$lib/components/ModalDelete/ModallDelete.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	let delete_id: number = $state(0);
	let open_delete: boolean = $state(false) 

	function edit_button(id: number){
    	goto(resolve(`/admin/products/${id}`));
    }

	function delete_button(id: number){
		if(id > 0){
			delete_id = id
        	open_delete = !open_delete
		}        
    }
</script>

<AdminSidebar/>

<main class="min-h-screen px-8 pt-12 pb-12 md:ml-64">
	<header class="mb-12 flex flex-col justify-between space-y-4 md:flex-row md:items-end md:space-y-0">
		<div>
			<h1 class="font-notoSerif text-primary text-4xl font-bold tracking-tight md:text-5xl">
				Dress Inventory
			</h1>
			<p class="text-on-surface-variant font-body mt-2 italic">
				The best dresses for the best occasions.
			</p>
		</div>
		<div class="flex items-center space-x-4">
			<!-- <div class="relative">
				<span class="material-symbols-outlined text-on-surface-variant absolute top-1/2 left-3 -translate-y-1/2 text-xl">
                    search
                </span>
				<input
					class="bg-surface-container-lowest focus:ring-primary-container w-64 rounded-xl border-none py-2 pr-4 pl-10 text-sm shadow-sm focus:ring-2"
					placeholder="Search archive..."
					type="text"
				/>
			</div> -->
			<button class="bg-tertiary text-on-tertiary flex items-center space-x-2 rounded-full px-6 py-2 font-medium shadow-lg transition-all hover:brightness-110"
                    onclick={()=>{goto(resolve('/admin/products/new'))}}>
				<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
				<span>New Dress</span>
			</button>
		</div>
	</header>

	<div class="bg-surface-container-low overflow-hidden rounded-3xl shadow-[0_8px_32px_rgba(28,28,24,0.04)]">
		<div class="overflow-x-auto">
			<table class="w-full border-collapse text-left">
				<thead>
					<tr class="bg-surface-container text-on-surface-variant border-outline-variant/10 border-b">
						<th class="font-manrope px-8 py-6 text-xs font-semibold tracking-widest uppercase">
                            Id
                        </th>
						<th class="font-manrope px-6 py-6 text-xs font-semibold tracking-widest uppercase">
                            Name
                        </th>
						<th class="font-manrope px-6 py-6 text-xs font-semibold tracking-widest uppercase">
                            Description
                        </th>
                        <th class="font-manrope px-6 py-6 text-xs font-semibold tracking-widest uppercase">
                            Color
                        </th>
                        <th class="font-manrope px-6 py-6 text-xs font-semibold tracking-widest uppercase">
                            Activo
                        </th>
                        <th class="font-manrope px-6 py-6 text-xs font-semibold tracking-widest uppercase">
                            Actions
                        </th>						
					</tr>
				</thead>

				<tbody class="divide-outline-variant/10 divide-y">
                    {#each data.products as product, index (product.id)}
                        <tr class="hover:bg-surface-container-lowest group transition-colors">
                            <td class="px-8 py-5">
                                <div class="flex items-center space-x-4">
                                    <div>
                                        <div class="text-on-surface font-manrope font-bold">{ index + 1 }</div>									
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-5">
                                <div class="text-primary font-semibold">{ product.name }</div>
                            </td>
                            <td class="px-6 py-5">
                                <div class="text-primary font-semibold">{ product.description }</div>
                            </td>
                            <td class="px-6 py-5">
                                <div class="text-primary font-semibold">{ product.color }</div>
                            </td>
                            <td class="px-6 py-5">
                                <div class="text-primary font-semibold">{ product.activo ? 'Yes' : 'No' }</div>
                            </td>                            
                            <td class="px-8 py-5 text-right">
                                <div class="flex items-center justify-center space-x-4 opacity-0 transition-opacity group-hover:opacity-100">
                                <button class="text-primary hover:text-primary-container flex items-center text-sm font-bold" 
											onclick={() => (edit_button(product.id))}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-pen-line-icon lucide-file-pen-line mr-1"><path d="M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z"/><path d="M14.487 7.858A1 1 0 0 1 14 7V2"/><path d="M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516"/><path d="M8 18h1"/></svg>
										Edit
                                    </button>


                                    <button class="text-error hover:text-error-container flex items-center text-sm font-bold"
											onclick={() => (delete_button(product.id))}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
										Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    {/each}                    
				</tbody>
                
			</table>
		</div>

		<!-- <div class="bg-surface-container-lowest border-outline-variant/5 flex items-center justify-between border-t px-8 py-6">
			<span class="text-on-surface-variant text-sm font-medium italic">
                Showing 1 to 5 of 128 archival pieces
            </span>
			<div class="flex items-center space-x-2">
				<button aria-label="go-left" class="bg-surface-container hover:bg-surface-container-high text-primary flex h-10 w-10 items-center justify-center rounded-full transition-colors">
					<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>

				</button>
				<button class="bg-primary text-on-primary flex h-10 w-10 items-center justify-center rounded-full shadow-md">1</button>
				<button class="bg-surface-container-lowest border-outline-variant/20 hover:bg-surface-container flex h-10 w-10 items-center justify-center rounded-full border transition-colors">
                    2
                </button>
				<button class="bg-surface-container-lowest border-outline-variant/20 hover:bg-surface-container flex h-10 w-10 items-center justify-center rounded-full border transition-colors">
                    3
                </button>
				<button aria-label="go-right" class="bg-surface-container hover:bg-surface-container-high text-primary flex h-10 w-10 items-center justify-center rounded-full transition-colors">
                	<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>

				</button>
			</div>
		</div> -->

	</div>
</main>

<ModallDelete bind:open={ open_delete } id={ delete_id }/>