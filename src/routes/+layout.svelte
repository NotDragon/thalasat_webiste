<script>
	import Hamburger from '$lib/components/navbar/Hamburger.svelte';
	import Sidebar from '$lib/components/navbar/Sidebar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	import { fade } from 'svelte/transition';
	import { page } from '$app/state';

    let open = false;
</script>

<div class="page-wrapper">
	<div class="navigation">
	    <Hamburger bind:open />
		<Sidebar bind:open></Sidebar>
	</div>


    {#key page.url.pathname}
        <main in:fade={{ duration: 150 }} class="content">
            <slot />
        </main>
    {/key}

	<Footer />
</div>

<style>
	.page-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content {
		flex: 1;
        color: white;
	}

    .navigation {
        position: fixed;
		z-index: 10;
    }

</style>
