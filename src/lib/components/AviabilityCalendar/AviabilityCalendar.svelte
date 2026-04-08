<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';
	import type { CalendarProps } from './interfaces';

    let { totalQuantity, rentals, onDateSelect } : CalendarProps = $props();



	const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 
							'July', 'August', 'September', 'October', 'November', 'December' ];
	
	const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	
	let currentDate = new SvelteDate(Date.now());
	let selectedDate: SvelteDate = $state(currentDate);

	
	const month = $derived(currentDate.getMonth());
	const year =  $derived(currentDate.getFullYear());	
	
	const daysInMonth = $derived(new Date(year, month + 1, 0).getDate());
	const firstDayOfMonth = $derived(new Date(year, month, 1).getDay());
	
	const calendarDays = $derived(Array.from({ length: 42 }, (_, i) => {
		const day = i - firstDayOfMonth + 1;
		if (day > 0 && day <= daysInMonth) {
			return new SvelteDate(year, month, day);
		}
		return null;
	}));

    function handleDateSelect(date: Date, availability: unknown) {
		console.log('Fecha seleccionada:', date);
		console.log('Disponibilidad:', availability);
	}
	
	function getAvailabilityForDate(date: Date) {
		if (!date) return null;

		let occupied = 0;
		
		rentals.forEach(rental => {        
			const start = new SvelteDate(rental.start);
			const end = new SvelteDate(rental.end);			
			const checkDate = new SvelteDate(date);

			start.setHours(0,0,0,0);
			end.setHours(0,0,0,0);
			checkDate.setHours(0,0,0,0);
			
			if (checkDate >= start && checkDate <= end) {
				occupied += rental.quantity;
			}
		});
		
		const available = totalQuantity - occupied;
		const percentage = (available / totalQuantity) * 100;
		
		return {
			available,
			occupied,
			percentage,
			isFull: available <= 0,
			status: available <= 0 ? 'full' : 'available'
		};
	}
	
	function prevMonth() {
		currentDate.setMonth(currentDate.getMonth() - 1);
	}
	
	function nextMonth() {
		currentDate.setMonth(currentDate.getMonth() + 1);
	}
	
	function selectDate(date: SvelteDate) {
		if (!date) return;
		selectedDate = date;
		if (onDateSelect) handleDateSelect(date, getAvailabilityForDate(date));
	}
	
	function isToday(date: Date) {
		const today = new Date();
		return date && 
			date.getDate() === today.getDate() && 
			date.getMonth() === today.getMonth() && 
			date.getFullYear() === today.getFullYear();
	}
</script>

<div class="w-full max-w-4xl mx-auto bg-white " >
	<div class="px-6 py-4 text-black">
		<div class="flex items-center justify-between">
			<div>
				<p class="text-black text-sm mt-1">
					Stock: <span class="font-semibold">{ totalQuantity }</span> units
				</p>
				<p class="text-black text-sm mt-1">
					Current Date: <span class="font-semibold">{ 
					currentDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) }</span>
				</p>
				<p class="text-black text-sm mt-1">
					Selected Date: <span class="font-semibold">{ 
					selectedDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) }</span>
				</p>
			</div>
			<div class="flex items-center gap-2">
				<button onclick={()=> prevMonth() }
						class="p-2 hover:bg-black/20 rounded-full transition-colors duration-200"
						aria-label="previous month">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<span class="text-lg font-semibold min-w-35 text-center">
					{ monthNames[month] } { year }
				</span>
				<button onclick={ nextMonth }
					class="p-2 hover:bg-black/20 rounded-full transition-colors duration-200"
					aria-label="next month">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>
	</div>

	<div class="flex flex-col lg:flex-row">
		<div class="flex-1 p-6">
			<div class="flex flex-wrap gap-4 mb-6 text-xs font-medium">
				<div class="flex items-center gap-2">
					<div class="w-4 h-4 rounded-full bg-primary-container shadow-sm"></div>
					<span class="text-gray-600">Available</span>
				</div>				
				<div class="flex items-center gap-2">
					<div class="w-4 h-4 rounded-full bg-rose-500 shadow-sm"></div>
					<span class="text-gray-600">Out of stock</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-4 h-4 rounded-full bg-indigo-600 ring-2 ring-indigo-300"></div>
					<span class="text-gray-600">Today</span>
				</div>
			</div>

			<div class="grid grid-cols-7 gap-1 mb-2">
				{#each weekDays as day, index(index)}
					<div class="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider py-2">
						{ day }
					</div>
				{/each}
			</div>
			
			<div class="grid grid-cols-7 gap-2">
				{#each calendarDays as date, index(index)}
					{#if date}
						{@const availability = getAvailabilityForDate(date)}
						{@const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()}
						
						<button onclick={() => selectDate(date)}
							class="relative aspect-square rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center group
								{isSelected ? 'border-indigo-600 bg-indigo-50 scale-105 z-10 shadow-lg' : 'border-transparent hover:scale-105 hover:z-10 hover:shadow-md'}
								{isToday(date) ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}
								{availability?.status === 'full' ? 'bg-rose-100 hover:bg-rose-200' : 'bg-emerald-50 hover:bg-emerald-100'}"
							>
							<span class="text-sm font-semibold {availability?.isFull ? 'text-rose-700' : 'text-emerald-800'}">
								{ date.getDate()}
							</span>
							
							{#if availability}
								<span class="text-[10px] font-bold mt-1 {availability.isFull ? 'text-rose-600' : 'text-emerald-600'}">
									{availability.available} Avail
								</span>
								
								<div class="absolute bottom-1 left-1 right-1 h-1 rounded-full bg-gray-200 overflow-hidden">
									<div 
										class="h-full transition-all duration-300 {availability.isFull ? 'bg-rose-500 w-full' : 'bg-emerald-500'}"
										style="width: { 100 - availability.percentage }%"
									></div>
								</div>
							{/if}
							
							{#if availability && !isSelected}
								<div class="absolute inset-0 bg-gray-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex flex-col items-center justify-center text-white text-[10px] pointer-events-none">
									<span class="font-bold">{ availability.available } / { totalQuantity }</span>
									<span>Available</span>
								</div>
							{/if}
						</button>
					{:else}
						<div class="aspect-square"></div>
					{/if}
				{/each}
			</div>			
		</div>

	</div>
</div>
