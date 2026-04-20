<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';
	import { fly, fade } from 'svelte/transition';

    interface Rental { 
        id: number, 
        start: string, 
        end: string, 
        quantity: number, 
        name: string 
    }

    type CalendarProps = {
        totalQuantity: number;
        rentals: Rental[];
        onDateSelect: null;
    }

    let { totalQuantity, rentals, onDateSelect } : CalendarProps = $props();

	
	// Estado interno
	let currentDate = new Date();
	let selectedDate: Date = $state(new Date());
	let showRentalModal: boolean = $state(false);
	let newRental = $state({ start: '', end: '', quantity: 1, name: '' });
	
	const month = $derived(currentDate.getMonth());
	const year =  $derived(currentDate.getFullYear());
	
	// Nombres de meses en español
	const monthNames = [
		'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
		'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
	];
	
	const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
	
	// Calcular días del mes
	const daysInMonth = $derived(new Date(year, month + 1, 0).getDate());
	const firstDayOfMonth = $derived(new Date(year, month, 1).getDay());
	
	// Generar array de días para el grid
	const calendarDays = Array.from({ length: 42 }, (_, i) => {
		const day = i - firstDayOfMonth + 1;
		if (day > 0 && day <= daysInMonth) {
			return new Date(year, month, day);
		}
		return null;
	});

    function handleDateSelect(date: Date, availability: unknown) {
		console.log('Fecha seleccionada:', date);
		console.log('Disponibilidad:', availability);
	}
	
	// Función para obtener disponibilidad de un día específico
	function getAvailabilityForDate(date: Date) {
		if (!date) return null;
		
		// const dateStr = date.toISOString().split('T')[0];
		let occupied = 0;
		
		rentals.forEach(rental => {        
			const start = new SvelteDate(rental.start);
			const end = new SvelteDate(rental.end);
			
			// Ajustar para comparación precisa
			start.setHours(0,0,0,0);
			end.setHours(0,0,0,0);
			const checkDate = new SvelteDate(date);
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
			isLow: available > 0 && available <= Math.ceil(totalQuantity * 0.2),
			status: available <= 0 ? 'full' : available <= Math.ceil(totalQuantity * 0.2) ? 'low' : 'available'
		};
	}
	
	// Navegación
	function prevMonth() {
		currentDate = new Date(year, month - 1, 1);
	}
	
	function nextMonth() {
		currentDate = new Date(year, month + 1, 1);
	}
	
	function goToToday() {
		currentDate = new Date();
	}
	
	// Selección de fecha
	function selectDate(date: Date) {
		if (!date) return;
		selectedDate = date;
		if (onDateSelect) handleDateSelect(date, getAvailabilityForDate(date));
	}
	
	// Formatear fecha para input
	// function formatDateForInput(date: Date) {
	// 	return date.toISOString().split('T')[0];
	// }
	
	// Agregar nueva renta
	function addRental() {
		if (newRental.start && newRental.end && newRental.quantity) {
			rentals = [...rentals, { id: Date.now(), ...newRental }];
			newRental = { start: '', end: '', quantity: 1, name: '' };
			showRentalModal = false;
		}
	}
	
	// Eliminar renta
	function removeRental(id: number) {
		rentals = rentals.filter(r => r.id !== id);
	}
	
	// Verificar si una fecha es hoy
	function isToday(date: Date) {
		const today = new Date();
		return date && 
			date.getDate() === today.getDate() && 
			date.getMonth() === today.getMonth() && 
			date.getFullYear() === today.getFullYear();
	}
	
	// Formatear fecha para display
	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('es-ES', { 
			day: 'numeric', 
			month: 'short' 
		});
	}
</script>

