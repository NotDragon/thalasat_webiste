<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { color_palette_light } from '$lib/colors';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
	
	export let visibleCount = 3;
	export let gapPx = 24;
	export let style = '';

	let currentIndex = 0;
	let container: HTMLDivElement;
	let transform = 'translateX(0%)';
	let observer: MutationObserver;

	function updateStyles() {
		if (!container) return;
		const children = Array.from(container.children) as HTMLElement[];

		for (let child of children) {
			child.style.flex = `0 0 calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount})`;
			child.style.marginRight = `${gapPx}px`;
			child.style.boxSizing = 'border-box';
		}

		// Remove last margin
		if (children.length > 0) {
			children[children.length - 1].style.marginRight = '0px';
		}

		updateTransform();
	}

	function updateTransform() {
		if (!container) return;
		const gapShift = gapPx * currentIndex;
		const percentShift = (100 / visibleCount) * currentIndex;
		transform = `translateX(calc(-${percentShift}% - ${gapShift}px))`;
	}

	function next() {
		const maxIndex = Math.max(0, container.children.length - visibleCount);
		currentIndex = Math.min(currentIndex + 1, maxIndex);
		updateTransform();
	}

	function prev() {
		currentIndex = Math.max(currentIndex - 1, 0);
		updateTransform();
	}

	onMount(() => {
		updateStyles();

		observer = new MutationObserver(updateStyles);
		observer.observe(container, { childList: true });

		if (typeof window !== 'undefined') {
			window.addEventListener('resize', updateTransform);
		}
	});

	onDestroy(() => {
		observer?.disconnect();
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', updateTransform);
		}
	});
</script>

<style>
	.carousel-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.5rem;
	}

	.carousel-controls {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
	}

	/* .carousel-controls button {
		border: 
	} */

	.carousel-viewport {
		overflow: hidden;
		width: 100%;
	}

	.carousel-track {
		display: flex;
		transition: transform 0.4s ease;
		will-change: transform;
	}
</style>

<div class="carousel-wrapper" style={style}>
	<div class="carousel-controls">
		<button style="
			border: {color_palette_light.primary} solid 2px; color: {color_palette_light.primary}; 
			background: {color_palette_light.background}; 
			border-radius: 2vw;
			aspect-ratio: 1;
			width: 2.5vw;
			font-size: 1vw;" 
			on:click={prev}><FontAwesomeIcon icon={ faCaretLeft }/></button>
		<button style="
			border: {color_palette_light.primary} solid 2px; color: {color_palette_light.primary}; 
			background: {color_palette_light.background}; 
			border-radius: 2vw;
			aspect-ratio: 1;
			width: 2.5vw;
			font-size: 1vw" 
			on:click={next}><FontAwesomeIcon icon={ faCaretRight }/></button>
	</div>

	<div class="carousel-viewport">
		<div
			class="carousel-track"
			bind:this={container}
			style="transform: {transform};"
		>
			<slot />
		</div>
	</div>
</div>
