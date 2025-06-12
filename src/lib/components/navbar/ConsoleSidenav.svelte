<script>
	import SideMenu from './SideMenu.svelte';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faHouse, faPeopleGroup, faBuilding } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';

	export let open = false;

    export let orgName;
	
  	$: dark = $page.url.pathname == '/monitor';
</script>

<aside class={dark? "dark": "light"} class:open>
	<SideMenu bind:open bind:dark url="/"> 
		<h3>
			<FontAwesomeIcon icon={ faHouse }/> Home
		</h3>
	</SideMenu>
    <hr>
       <SideMenu bind:open bind:dark url={`/${orgName}/console/users`}>
		<h3>
			<FontAwesomeIcon icon={ faPeopleGroup }/> Users
		</h3>
	</SideMenu>
       <SideMenu bind:open bind:dark url={`/${orgName}/console/organizations`}>
		<h3>
			<FontAwesomeIcon icon={ faBuilding }/> Organizations
		</h3>
	</SideMenu>
</aside>


<style>
	aside {
		position: absolute;
		transition: left 0.2s ease-in-out;

		left: -1000%;
		top: 0;
		height: 100vh;
		width: 20vw;
		
		z-index: -1;
		padding: 5vw;
	}

	.light {
		background-color: #001021;
	}

	.dark {
		background-color: white;
	}

	.open {
		left: 0;
	}

</style>
