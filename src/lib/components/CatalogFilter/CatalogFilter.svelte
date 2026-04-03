<aside class="w-full shrink-0 space-y-10 lg:w-64">			
    <section>
        <h3 class="font-notoSerif text-on-surface mb-6 text-xl">Occasion</h3>
        <div class="flex flex-col gap-3">
            <label class="group flex cursor-pointer items-center gap-3">
                <input
                    class="border-outline-variant text-primary focus:ring-primary/20 h-5 w-5 rounded"
                    type="checkbox"
                />
                <span class="text-on-surface-variant group-hover:text-primary transition-colors"
                    >Wedding</span
                >
            </label>
            <label class="group flex cursor-pointer items-center gap-3">
                <input
                    checked
                    class="border-outline-variant text-primary focus:ring-primary/20 h-5 w-5 rounded"
                    type="checkbox"
                />
                <span class="text-primary font-medium transition-colors">Princess</span>
            </label>
            <label class="group flex cursor-pointer items-center gap-3">
                <input
                    class="border-outline-variant text-primary focus:ring-primary/20 h-5 w-5 rounded"
                    type="checkbox"
                />
                <span class="text-on-surface-variant group-hover:text-primary transition-colors"
                    >Animated Characters</span
                >
            </label>
        </div>
    </section>
    
    <section>
        <h3 class="font-notoSerif text-on-surface mb-6 text-xl">Size</h3>
        <div class="flex flex-wrap gap-2">
            <button
                class="bg-secondary-container text-on-secondary-container hover:bg-outline-variant/30 rounded-full px-6 py-2 text-sm font-medium transition-all"
                >Kid</button
            >
            <button
                class="border-outline-variant text-on-surface-variant hover:bg-surface-container rounded-full border px-6 py-2 text-sm font-medium transition-all"
                >Adult</button
            >
        </div>
    </section>
    
    <section>
        <h3 class="font-notoSerif text-on-surface mb-6 text-xl">Tones</h3>
        <div class="flex flex-wrap gap-3">
            <button
                class="ring-primary h-8 w-8 rounded-full bg-blue-100 ring-2 ring-offset-2"
                title="Royal Blue"
            ></button>
            <button
                class="ring-outline-variant h-8 w-8 rounded-full bg-purple-100 ring-1"
                title="Lavender"
            ></button>
            <button
                class="ring-outline-variant h-8 w-8 rounded-full bg-rose-100 ring-1"
                title="Rose Quartz"
            ></button>
            <button
                class="ring-outline-variant h-8 w-8 rounded-full bg-yellow-100 ring-1"
                title="Champagne"
            ></button>
        </div>
    </section>
    
    <section>
        <h3 class="font-notoSerif text-on-surface mb-6 text-xl">Price Range</h3>
        <input
            class="bg-surface-container-highest accent-primary h-1 w-full cursor-pointer appearance-none rounded-lg"
            type="range"
        />
        <div class="text-on-surface-variant mt-4 flex justify-between text-sm">
            <span>$50</span>
            <span>$500+</span>
        </div>
    </section>
</aside>