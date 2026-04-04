<script lang="ts">
    import { resolve } from "$app/paths";
    import { authenticated } from "$lib/stores/store";

    import NavLink from "../NavLink/NavLink.svelte";    
    import AdminDropdown from "../AdminDropdown/AdminDropdown.svelte";
	import { onMount } from "svelte";

    onMount(async()=>{
		const response = await fetch(`/api/auth/sessionVerifier`);
		
		if(response.ok){
			$authenticated = true;
		}
	});
</script>

<header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(28,28,24,0.04)]">
    <nav class="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
        <div class="font-notoSerif italic text-2xl text-primary">
            <a href={ resolve('/') }>Neliay Collection</a>  </div>

        <div class="hidden md:flex gap-10 items-center">
            <NavLink href={ resolve('/') } text='Home'/>
            <NavLink href={ resolve('/catalog')} text='Catalog'/>
            <NavLink text='Collections'/>
            <NavLink text='Contact'/>      
        </div>

        <div class="flex items-center gap-6">

            <a class="hover:opacity-80 transition-opacity duration-300 text-on-surface-variant" href={ resolve('/checkout')}>
                <!------>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag-icon lucide-shopping-bag">
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                    <path d="M3.103 6.034h17.794"/>
                    <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/>
                </svg>                                
            </a>            

            <AdminDropdown/>                   
            
            <!-- <button class="md:hidden text-on-surface-variant">
                <span class="material-symbols-outlined">menu</span>
            </button> -->
            
        </div>

    </nav>
</header>


