	<script lang="ts">
		import { onMount } from 'svelte';
		let users: {email: string, role: string, organization: string, created_at: string}[] = [];

		onMount(async () => {
			const res = await fetch('/api/admin/users');
			users = await res.json();
		});
	</script>

	<div id="table-container">
		<table>
			<thead>
				<tr>
					<th>Email</th>
					<th>Role</th>
					<th>Organization</th>
					<th>Joined</th>
				</tr>
			</thead>
			<tbody>
				{#each users as u}
					<tr>
						<td>{u.email}</td>
						<td>{u.role}</td>
						<td>{u.organization}</td>
						<td>{new Date(u.created_at).toLocaleDateString()}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
<style>
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
	}

	td {
		color: #495057;
	}
</style>