<div class="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100" >
	<!-- Header del Calendario -->
	<div class="bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Calendario de Disponibilidad</h2>
				<p class="text-indigo-100 text-sm mt-1">
					Stock total: <span class="font-semibold">{totalQuantity}</span> unidades
				</p>
			</div>
			<div class="flex items-center gap-2">
				<button onclick={prevMonth}
					class="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
					aria-label="Mes anterior"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<span class="text-lg font-semibold min-w-35 text-center">
					{monthNames[month]} {year}
				</span>
				<button onclick={nextMonth}
					class="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
					aria-label="Mes siguiente"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>
	</div>

	<div class="flex flex-col lg:flex-row">
		<!-- Calendario Principal -->
		<div class="flex-1 p-6">
			<!-- Leyenda -->
			<div class="flex flex-wrap gap-4 mb-6 text-xs font-medium">
				<div class="flex items-center gap-2">
					<div class="w-4 h-4 rounded-full bg-emerald-500 shadow-sm"></div>
					<span class="text-gray-600">Disponible</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-4 h-4 rounded-full bg-amber-400 shadow-sm"></div>
					<span class="text-gray-600">Pocas unidades</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-4 h-4 rounded-full bg-rose-500 shadow-sm"></div>
					<span class="text-gray-600">Agotado</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-4 h-4 rounded-full bg-indigo-600 ring-2 ring-indigo-300"></div>
					<span class="text-gray-600">Hoy</span>
				</div>
			</div>

			<!-- Grid del Calendario -->
			<div class="grid grid-cols-7 gap-1 mb-2">
				{#each weekDays as day, index(index)}
					<div class="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider py-2">
						{day}
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
								{availability?.status === 'full' ? 'bg-rose-100 hover:bg-rose-200' : 
								 availability?.status === 'low' ? 'bg-amber-100 hover:bg-amber-200' : 
								 'bg-emerald-50 hover:bg-emerald-100'}"
						>
							<span class="text-sm font-semibold {availability?.isFull ? 'text-rose-700' : availability?.isLow ? 'text-amber-700' : 'text-emerald-800'}">
								{date.getDate()}
							</span>
							
							{#if availability}
								<span class="text-[10px] font-bold mt-1 {availability.isFull ? 'text-rose-600' : availability.isLow ? 'text-amber-600' : 'text-emerald-600'}">
									{availability.available} disp
								</span>
								
								<!-- Indicador visual de ocupación -->
								<div class="absolute bottom-1 left-1 right-1 h-1 rounded-full bg-gray-200 overflow-hidden">
									<div 
										class="h-full transition-all duration-300 {availability.isFull ? 'bg-rose-500 w-full' : availability.isLow ? 'bg-amber-400' : 'bg-emerald-500'}"
										style="width: {100 - availability.percentage}%"
									></div>
								</div>
							{/if}
							
							<!-- Tooltip hover -->
							{#if availability && !isSelected}
								<div class="absolute inset-0 bg-gray-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex flex-col items-center justify-center text-white text-[10px] pointer-events-none">
									<span class="font-bold">{availability.available}/{totalQuantity}</span>
									<span>disponibles</span>
								</div>
							{/if}
						</button>
					{:else}
						<div class="aspect-square"></div>
					{/if}
				{/each}
			</div>

			<!-- Botón Hoy -->
			<button onclick={goToToday}
				class="mt-4 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors"
			>
				Ir a Hoy
			</button>
		</div>

		<!-- Sidebar: Gestión de Rentas -->
		<div class="lg:w-80 bg-gray-50 border-l border-gray-200 p-6">
			<div class="flex items-center justify-between mb-4">
				<h3 class="font-bold text-gray-800">Rentas Activas</h3>
				<button onclick={() => showRentalModal = true} aria-label="routes"
					class="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
					</svg>
				</button>
			</div>

			<div class="space-y-3 max-h-100 overflow-y-auto pr-2">
				{#if rentals.length === 0}
					<p class="text-gray-400 text-sm text-center py-8 italic">No hay rentas registradas</p>
				{:else}
					{#each rentals as rental (rental.id)}
						<div 
							transition:fly={{ y: 20, duration: 300 }}
							class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
						>
							<div class="flex justify-between items-start mb-2">
								<span class="font-semibold text-gray-800 text-sm">{rental.name || 'Sin nombre'}</span>
								<button class="text-gray-400 hover:text-rose-500 transition-colors"
                                        onclick={() => removeRental(rental.id)} aria-label="removeRental"								>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div class="text-xs text-gray-600 space-y-1">
								<div class="flex items-center gap-1">
									<svg class="w-3 h-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
									{formatDate(rental.start)} - {formatDate(rental.end)}
								</div>
								<div class="flex items-center gap-1">
									<svg class="w-3 h-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
									</svg>
									<span class="font-medium">{rental.quantity}</span> unidades
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>

			<!-- Resumen -->
			<div class="mt-6 pt-6 border-t border-gray-200">
				<h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Resumen del Mes</h4>
				<div class="grid grid-cols-2 gap-3">
					<div class="bg-white p-3 rounded-lg border border-gray-200">
						<div class="text-2xl font-bold text-emerald-600">
							{calendarDays.filter(d => d && getAvailabilityForDate(d)?.status === 'available').length}
						</div>
						<div class="text-xs text-gray-600">Días completos</div>
					</div>
					<div class="bg-white p-3 rounded-lg border border-gray-200">
						<div class="text-2xl font-bold text-rose-600">
							{calendarDays.filter(d => d && getAvailabilityForDate(d)?.status === 'full').length}
						</div>
						<div class="text-xs text-gray-600">Días agotados</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Modal para agregar renta -->
{#if showRentalModal}
	<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" transition:fade>
		<div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" transition:fly={{ y: 50 }}>
			<div class="flex justify-between items-center mb-6">
				<h3 class="text-xl font-bold text-gray-800">Nueva Renta</h3>
				<button onclick={() => showRentalModal = false} class="text-gray-400 hover:text-gray-600" aria-label="showModal">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			
			<form onsubmit={addRental}  class="space-y-4">
				<div>
					<label for="" class="block text-sm font-medium text-gray-700 mb-1">Nombre / Cliente</label>
					<input 
						type="text" bind:value={newRental.name}
						placeholder="Ej: Reserva Juan Pérez"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
					/>
				</div>
				
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="" class="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
						<input 
							type="date" 
							bind:value={newRental.start}
							required
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
						/>
					</div>
					<div>
						<label for="" class="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
						<input 
							type="date" 
							bind:value={newRental.end}
							required
							min={newRental.start}
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
						/>
					</div>
				</div>
				
				<div>
					<label for="" class="block text-sm font-medium text-gray-700 mb-1">Cantidad ({newRental.quantity} unidades)</label>
					<input 
						type="range" 
						bind:value={newRental.quantity}
						min="1" 
						max={totalQuantity}
						class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
					/>
					<div class="flex justify-between text-xs text-gray-500 mt-1">
						<span>1</span>
						<span>{totalQuantity}</span>
					</div>
				</div>
				
				<button 
					type="submit" 
					class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
				>
					Agregar Renta
				</button>
			</form>
		</div>
	</div>
{/if}

<style>
	.overflow-y-auto::-webkit-scrollbar {
		width: 4px;
	}
	.overflow-y-auto::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	.overflow-y-auto::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 2px;
	}
	.overflow-y-auto::-webkit-scrollbar-thumb:hover {
		background: #94a3b8;
	}
</style>