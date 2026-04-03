<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import type { SizeDto } from "$lib/server/types/Dto";
    
    let { 
        size = $bindable(), 
        height = $bindable() 
    }: Partial<SizeDto> = $props();
</script>

<form method="POST" use:enhance>
    <div class="space-y-1 mt-5">
        <label for="size" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">size</label>
        <input class="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 focus:ring-2 focus:ring-primary/20 transition-all font-body text-black"
                type="text" name="size" id="size" bind:value={ size } placeholder="XL" required />
    </div>

    <div class="space-y-1 mt-5">
        <label for="height" class="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-manrope">Height</label>
        <select id="height" name="height"
                class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-amber-600/20 transition-all font-sans" 
                bind:value={ height }>
            <option value="child">Child</option>
            <option value="adult">Adult</option>
        </select>
    </div>

    <div class="mt-5">
        <button type="submit">Create</button>
        <button class="ml-4" onclick={()=>{goto(resolve('/admin/sizes'))}}>Cancel</button>
    </div>    
</form>

