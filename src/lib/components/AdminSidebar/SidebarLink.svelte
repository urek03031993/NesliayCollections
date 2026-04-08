<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	let { children, href='#top' }: { children: Snippet, href: string } = $props();

	let urlPath = $state(page.url.pathname)

	let classBase: string = $state('flex items-center gap-3 py-3 transition-all duration-200 ');
    let activeClass: string = "rounded-l-full bg-[#ffffff] text-[#735c00] shadow-sm ml-4 pl-4";
    let defaultClass: string = "text-[#4d4635]  hover:bg-[#ffffff]/50 px-8"

</script>

<a  class="flex items-center gap-3 py-3 transition-all duration-200 { urlPath.startsWith(href) ? activeClass  :  defaultClass }" { href } rel="">
    {@render children()}
</a>