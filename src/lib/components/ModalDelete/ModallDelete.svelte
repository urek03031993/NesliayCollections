<script lang="ts">	
    // import { enhance } from "$app/forms";
	import type { ModalDeleteProps } from "./interfaces";
    import Modal from "../Modal/Modal.svelte";

    let { open = $bindable(true), id = $bindable(0) }: ModalDeleteProps = $props();   
    let disabled_submit:boolean = $derived(id === 0 ? true : false);
</script>


<Modal bind:open >
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert-icon lucide-circle-alert shrink-0 mx-auto mt-8 mb-4"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>

    <h3 class="mb-6 text-center text-lg text-gray-500 dark:text-gray-300">
        Are you sure you want to delete this record?
    </h3> 
 
    <div class="flex items-center justify-center">
        <form name="deleteForm" method="POST" data-netlify="true">
            <input type="hidden" name="id" value={ id } required/>

            <div class="space-x-2">
                <button class="text-center font-medium inline-flex items-center justify-center text-white bg-red-700 hover:bg-red-800 px-5 py-2.5 text-sm focus-within:ring-4 focus-within:outline-hidden rounded-lg"
                            type="submit" disabled={ disabled_submit } color="red">Yes, acept</button>
                <button class="text-center font-medium inline-flex items-center justify-center text-gray-900 bg-transparent border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 hover:text-primary-700 focus-within:text-primary-700 dark:focus-within:text-white dark:hover:text-white dark:hover:bg-gray-700 focus-within:ring-gray-200 dark:focus-within:ring-gray-700 px-5 py-2.5 text-sm focus-within:ring-4 focus-within:outline-hidden rounded-lg"
                            type="button" onclick={() => (open = false)} color="alternative">No, cancel</button>

            </div>                       
        </form> 
    </div>

</Modal>
