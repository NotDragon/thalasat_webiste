<script lang="ts">
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	let organizations: { id: string; name: string; created_at: string }[] = [];
	let filtered: typeof organizations = [];
	let search = '';
	let sortKey: keyof typeof organizations[0] | '' = '';
	let sortAsc = true;

	// Modal
	let showModal = false;
	let id = '';
	let name = '';
	let created_at = '';
	let defaultId = '';
	let defaultCreatedAt = '';

	onMount(async () => {
		const res = await fetch('/api/admin/organizations');
		organizations = await res.json();
		filtered = organizations;

		defaultId = uuidv4();
		defaultCreatedAt = new Date().toISOString().slice(0, 16); // datetime-local format
	});

	$: filtered = organizations
		.filter((org) => org.name.toLowerCase().includes(search.toLowerCase()))
		.sort((a, b) => {
			if (!sortKey) return 0;
			let x = a[sortKey];
			let y = b[sortKey];
			if (sortKey === 'created_at') {
				x = new Date(x);
				y = new Date(y);
			}
			return (x < y ? -1 : x > y ? 1 : 0) * (sortAsc ? 1 : -1);
		});

	function toggleSort(key: keyof typeof organizations[0]) {
		if (sortKey === key) sortAsc = !sortAsc;
		else {
			sortKey = key;
			sortAsc = true;
		}
	}

	function openModal() {
		showModal = true;
		id = '';
		name = '';
		created_at = '';
		defaultId = uuidv4();
		defaultCreatedAt = new Date().toISOString().slice(0, 16);
	}

	function submitOrganization() {
        if (!name.trim()) {
            alert('Organization name is required.');
            return;
        }

        const newOrg = {
            id: id || defaultId,
            name: name,
            created_at: created_at || defaultCreatedAt
        };
        console.log('New organization:', newOrg);
        showModal = false;
    }

</script>

<!-- Top bar -->
<div id="top-bar">
	<input
		type="text"
		placeholder="Search organizations..."
		bind:value={search}
		class="search-bar"
	/>
	<button class="create-org" on:click={openModal}>Register Organization</button>
</div>

<!-- Table -->
<div id="table-container">
	<table>
		<thead>
			<tr>
				<th on:click={() => toggleSort('id')}>UUID</th>
				<th on:click={() => toggleSort('name')}>Name</th>
				<th on:click={() => toggleSort('created_at')}>Created At</th>
			</tr>
		</thead>
		<tbody>
			{#each filtered as u}
				<tr>
					<td>{u.id}</td>
					<td>{u.name}</td>
					<td>{new Date(u.created_at).toLocaleDateString()}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<!-- Modal -->
{#if showModal}
	<div class="modal-backdrop" on:click={() => (showModal = false)}></div>
	<div class="modal" on:click|stopPropagation>
		<h2>Register Organization</h2>
		<div class="form-group">
			<label>ID</label>
			<input type="text" bind:value={id} placeholder={defaultId} />
		</div>
		<div class="form-group">
			<label>Name*</label>
			<input type="text" bind:value={name} />
		</div>
		<div class="form-group">
			<label>Created At</label>
			<input type="datetime-local" bind:value={created_at} placeholder={defaultCreatedAt} />
		</div>
		<div class="modal-actions">
			<button on:click={() => (showModal = false)}>Cancel</button>
			<button on:click={submitOrganization}>Submit</button>
		</div>
	</div>
{/if}

<style>
	#top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 90%;
		max-width: 1000px;
		margin: 2vh auto 0 auto;
	}

	.search-bar {
		padding: 8px 12px;
		border: 1px solid #ccc;
		border-radius: 4px;
		width: 250px;
	}

	.create-org {
		background-color: #1481ba;
		color: white;
		padding: 8px 16px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.create-org:hover {
		background-color: #168ccc;
	}

	#table-container {
		display: flex;
		justify-content: center;
		width: 100vw;
		overflow-x: auto;
	}

	table {
		border-collapse: collapse;
		width: 90%;
		max-width: 1000px;
		margin-top: 2vh;
		background-color: white;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		overflow: hidden;
		font-family: sans-serif;
	}

	thead {
		background-color: #f8f9fa;
		cursor: pointer;
	}

	th, td {
		text-align: left;
		padding: 12px 16px;
	}

	tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	tr:hover {
		background-color: #e9ecef;
		transition: background-color 0.2s ease-in-out;
	}

	th {
		font-weight: 600;
		color: #343a40;
		user-select: none;
	}

	td {
		color: #495057;
	}

	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		z-index: 1000;
	}

	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 20px;
		border-radius: 8px;
		width: 400px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		z-index: 1001;
	}

	h2 {
		margin-top: 0;
	}

	.form-group {
		margin-bottom: 1rem;
		display: flex;
		flex-direction: column;
	}

	.form-group label {
		font-weight: 600;
		margin-bottom: 4px;
	}

	.form-group input {
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
	}

	.modal-actions button {
		padding: 8px 16px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.modal-actions button:first-child {
		background-color: #ccc;
	}

	.modal-actions button:last-child {
		background-color: #1481ba;
		color: white;
	}

	.modal-actions button:last-child:hover {
		background-color: #1171a3;
	}

    label {
        color: black;
    }
</style>
