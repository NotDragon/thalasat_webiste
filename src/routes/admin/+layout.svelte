<script>
	import Hamburger from '$lib/components/navbar/Hamburger.svelte';
	import ConsoleSidenav from '$lib/components/navbar/ConsoleSidenav.svelte';
	import Footer from '$lib/components/Footer.svelte';
  	import UserStatus from '$lib/components/UserStatus.svelte';
	import '../../app.css';

	import { fade } from 'svelte/transition';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	onMount(() => {
		supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_OUT') {
				goto('/login');
			}
		});
	});
    let open = false;
	
</script>

<div class="page-wrapper">
	<div class="navigation">
	    <Hamburger bind:open />
		<ConsoleSidenav bind:open orgName="admin"></ConsoleSidenav>
	</div>

	
	<div style="position: fixed; top: 1rem; right: 1rem;">
		<UserStatus />
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
