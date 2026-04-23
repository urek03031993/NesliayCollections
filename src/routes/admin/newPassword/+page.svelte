<script lang="ts">
	import type { PageProps } from "./$types";
	import AdminSidebar from "$lib/components/AdminSidebar/AdminSidebar.svelte";

	let { form }: PageProps = $props();
</script>

<AdminSidebar/>

<main class="pt-24 lg:pl-72 pb-20 px-6 lg:px-12 min-h-screen">
    <div class="max-w-5xl mx-auto">
        <div class="mb-12">
            <h1 class="font-notoSerif text-4xl lg:text-5xl tracking-tight text-on-surface mb-2">
                Change Password
            </h1>
            <p class="text-on-surface-variant font-body">
                Update your account password.
            </p>
        </div>

        {#if form?.error}
            <div class="mb-6 rounded-lg bg-red-100 p-4">
                <p class="text-sm text-red-700">{ form.error }</p>
            </div>            
        {/if}

        {#if form?.success}
            <div class="mb-6 rounded-lg bg-green-100 p-4">
                <p class="text-sm text-green-700">{ form.message }</p>
            </div>            
        {/if}
        
        <form name="productForm" class="grid grid-cols-1 gap-8 md:grid-cols-12" method="POST" enctype="multipart/form-data" data-netlify="true">
            <div class="space-y-1 md:col-span-12">
                <label for="previousPass" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Previous Password</label>
                <input class="bg-surface-container-low focus:ring-primary/20 font-headline placeholder:text-outline w-full rounded-lg border-none p-4 text-xl italic transition-all focus:ring-2"
                        type="password" name="previousPass" id="previousPass" placeholder="Enter your previous password" required />                        
            </div>

            <div class="space-y-1 md:col-span-12">
                <label for="newPass" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">New Password</label>
                <input class="bg-surface-container-low focus:ring-primary/20 font-headline placeholder:text-outline w-full rounded-lg border-none p-4 text-xl italic transition-all focus:ring-2"
                        type="password" name="newPass" id="newPass" placeholder="Enter your new password" required />                        
            </div>

            <div class="space-y-1 md:col-span-12">
                <label for="confirmPass" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Confirm Password</label>
                <input class="bg-surface-container-low focus:ring-primary/20 font-headline placeholder:text-outline w-full rounded-lg border-none p-4 text-xl italic transition-all focus:ring-2"
                        type="password" name="confirmPass" id="confirmPass" placeholder="Confirm your new password" required />                        
            </div>

            <div class="flex flex-col gap-7 pt-4 md:col-span-3">
                <button class="text-on-primary font-manrope w-full scale-100 rounded-full py-6 text-base font-bold shadow-xl transition-all hover:scale-[1.02] hover:opacity-90 active:scale-95"
                        style="background: linear-gradient(to right, #735c00, #d4af37);"
                        type="submit">
                        Change Password
                </button>                    
            </div>
        </form>
    </div>
</main>

