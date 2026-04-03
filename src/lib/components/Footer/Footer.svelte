<script lang="ts">
    import { resolve } from "$app/paths";
</script>

<footer class="w-full mt-auto bg-surface-container-low dark:bg-zinc-900 px-12 py-20 flex flex-col items-center gap-8 border-t border-outline-variant/10">
    <div class="font-notoSerif text-xl text-primary">Neliay Collection</div>

    <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
            <h2 class="text-2xl font-bold mb-4">Neliay Collection</h2>
            <p class="text-sm leading-relaxed">
                Our job is to make you look the way you've always wanted to look.
            </p>
        </div>
        <div>
            <h3 class="font-semibold mb-4">Explore</h3>
            <ul class="space-y-2">
                <li>
                    <a class="hover:text-primary" href={resolve('/')}>Home</a>
                </li>
                <li>
                    <a class="hover:text-primary" href={resolve('/catalog')}>Catalog</a>
                </li>
                <li>
                    <a class="hover:text-primary" href={resolve('/')}>Collections</a> 
                </li>
                <li>
                    <a class="hover:text-primary" href={resolve('/')}>Contact</a>
                </li>
            </ul>            
        </div>
        <div>
            <h3 class="font-semibold mb-4">Contact us</h3>
            <ul class="space-y-2 text-sm">
                <li class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-4 h-4 text-primary" aria-hidden="true">
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>Miami, Estados Unidos</span>
                </li>
                <li class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone w-4 h-4 text-primary" aria-hidden="true">
                        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                    </svg>
                    <span>+1(786) 657-1540</span>
                </li>
                <li class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone w-4 h-4 text-primary" aria-hidden="true">
                        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                    </svg>
                    <span>WhatsApp: +1(786) 657-1540</span>
                </li>
                <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail w-4 h-4 text-primary" aria-hidden="true">
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    </svg>
                    <span>neliay.collection@gmail.com</span>
                </li>
            </ul>
        </div>
        <div>
            <h3 class="font-semibold mb-4">Follow</h3>
            <div class="flex gap-4">
                <a href="#/" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook w-5 h-5" aria-hidden="true">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                </a>
                <a href="#/" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram w-5 h-5" aria-hidden="true">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                </a>
                <a href="#/" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter w-5 h-5" aria-hidden="true">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                </a>
            </div>
            <p class="text-sm text-primary mt-4">
                <strong>#EnchantingOccasions</strong>
            </p>
        </div>
    </div>

    <p class="font-manrope text-sm text-on-surface-variant opacity-70">© 2026 Neliay Collection. Crafted for Enchantment.</p>
</footer>