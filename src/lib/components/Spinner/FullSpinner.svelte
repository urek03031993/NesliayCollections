<script lang="ts">
	import { fade } from 'svelte/transition';
    import { loading } from '$lib/stores/store';

    // $effect(()=>{
    //     if($loading){
    //         rotateMessages();
    //     }else{
    //         clearInterval(messageInterval);
    //         clearTimeout(fadeTimeout);
    //     }
    // });


	let currentMessage = $state('Preparing the collection...');
    // let messageInterval: ReturnType<typeof setInterval>;
	// let fadeTimeout: ReturnType<typeof setTimeout>;
    // let msgVisible = false;

	// const messages = [
	// 	"Preparing the collection...",
	// 	"Weaving digital silks...",
	// 	"Selecting the finest textures...",
	// 	"Crafting your experience...",
	// 	"Finalizing the fitting..."
	// ];

	// function rotateMessages() {

	// 	let messageIndex = 0;        
	// 	messageInterval = setInterval(() => {
	// 		msgVisible = false; 
	// 		fadeTimeout = setTimeout(() => {
	// 			messageIndex = (messageIndex + 1) % messages.length;
	// 			currentMessage = messages[messageIndex];
	// 			msgVisible = true;
	// 		}, 1000);
	// 	}, 4000);
	// }
</script>


{#if $loading}
    <div class="bg-background text-on-background font-body overflow-hidden" transition:fade>
        <!-- Blurred Background Representation (The Atelier Workspace) -->
        <div class="fixed inset-0 z-0 bg-pulse overflow-hidden">
            <div class="absolute inset-0 bg-cover bg-center scale-110 blur-xl brightness-95" data-alt="An ultra-high-end fashion designer's atelier workspace. Soft sunlight filters through tall arched windows onto a mahogany cutting table covered in fine silks and golden threads. A vintage gold-plated sewing machine sits elegantly in the corner. The scene is shot with a shallow depth of field, creating a dreamy, blurred ethereal atmosphere in cream, gold, and warm wood tones." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXV23ItBtaRyGic3uADPPYOYeL3-iWjDhZW_LaXFA_vcqXxgWcsyO_2lJaqUU6G3bvfs52Dyz5a3vIQy2JvyMdmb_LsN9RaVL5Bumsdh_04SXlmqsRDIu0L06TeQMZMhvyTH4w5gxRbKvMhfeYEJ64iui-M5m3O8JLe2y5gKJ1_QjiF_Iyd283xzlMDADwY079mUckOJDCbE_kJTW-NxCdbJTmRm9KCEvlQTsDgCV2UTWXcw-VJSjjCzFv8DzhPWZhKUzVIjtx8Mop')">
            </div>
            <!-- Tonal Overlays -->
            <div class="absolute inset-0 bg-surface/40 backdrop-blur-md"></div>
        </div>
        <!-- Main Loading Content -->
        <main class="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
            <!-- Brand Signature (Fixed Top - Anchor) -->
            <header class="fixed top-0 w-full py-12 flex justify-center">
                <h1 class="font-display italic font-bold text-3xl text-primary tracking-tight">
                    Neliay Collection
                </h1>
            </header>
            <!-- The Central Spinner (The Needle & Thread) -->
            <div class="relative w-48 h-48 mb-12 flex items-center justify-center">
                <!-- Subtle Outer Glow -->
                <div class="absolute inset-0 bg-primary/5 rounded-full blur-3xl"></div>
                <svg class="w-full h-full drop-shadow-sm" viewBox="0 0 100 100">
                    <!-- Circular Path (The Fabric Frame) -->
                    <circle class="text-outline-variant/30" cx="50" cy="50" fill="none" r="45" stroke="currentColor" stroke-width="0.5"></circle>
                    <!-- Animated Thread Loop -->
                    <path class="animate-thread" d="M 50 5 L 85 50 Q 50 95 15 50 Z" fill="none" stroke="url(#goldGradient)" stroke-linecap="round" stroke-width="1.5"></path>
                    <!-- The Needle Icon -->
                    <g class="animate-needle origin-center" style="transform: translate(45px, 35px) rotate(45deg);">
                    <path d="M 0 0 L 2 30 L 4 0 Z" fill="url(#goldGradient)"></path>
                    <circle cx="2" cy="2" fill="white" r="0.8"></circle>
                    </g>
                    <defs>
                    <lineargradient id="goldGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#735c00;stop-opacity:1"></stop>
                    <stop offset="100%" style="stop-color:#d4af37;stop-opacity:1"></stop>
                    </lineargradient>
                    </defs>
                </svg>
            </div>
            <!-- Editorial Message -->
            <div class="space-y-4 max-w-md">
                <h2 class="font-display text-display-sm text-primary tracking-tight transition-all duration-1000 opacity-0 transform translate-y-4" id="loading-text">
                    { currentMessage }
                </h2>
                <p class="font-body text-label-md text-on-surface-variant tracking-widest uppercase">
                    Curating Elegance
                </p>
            </div>
            <!-- Progress Indicator -->
            <div class="mt-16 w-48 h-px bg-outline-variant/20 relative overflow-hidden">
                <div class="absolute left-0 top-0 h-full bg-primary-container transition-all duration-300 ease-out" id="progress-bar" style="width: 0%;"></div>
            </div>
            <!-- Footer Copyright -->
            <footer class="fixed bottom-0 w-full py-12 flex justify-center">
                <p class="font-body text-label-sm text-on-surface-variant/60 tracking-wider">
                    © 2026 NELIAY COLLECTION. CRAFTED FOR ENCHANTED ELEGANCE.
                </p>
            </footer>
        </main>
    </div>    
{/if}

<style>
    .animate-needle {
        animation: needleFloat 3s ease-in-out infinite;
    }

    .animate-thread {
        stroke-dasharray: 100;
        animation: threadSpiral 3s linear infinite;
    }    

    .bg-pulse {
        animation: atmosphericPulse 10s ease-in-out infinite;
    }

    @keyframes needleFloat {
        0%, 100% { transform: translateY(0) rotate(45deg); }
        50% { transform: translateY(-10px) rotate(45deg); }
    }

    @keyframes threadSpiral {
        0% { stroke-dashoffset: 200; opacity: 0; }
        50% { opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0; }
    }

    @keyframes atmosphericPulse {
        0%, 100% { opacity: 0.85; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.02); }
    }
</style>
