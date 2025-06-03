<script lang="ts">
	import { page } from '$app/state';
	import { color_palette_light } from '$lib/colors';
	export let open: boolean;
	export let url: string;
	export let dark = false;
</script>

<nav class={dark? "dark": "light"}>
	<br />
	<a
		href="{url}"
		on:click={() => {
			open = false;
		}}> <div style="{page.url.pathname === url? `background: ${dark? color_palette_light.primary: color_palette_light.background}; color: ${dark? color_palette_light.background: color_palette_light.primaryDark}; padding: 1vh; border-radius: 1vh;`: ""}"><slot/></div></a>
	<br />
</nav>

<style>
	a {
		transition: all 100ms;
		text-decoration: none;
	}

	a:hover {
		color: #1481BA;
	}

	.light a {
		color: white;
	}

	.dark a {
		color: #001021;
	}
</style>
