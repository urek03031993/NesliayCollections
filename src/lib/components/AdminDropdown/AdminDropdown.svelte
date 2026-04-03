<script lang="ts">
    import { authenticated } from "$lib/stores/store";
    import Modal from '$lib/components/Modal/Modal.svelte';
    import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";

    let openModal = $state(false);
    let username = $state(''); 
    let password = $state('');
    let showPass = $state(false);
</script>


<button class="hover:opacity-80 transition-opacity duration-300 text-on-surface-variant" popovertarget="admin-popover">
                <!------>                
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
    </svg>
    
</button> 


<button class="hover:opacity-80 transition-opacity duration-300 text-on-surface-variant" onclick={()=>{ goto(resolve('/admin/sizes')) }} >
    <!------>                
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
    
</button>

<div id="admin-popover" popover 
    class="mt-2 divide-y divide-gray-300 overflow-visible rounded-lg bg-white shadow-sm dark:divide-gray-500 dark:bg-gray-700"
    style="position: absolute; left: 1462.19px; right: auto; top: 52px;">
        
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">

        {#if !$authenticated} 
            <li>
                <button class="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-primary"
                onclick={()=>{ openModal = true} }>
                    Sign In
                </button>			
            </li>

        {:else}

             <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <span class="block text-sm">Nesliay Collection</span>
                <span class="block truncate text-sm font-medium">neliay.collection@gmail.com</span>
            </div>	
            
            <div class="my-1 h-px bg-gray-100 dark:bg-gray-500"></div>
            
            <li>
                <div class="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-primary">
                    Sign out
                </div>			
            </li>            
        {/if} 
        		
    </ul>	    
</div>

<Modal title='Login' bind:open={ openModal }>
    <form class="mt-2 space-y-6" method="POST" action="?/login">
        <div class="space-y-1">
            <label for="username" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Usuario</label>
            <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                   type="text" name="username" id="username" bind:value={ username } placeholder="manuel.benitez" required />
        </div>	
        <div class="space-y-1">
            <label for="password" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Contraseña</label>
            <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                   type={showPass ? "text" : "password"} name="password" id="password" bind:value={ password } placeholder="••••••••" required />            
        </div>
        
        <button class="text-center text-black"
        
                type="submit" disabled={ !username || !password } >Acceder</button>
    </form>
</Modal>