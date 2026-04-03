<script lang="ts">
    import { page } from "$app/state";
    import type { LinkDinamic } from "./interface";


    let {   children,
            title,
            href='#', 
            baseClass='', 
            activeClass='', 
            nonActiveClass='',
    }: LinkDinamic = $props();

    let urlPath = $state(page.url.pathname)

    console.log(urlPath)

    const classStyle = $derived.by(()=>{   
        console.log(urlPath.startsWith(href))     
        
        if (urlPath.startsWith(href)){
            return baseClass + ' ' + activeClass

        }else{
            return baseClass + ' ' + nonActiveClass
        }        
    });
</script>

<a class = { classStyle } { href } rel="">    
    {#if children}
        {@render children()}
    {/if}
</a>

