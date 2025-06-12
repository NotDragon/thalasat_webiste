<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { color_palette_light } from '$lib/colors';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import {
		faGear,
		faArrowRightFromBracket,
		faTerminal,
		faInfo,
		faUser
	} from '@fortawesome/free-solid-svg-icons';

	const session: any = writable(null);
	const userProfile = writable<any>(null);

	let showMenu = false;

	onMount(async () => {
		const { data: { session: currentSession } } = await supabase.auth.getSession();
		session.set(currentSession);

		if (currentSession?.user) {
			const { data: profile, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', currentSession.user.id)
				.single();

			if (!error && profile) {
				userProfile.set(profile);
			}
		}

		supabase.auth.onAuthStateChange((_event, newSession) => {
			session.set(newSession);
		});
	});

	onMount(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!(e.target as HTMLElement).closest('.user-container')) {
				showMenu = false;
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	function login() {
		goto('/login');
	}

	async function logout() {
		await supabase.auth.signOut();
		goto('/login');
	}

	function toggleMenu() {
		showMenu = !showMenu;
	}
	
</script>

<div class="user-container">
	{#if $session?.user}
		<img
			src={$session.user.user_metadata?.avatar_url ?? '/default-profile.png'}
			alt="Profile"
			class="profile-icon"
			on:click={toggleMenu}
		/>

		{#if showMenu}
			<div class="dropdown-menu">
				<div class="user-name">
					{$session.user.user_metadata.full_name ?? $session.user.email}
					<br />
					<span style="font-size: 0.75rem;">{$userProfile?.role}</span>
				</div>
				<hr style="margin: 0.4rem 1rem;" />

				<div class="dropdown-item" on:click={() => goto('/profile')}>
					<FontAwesomeIcon icon={faUser} /> View Profile
				</div>
				<div class="dropdown-item" on:click={() => goto('/settings')}>
					<FontAwesomeIcon icon={faGear} /> Settings
				</div>

				{#if $userProfile?.role === 'super_admin'}
					<div class="dropdown-item" on:click={() => goto('/admin/console')}>
						<FontAwesomeIcon icon={faTerminal} /> Admin Console
					</div>
				{/if}

				<div class="dropdown-item" on:click={() => goto('/support')}>
					<FontAwesomeIcon icon={faInfo} /> Help/Support
				</div>
				<div class="dropdown-item" on:click={logout}>
					<FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Out
				</div>
			</div>
		{/if}
	{:else}
		<button
			on:click={login}
			class="login-button"
			style="background: {color_palette_light.primary}"
		>
			Log in
		</button>
	{/if}
</div>

<style>
	.user-container {
		position: relative;
		display: inline-block;
	}

	.profile-icon {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid #ccc;
		cursor: pointer;
		object-fit: cover;
	}

	.login-button {
		padding: 6px 12px;
		font-size: 14px;
		background-color: #eee;
		border: 1px solid #bbb;
		border-radius: 4px;
		cursor: pointer;
		border: none;
		color: white;
		aspect-ratio: 17/9;
		width: 5vw;
	}

	.dropdown-menu {
		position: absolute;
		top: 45px;
		right: 0;
		background-color: #001021;
		border-radius: 7px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		z-index: 100;
		width: 15vw;
		padding-top: 4px;
		color: white;
		font-size: 1rem;
	}

	.user-name {
		padding: 8px 16px;
		font-weight: bold;
	}

	.dropdown-item {
		padding: 10px 16px;
		cursor: pointer;
		transition: all 300ms ease;
	}

	.dropdown-item:last-child {
		padding-bottom: 0.9rem;
	}

	.dropdown-item:hover {
		background-color: white;
		color: black;
	}
</style>
