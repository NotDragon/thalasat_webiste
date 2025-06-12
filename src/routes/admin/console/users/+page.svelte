<script lang="ts">
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	type User = { id: string, email: string, role: string, organization: string, created_at: string };
	type Organization = { id: string, name: string };

	let users: User[] = [];
	let filtered: typeof users = [];
	let search = '';
	let sortKey: keyof typeof users[0] | '' = '';
	let sortAsc = true;

	let showModal = false;
	let id = '';
	let organization_id = '';
	let role = '';
	let created_at = '';
	let defaultId = '';
	let defaultCreatedAt = '';

	let selectedUser: User;
	let showSidePanel = false;
	let editEmail = '';
	let editRole = '';
	let editOrganizationId = '';
	let organizations: Organization[] = [];

	let changeHistory: {
		userId: string;
		field: string;
		oldValue: string;
		newValue: string;
		timestamp: string;
	}[] = [];

	onMount(async () => {
		const res = await fetch('/api/admin/users');
		users = await res.json();
		filtered = users;

		const orgRes = await fetch('/api/admin/organizations');
		organizations = await orgRes.json();

		defaultId = uuidv4();
		defaultCreatedAt = new Date().toISOString().slice(0, 16);
	});

	$: filtered = users
		.filter((u) =>
			u.email.toLowerCase().includes(search.toLowerCase()) ||
			u.organization.toLowerCase().includes(search.toLowerCase())
		)
		.sort((a, b) => {
			if (!sortKey) return 0;
                        let x: any = a[sortKey];
                        let y: any = b[sortKey];
			if (sortKey === 'created_at') {
				x = new Date(x);
				y = new Date(y);
			}
			return (x < y ? -1 : x > y ? 1 : 0) * (sortAsc ? 1 : -1);
		});

	const openEditPanel = (user: User) => {
		selectedUser = user;
		editEmail = user.email;
		editRole = user.role;
		editOrganizationId = organizations.find(org => org.name === user.organization)?.id || '';
		showSidePanel = true;
	};

	const toggleSort = (key: keyof typeof users[0]) => {
		if (sortKey === key) sortAsc = !sortAsc;
		else {
			sortKey = key;
			sortAsc = true;
		}
	};

	const openModal = () => {
		showModal = true;
		id = '';
		organization_id = '';
		role = '';
		created_at = '';
		defaultId = uuidv4();
		defaultCreatedAt = new Date().toISOString().slice(0, 16);
	};

	const submitUser = () => {
		if (!organization_id.trim() || !role.trim()) {
			alert('Organization ID and Role are required.');
			return;
		}

		const newUser = {
			id: id || defaultId,
			organization_id,
			role,
			created_at: created_at || defaultCreatedAt
		};

		console.log('New user:', newUser);
		showModal = false;
	};

	async function saveUserEdits() {
		const changes = [];

		if (editEmail !== selectedUser.email) {
			changes.push({ field: 'email', oldValue: selectedUser.email, newValue: editEmail });
		}
		if (editRole !== selectedUser.role) {
			changes.push({ field: 'role', oldValue: selectedUser.role, newValue: editRole });
		}
		const currentOrgId = organizations.find(o => o.name === selectedUser.organization)?.id || '';
		if (editOrganizationId !== currentOrgId) {
			changes.push({ field: 'organization_id', oldValue: currentOrgId, newValue: editOrganizationId });
		}

		for (const change of changes) {
			changeHistory.push({
				userId: selectedUser.id,
				field: change.field,
				oldValue: change.oldValue,
				newValue: change.newValue,
				timestamp: new Date().toISOString()
			});
		}

		await fetch('/api/admin/users/update', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				userId: selectedUser.id,
				email: editEmail,
				role: editRole,
				organizationId: editOrganizationId
			})
		});

		showSidePanel = false;
	}
</script>

<!-- Top bar -->
<div id="top-bar">
	<input type="text" placeholder="Search users..." bind:value={search} class="search-bar" />
	<button class="create-user" on:click={openModal}>Register User</button>
</div>

<!-- Table -->
<div id="table-container">
	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th on:click={() => toggleSort('email')}>Email</th>
				<th on:click={() => toggleSort('role')}>Role</th>
				<th on:click={() => toggleSort('organization')}>Organization</th>
				<th on:click={() => toggleSort('created_at')}>Joined</th>
			</tr>
		</thead>
		<tbody>
			{#each filtered as u}
				<tr on:click={() => openEditPanel(u)}>
					<td>{u.id}</td>
					<td>{u.email}</td>
					<td>{u.role}</td>
					<td>{u.organization}</td>
					<td>{new Date(u.created_at).toLocaleDateString()}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<!-- Register Modal -->
{#if showModal}
	<div class="modal-backdrop" on:click={() => (showModal = false)}></div>
	<div class="modal" on:click|stopPropagation>
		<h2>Register Profile</h2>
		<div class="form-group">
			<label>ID</label>
			<input type="text" bind:value={id} placeholder={defaultId} />
		</div>
		<div class="form-group">
			<label>Organization ID</label>
			<input type="text" bind:value={organization_id} placeholder="-" />
		</div>
		<div class="form-group">
			<label>Role*</label>
			<input type="text" bind:value={role} placeholder="user / admin / super_admin" />
		</div>
		<div class="form-group">
			<label>Created At</label>
			<input type="datetime-local" bind:value={created_at} placeholder={defaultCreatedAt} />
		</div>
		<div class="modal-actions">
			<button on:click={() => (showModal = false)}>Cancel</button>
			<button on:click={submitUser}>Submit</button>
		</div>
	</div>
{/if}

<!-- Side Panel Edit -->
{#if showSidePanel}
	<div class="side-panel">
		<h2>Edit User</h2>
		<div class="form-group">
			<label>Email</label>
			<input type="text" bind:value={editEmail} />
		</div>
		<div class="form-group">
			<label>Role</label>
			<input type="text" bind:value={editRole} />
		</div>
		<div class="form-group">
			<label>Organization</label>
			<select bind:value={editOrganizationId}>
				{#each organizations as org}
					<option value={org.id}>{org.name}</option>
				{/each}
			</select>
		</div>
		<div class="modal-actions">
			<button on:click={() => (showSidePanel = false)}>Cancel</button>
			<button on:click={saveUserEdits}>Save</button>
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

	.create-user {
		background-color: #1481ba;
		color: white;
		padding: 8px 16px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
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
		background-color: #f8f9fa;
		font-weight: 600;
		color: #343a40;
		cursor: pointer;
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

	.modal, .side-panel {
		background: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 400px;
		z-index: 1001;
	}

	.side-panel {
		position: fixed;
		top: 0;
		right: 0;
		width: 300px;
		height: 100%;
		z-index: 1002;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-group {
		margin-bottom: 1rem;
		display: flex;
		flex-direction: column;
	}

	.form-group label {
		font-weight: 600;
		margin-bottom: 4px;
		color: black;
	}

	.form-group input, .form-group select {
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
</style>
