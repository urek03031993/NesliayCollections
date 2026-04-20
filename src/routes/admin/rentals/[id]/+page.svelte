<script lang="ts">
	import AdminSidebar from "$lib/components/AdminSidebar/AdminSidebar.svelte";
	import RentalItem from "$lib/components/RentalItem/RentalItem.svelte";
	import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>



<AdminSidebar/>

<main class="mx-auto max-w-5xl px-6 pt-32 md:px-12 mb-16">

	<header class="mb-16">
		<h1 class="font-notoSerif text-4xl lg:text-5xl tracking-tight text-on-surface mb-2">
            Rental
        </h1>
		<p class="max-w-2xl leading-relaxed font-light text-on-surface-variant">
			Please review and complete your rental details below.
		</p>
	</header>

	<section class="mb-24">
		<div class="rounded-xl bg-surface-container-low p-8 md:p-12">
			<form name="rentalEditForm" action="#" class="space-y-12" data-netlify="true">
				<div>
					<div class="mb-8 flex items-center gap-3">
						<div class="h-px w-10 bg-primary"></div>
						<h2 class="font-headline text-xl font-semibold text-primary">Customer Details</h2>
					</div>
					<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
						<div class="space-y-2">
							<label for="name" class="font-label block text-sm font-bold tracking-wider text-on-surface-variant uppercase">
                                Full Name
                            </label>
							<input
								class="w-full rounded-lg border-none bg-surface-container-lowest p-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary-container"
								placeholder="Isabella Vane"
								type="text"
                                name="name"
							/>
						</div>
						<div class="space-y-2">
							<label for="email" class="font-label block text-sm font-bold tracking-wider text-on-surface-variant uppercase">
                                Email Address
                            </label>
							<input
								class="w-full rounded-lg border-none bg-surface-container-lowest p-4 text-on-surface focus:ring-2 focus:ring-primary-container"
								placeholder="isabella@atelier.com"
								type="email"
                                name="email"
							/>
						</div>
						<div class="space-y-2 md:col-span-2">
							<label for="phone" class="font-label block text-sm font-bold tracking-wider text-on-surface-variant uppercase">
                                Phone Number
                            </label>
							<input
								class="w-full rounded-lg border-none bg-surface-container-lowest p-4 text-on-surface focus:ring-2 focus:ring-primary-container"
								placeholder="+1 (555) 000-0000"
								type="tel"
                                name="phone"
							/>
						</div>
					</div>
				</div>

				<div>
					<div class="mb-8 flex items-center gap-3">
						<div class="h-px w-10 bg-primary"></div>
						<h2 class="font-headline text-xl font-semibold text-primary">
							Rental Period &amp; Occasion
						</h2>
					</div>
					<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
						<div class="space-y-2">
							<label for="startDate" class="font-label block text-sm font-bold tracking-wider text-on-surface-variant uppercase">
                                Start Date
                            </label>
							<input
								class="w-full rounded-lg border-none bg-surface-container-lowest p-4 text-on-surface focus:ring-2 focus:ring-primary-container"
								type="date"
                                name="startDate"
                                bind:value={ data.start_date }
							/>
						</div>
						<div class="space-y-2">
							<label for="endDate" class="font-label block text-sm font-bold tracking-wider text-on-surface-variant uppercase">
                                Return Date
                            </label>
							<input
								class="w-full rounded-lg border-none bg-surface-container-lowest p-4 text-on-surface focus:ring-2 focus:ring-primary-container"
								type="date"
                                name="endDate"
                                bind:value={ data.end_date }
							/>
						</div>

                        <div class="space-y-2">
							<label for="endDate" class="font-label block text-sm font-bold tracking-wider text-on-surface-variant uppercase">
                                Rental ID
                            </label>
							<input
								class="w-full rounded-lg border-none bg-surface-container-lowest p-4 text-on-surface focus:ring-2 focus:ring-primary-container"
								type="text"
                                name="rentalId"
                                bind:value={ data.rentalId }
							/>
						</div>

                        <div class="space-y-2">
							<label for="taxAmount" class="font-label block text-sm font-bold tracking-wider text-on-surface-variant uppercase">
                                Tax Amount
                            </label>
							<input
								class="w-full rounded-lg border-none bg-surface-container-lowest p-4 text-on-surface focus:ring-2 focus:ring-primary-container"
								type="number"
                                name="taxAmount"
                                bind:value={ data.tax_amount }
							/>
						</div>


                        <div class="space-y-2">
							<label for="taxPercent" class="font-label block text-sm font-bold tracking-wider text-on-surface-variant uppercase">
                                Tax Percent
                            </label>
							<input
								class="w-full rounded-lg border-none bg-surface-container-lowest p-4 text-on-surface focus:ring-2 focus:ring-primary-container"
								type="number"
                                name="taxPercent"
                                bind:value={ data.tax_percent }
							/>
						</div>


                        <div class="space-y-2">
							<label for="subtotal" class="font-label block text-sm font-bold tracking-wider text-on-surface-variant uppercase">
                                Subtotal
                            </label>
							<input
								class="w-full rounded-lg border-none bg-surface-container-lowest p-4 text-on-surface focus:ring-2 focus:ring-primary-container"
								type="number"
                                name="subtotal"
                                bind:value={ data.subtotal }
							/>
						</div>

                         <div class="space-y-2">
							<label for="total" class="font-label block text-sm font-bold tracking-wider text-on-surface-variant uppercase">
                                Total
                            </label>
							<input
								class="w-full rounded-lg border-none bg-surface-container-lowest p-4 text-on-surface focus:ring-2 focus:ring-primary-container"
								type="number"
                                name="total"
                                bind:value={ data.total }
							/>
						</div>

						<div class="space-y-2 md:col-span-2">
							<label for="state" class="font-label block text-sm font-bold tracking-wider text-on-surface-variant uppercase">
                                State
                            </label>
							<select bind:value={ data.state } class="w-full appearance-none rounded-lg border-none bg-surface-container-lowest p-4 text-on-surface focus:ring-2 focus:ring-primary-container">
                                    <option value='draft'>Draft</option>
                                    <option value='confirmed'>Confirmed</option>
                                    <option value='in_process'>In Process</option>
                                    <option value='submitted'>Submitted</option>
                                    <option value='returned'>Returned</option>
                                    <option value='completed'>Completed</option>
                                    <option value='overdue'>Overdue</option>
                                    <option value='cancelled'>Cancelled</option>
							</select>
						</div>
					</div>
				</div>
				<div class="space-y-2">
					<div class="mb-6 flex items-center gap-3">
						<div class="h-px w-10 bg-primary"></div>
						<h2 class="font-headline text-xl font-semibold text-primary">Notes</h2>
					</div>
					<textarea bind:value={ data.notes }
						class="w-full rounded-lg border-none bg-surface-container-lowest p-6 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary-container"
						placeholder="Any bespoke adjustments, measurements, or delivery notes..."
						rows="4"
					></textarea>
				</div>				
			</form>
		</div>
	</section>

	<section>
		<div class="mb-10 flex items-end justify-between">
			<div>
				<h2 class="font-headline text-3xl font-bold text-on-surface">Selected Items</h2>
				<p class="mt-2 font-light text-on-surface-variant">
					The curated pieces for your special event.
				</p>
			</div>
			<!-- <div class="text-right">
				<span class="font-label mb-1 block text-sm font-bold tracking-widest text-on-surface-variant uppercase">
                    Total Rental
                </span>
				<span class="font-serif text-2xl text-primary">$1,850.00</span>
			</div> -->
		</div>
		<div class="space-y-6">
			{#each data.items as item(item.id) }
				<RentalItem product_name={ item.product_name } size_size={ item.size_size } 
							unit_price={ item.unit_price } quantity={ item.quantity } subtotal={ item.subtotal } />				
			{/each}			
		</div>
	</section>
</main>
