<script lang="ts">
    import { page } from "$app/state";
    import { authenticated } from "$lib/stores/store";
    import Modal from '$lib/components/Modal/Modal.svelte';
    import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";
	//import { enhance } from "$app/forms";

    let openModal = $state(false);
    let username = $state(''); 
    let password = $state('');
    let showPass = $state(false);

    const homeUrl = $derived.by(()=>{
        return page.url.pathname === '/';
    });
</script>

{#if !$authenticated } 
    {#if homeUrl} 
        <button class="hover:opacity-80 transition-opacity duration-300 text-on-surface-variant" onclick={()=>{ openModal = true} }>
                        <!------>                
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
            
        </button>
    {/if}
{:else} 
    <button class="hover:opacity-80 transition-opacity duration-300 text-on-surface-variant" onclick={()=>{ goto(resolve('/admin/sizes')) }} >
        <!------>                
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
        
    </button>
{/if}

<Modal title='Login' bind:open={ openModal }>
    <form name="loginForm" class="mt-2 space-y-6" method="POST" data-netlify="true">
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

        <div class="flex justify-end">
            <button class="px-5 py-2.5 rounded-lg font-bold text-white justify-end disabled:opacity-50 disabled:cursor-not-allowed"
                style="background: linear-gradient(to right, #735c00, #d4af37);"
                type="submit" disabled={ !username || !password } >Access</button>
        
        </div>
    </form>
</Modal>