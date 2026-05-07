<script lang="ts">

    let { src = '' } = $props();

    let files = $state<FileList | null>();
    let fileInput = $state<HTMLInputElement>();
    let previewUrl = $state('');
    let imgSrc = $state('');

    
    function clearFiles(): void {
        if(files){ 
            files = null;
            imgSrc = ''; 
        }        
	}

	function handleFileSelect(): void {
		const selectedFiles = fileInput?.files;

		if (selectedFiles && selectedFiles.length > 0) {
			files = selectedFiles;
            previewUrl = URL.createObjectURL(files[0]);	

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const img = new Image();
            const blobUrl = URL.createObjectURL(files[0]);
            img.src = blobUrl;

            img.onload = () => {
                const maxWidth = 1080;
                const maxHeight = 1350;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                imgSrc = canvas.toDataURL('image/jpeg', 0.9);
                URL.revokeObjectURL(blobUrl);
            };

            img.onerror = () => {
                URL.revokeObjectURL(blobUrl);
            };  
		}

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
	}

	function openFileInput(): void {
        if(fileInput) fileInput.click();
	}
</script>

<div class="bg-surface-container-low group border-outline-variant/30 relative flex aspect-4/5 items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed p-1">
    {#if !files && !src}
        <div class="z-10 px-6 text-center justify-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-upload-icon lucide-cloud-upload text-primary mb-4 text-5xl"><path d="M12 13v8"/><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m8 17 4-4 4 4"/></svg>
            <p class="font-headline text-on-surface text-xl">Upload Creation Imagery</p>
            <p class="text-on-surface-variant font-body mt-2 text-sm">
                High-resolution portrait recommended (4:5 ratio)
            </p>
            {#if files === null || files === undefined }
                <button class="text-primary mt-6 rounded-full bg-white px-6 py-2 text-sm font-bold shadow-sm transition-all hover:shadow-md" 
                        type="button" onclick={()=>{ openFileInput()}}> 
                    Browse Files
                </button>
            {/if}                        
        </div>
    {/if}
    <input id="images" name="images" type="file" accept="image/png, image/jpeg" hidden
                    bind:this={ fileInput } onchange={ handleFileSelect }/>
    <div class="bg-surface-container-low absolute aspect-4/5 overflow-hidden rounded-3xl">
        {#if files || src}
            {#if imgSrc || src}
                <img src={ src } alt="Vista previa"/>
            {/if}
            <div class="absolute inset-0 bg-black/5 transition-colors group-hover:bg-black/0"></div>
            <button class="bg-surface/90 text-primary absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-4 rounded-full px-8 py-3 text-sm font-semibold opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    onclick={()=>{ clearFiles() }}
                    type="button"
                    title="delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>                                                 
        {/if}                    
    </div>
</div>

