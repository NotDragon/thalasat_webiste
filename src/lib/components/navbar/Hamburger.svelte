<script lang="ts">
	import { page } from '$app/state';
  	$: monitor = page.url.pathname == '/monitor';

        export let open: boolean = false;
</script>

<div class:open>
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button
		class="hamburger {monitor? 'dark': 'light'}"
		on:click={() => (open = !open)}>
		<svg width="32" height="24">
			<line color="white" id="top" x1="0" y1="4" x2="32" y2="4" />
			<line color="white" id="middle" x1="0" y1="12" x2="32" y2="12" />
			<line color="white" id="bottom" x1="0" y1="20" x2="32" y2="20" />
		</svg>
	</button>
</div>

<style>
	svg {
		min-height: 20px;
		transition: transform 0.2s ease-in-out;
	}

	svg line {
		stroke: currentColor;
		stroke-width: 3;
		transition: transform 0.3s ease-in-out;
	}

	button {
		z-index: 20;
		padding: 0.1rem;
	}

	.open svg {
		transform: scale(0.7);
	}

	:global(:not(.open)) .hamburger:hover #top {
		transform: translateY(-2px);
	}
	:global(:not(.open)) .hamburger:hover #middle {
		transform: translateY(0px);
	}
	:global(:not(.open)) .hamburger:hover #bottom {
		transform: translateY(2px);
	}

	.hamburger {
		aspect-ratio: 1;
		width: 3.5vw;
		border-radius: 5vw;
		border: none;
		margin: 1.5vw;
	}

	.dark {
		background-color: white;
	}

	.open .dark {
		background-color: #1481BA;
	}

	.dark #top {
		color: #1481BA;
	}

	.dark #middle {
		color: #1481BA;
	}

	.dark #bottom {
		color: #1481BA;
	}

	.open .dark #top {
		transform: translate(8px, -2px) rotate(45deg);
		color: white;
	}

	.open .dark #middle {
		opacity: 0;
	}

	.open .dark #bottom {
		transform: translate(-10px, 9px) rotate(-45deg);
		color: white;
	}


	.light {
		background-color: #1481BA;
	}

	.open .light {
		background-color: white;
	}

	.open .light #top {
		transform: translate(8px, -2px) rotate(45deg);
		color: #1481BA;
	}

	.open .light #middle {
		opacity: 0;
	}

	.open .light #bottom {
		transform: translate(-10px, 9px) rotate(-45deg);
		color: #1481BA;
	}
</style>
