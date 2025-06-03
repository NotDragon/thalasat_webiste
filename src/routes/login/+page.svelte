<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { color_palette_light } from '$lib/colors';

	let email = '';
	let password = '';
	let errorMsg = '';
	let loading = false;

	onMount(async () => {
		const { data: { session } } = await supabase.auth.getSession();
		if (session) goto('/');
	});

	async function handleLogin() {
		errorMsg = '';
		loading = true;

		const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });

		if (loginError) {
			errorMsg = loginError.message;
		} else {
			goto('/');
		}

		loading = false;
	}

	async function loginWithGoogle() {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/`
			}
		});

		if (error) {
			errorMsg = 'Google sign-in failed: ' + error.message;
		}
	}
</script>

<style>
	.login-container {
		max-width: 400px;
		margin: 10vh auto;
		padding: 2rem;
		background: white;
		border-radius: 12px;
		box-shadow: 0 0 20px rgba(0,0,0,0.05);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-family: sans-serif;
	}

	h2 {
		text-align: center;
		margin-bottom: 1rem;
	}

	input {
		padding: 0.75rem;
		border: 1px solid #ccc;
		border-radius: 6px;
		width: 100%;
		font-size: 14px;
	}

	button {
		background: var(--primary-color);
		color: white;
		padding: 0.75rem;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: background 0.2s ease;
		font-weight: bold;
	}

	button:hover {
		background: #005fa3;
	}

	.google-button {
		background: #fff;
		color: #444;
		border: 1px solid #ccc;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.google-button img {
		width: 20px;
		height: 20px;
	}

	.error {
		color: red;
		font-size: 0.9rem;
		text-align: center;
	}
</style>

<svelte:head>
	<style>
		:root {
			--primary-color: {color_palette_light.primary};
		}
	</style>
</svelte:head>

<div class="login-container">
	<h2>Log In to Thalasat</h2>

	<input type="email" placeholder="Email" bind:value={email} />
	<input type="password" placeholder="Password" bind:value={password} />

	{#if errorMsg}
		<div class="error">{errorMsg}</div>
	{/if}

	<button on:click={handleLogin} disabled={loading}>
		{loading ? 'Logging in...' : 'Log In'}
	</button>

	<button class="google-button" on:click={loginWithGoogle}>
		<img src="/google-icon.svg" alt="Google logo" />
		Continue with Google
	</button>
</div>
