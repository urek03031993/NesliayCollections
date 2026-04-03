<script>
    import { page } from "$app/state";

    let { href = '#', text = '' } = $props();

    let urlPath = $state(page.url.pathname)

    let class_style = $derived.by(()=>{
        let aux_class = ''        
        
        if (urlPath.startsWith(href) && urlPath === href){
            aux_class = 'text-primary border-b-2 border-primary/30 pb-1';
        }else{
            aux_class = 'text-on-surface-variant hover:text-primary transition-colors'
        }

        return 'font-notoSerif tracking-tight text-lg ' +  aux_class
    });
</script>

<a class={class_style} {href} rel="">{text}</a>

