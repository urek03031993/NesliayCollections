<script lang="ts">
	// Props para personalizar
	let { title = '', open = $bindable(false), children } = $props();

	function toggle() {
		open = !open;
	}
</script>

<div class="accordion" class:open>
	<button 
			class="accordion-header"
			onclick={ toggle }
			aria-expanded={open}
			aria-controls="accordion-content"
		>
		<span class="title">{title}</span>
		<span class="icon" aria-hidden="true">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				class:rotate={open}
			>
				<polyline points="6 9 12 15 18 9"></polyline>
			</svg>
		</span>
	</button>

	<div id="accordion-content" class="accordion-content">
		<div class="content-inner">
			{@render children?.()}
		</div>
	</div>
</div>

<style>
	.accordion {
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
		background: white;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
		overflow: hidden;
		transition: box-shadow 0.2s;
	}

	.accordion:hover {
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}

	.accordion-header {
		width: 100%;
		padding: 1rem 1.25rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: transparent;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		font-weight: 600;
		color: #1e293b;
		text-align: left;
		transition: background-color 0.2s;
	}

	.accordion-header:hover {
		background-color: #f8fafc;
	}

	.accordion-header:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: -2px;
	}

	.title {
		flex: 1;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s ease;
		color: #64748b;
	}

	.icon svg {
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.icon .rotate {
		transform: rotate(180deg);
	}

	.accordion-content {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.3s ease-out;
	}

	.accordion.open .accordion-content {
		grid-template-rows: 1fr;
	}

	.content-inner {
		overflow: hidden;
		padding: 0 1.25rem;
		color: #475569;
		line-height: 1.6;
	}

	.accordion.open .content-inner {
		padding-bottom: 1.25rem;
		padding-top: 0.5rem;
	}

</style>
