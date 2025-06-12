import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import { supabaseAdmin } from '$lib/supabaseAdmin';

export async function GET({ locals }) {
	const userId = locals.user?.id;

	// Check role
	const { data: adminProfile } = await supabase
		.from('profiles')
		.select('role')
		.eq('id', userId)
		.single();

	if (adminProfile?.role !== 'super_admin') {
		return new Response('Forbidden', { status: 403 });
	}

	// Get profiles + organization name
	const { data: profiles, error: profilesError } = await supabase
		.from('profiles')
		.select('id, role, organization_id, created_at, organizations(name)');

	if (profilesError) {
		return json({ error: profilesError.message }, { status: 500 });
	}

	// Get auth users via Admin API
	const { data, error } = await supabaseAdmin.auth.admin.listUsers();
	if (error) {
		return json({ error: error.message }, { status: 500 });
	}

	const users = data.users.map((u) => ({
		id: u.id,
		email: u.email
	}));

	// Merge
        const merged = profiles.map((p) => {
                const u = users.find((user) => user.id === p.id);
                const org = Array.isArray(p.organizations)
                        ? p.organizations[0]?.name
                        : (p.organizations as any)?.name;
                return {
                        id: p.id,
                        role: p.role,
                        email: u?.email || '(unknown)',
                        created_at: p.created_at,
                        organization: org || '-'
                };
        });

	return json(merged);
}
