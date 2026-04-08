<script lang="ts">
	import { fade, type FadeParams } from "svelte/transition";
	import { sineIn } from "svelte/easing";
	import { type DialogProps } from "./interfaces"

	let { 
		oncancel,
		onsubmit,
		ontoggle,
				
		open = $bindable(false), 
		children, 
		onaction = () => true, 
	}: DialogProps = $props();

	const transitionParams = { duration: 100, easing: sineIn };

	let modal = $state(true)
	let outsideclose = $state(true)
	let permanent = false
	let autoclose = false

	
	const close = () => (open = false);

	const cancel = (dlg: HTMLDialogElement) => {
		if (typeof dlg.requestClose === "function") return dlg.requestClose();
		dlg.dispatchEvent(new Event("cancel", { bubbles: true, cancelable: true }));
	};

	function _oncancel(ev: Event & { currentTarget: HTMLDialogElement }) {
		if (ev.target !== ev.currentTarget) {
			return; // ignore if not on dialog
		}

		// this event gets called when user canceled the dialog:
		// pressesed ESC key, clicked outside, pressed submit button with no 'value' like close button
		oncancel?.(ev);
		if (ev.defaultPrevented) return;

		ev.preventDefault(); // prevent anyway, we need clean close
		if (!permanent) close();
	}

	function _onclick(ev: MouseEvent & { currentTarget: HTMLDialogElement }) {
		const dlg: HTMLDialogElement = ev.currentTarget;
		if (ev.target === dlg) {
			// click outside - backdrop is dialog
			const rect = dlg.getBoundingClientRect(),
				clickedInContent = ev.clientX >= rect.left && ev.clientX <= rect.right && ev.clientY >= rect.top && ev.clientY <= rect.bottom;

			if (outsideclose && !clickedInContent) {
				return cancel(dlg);
			}
		}

		if (autoclose && ev.target instanceof HTMLButtonElement && !permanent) {
			return close();
		}
	}

	function _onsubmit(ev: SubmitEvent & { currentTarget: HTMLDialogElement }) {
		onsubmit?.(ev);
		if (ev.defaultPrevented) return;

		// When dialog contains the <form method="dialog"> and when child with type="submit" was pressed
		if (!(ev.target instanceof HTMLFormElement) || ev.target.method !== "dialog") {
				return;
			}

		ev.preventDefault(); // stop dialog.close()

		const dlg: HTMLDialogElement = ev.currentTarget;

		if (ev.submitter && "value" in ev.submitter) {
			// this is done by the system but after the submit event
			dlg.returnValue = String(ev.submitter.value ?? "");
			}

		if (!dlg.returnValue) {
			return cancel(dlg); // if no action - treat that as cancel
		}

		if (typeof onaction === "function") {
			const result = onaction({ action: dlg.returnValue, data: new FormData(ev.target) });
			// explicit false from onaction blocks the form closing
			if (result === false) return;
		}

		close();
	}

	function _ontoggle(ev: ToggleEvent & { currentTarget: HTMLDialogElement }) {
		ontoggle?.(ev);
		open = ev.newState === "open"; // for cases when toggle by other means
	}

	function init(dlg: HTMLDialogElement) {
		if (modal) dlg.showModal();
			else dlg.show();

		// Custom focus management
		queueMicrotask(() => {
		const autofocusEl = dlg.querySelector<HTMLElement>("[data-autofocus]") ?? dlg.querySelector<HTMLElement>('input, textarea, select, button:not([aria-label="Close"])');

		if (autofocusEl) {
			autofocusEl.focus();
		} else {
			dlg.focus(); // fallback
		}
		});

    return () => dlg.close();
  	}

	let ref: HTMLDialogElement | undefined = $state(undefined);


</script>

{#if open}
	<dialog 
		{@attach init}
		bind:this={ref}
		tabindex="-1"
		onsubmit={_onsubmit}
		oncancel={_oncancel}
		onclick={_onclick}
		ontoggle={_ontoggle}
		transition:fade|global={transitionParams as FadeParams}
		class="backdrop:bg-gray-900/50 open:flex flex-col w-full rounded-lg divide-y text-on-background border-gray-300 dark:border-gray-700 divide-gray-300 dark:divide-gray-700 bg-background dark:bg-gray-800 pointer-events-auto my-auto mx-auto max-w-lg"
	>	

		{@render children?.()}

		<button onclick={() => close()} type="submit" formnovalidate class="focus:outline-hidden whitespace-normal disabled:cursor-not-allowed disabled:opacity-50 text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300 m-0.5 rounded-lg focus:ring-2 p-1.5 absolute top-2.5 inset-e-2.5" aria-label="Close">
			<span class="sr-only">Close</span>
			<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
				<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
			</svg>
		</button>

	</dialog>	
{/if}


