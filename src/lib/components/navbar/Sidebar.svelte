<script>
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import SideMenu from './SideMenu.svelte';
	import { faHouse, faPeopleGroup, faInfo, faNewspaper, faPaperPlane, faTv } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/state';

	export let open = false;
	
  	$: dark = page.url.pathname.includes('/monitor');
	$: org = page.data.organizationName ?? 'default';
</script>

<aside class={dark? "dark": "light"} class:open>
	<SideMenu bind:open bind:dark url="/"> 
		<h3>
			<FontAwesomeIcon icon={ faHouse }/> Home
		</h3>
	</SideMenu>

	<SideMenu bind:open bind:dark url="/team"> 
		<h3>
			<FontAwesomeIcon icon={ faPeopleGroup }/> The Team
		</h3>
	</SideMenu>
	
	<SideMenu bind:open bind:dark url="/about"> 
		<h3>
			<FontAwesomeIcon icon={ faInfo }/> About
		</h3>
	</SideMenu>

	<SideMenu bind:open bind:dark url="/blog"> 
		<h3>
			<FontAwesomeIcon icon={ faNewspaper }/> Blog
		</h3>
	</SideMenu>
	
	<SideMenu bind:open bind:dark url="/contact"> 
		<h3>
			<FontAwesomeIcon icon={ faPaperPlane }/> Contact
		</h3>
	</SideMenu>
	
	<SideMenu bind:open bind:dark url={`/${org}/monitor`}> 
		<h3>
			<FontAwesomeIcon icon={ faTv }/> Monitor
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
