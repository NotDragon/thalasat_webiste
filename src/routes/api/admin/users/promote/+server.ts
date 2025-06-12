import { json } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/supabaseAdmin';

export async function POST({ request, locals }) {
	const superAdminId = locals.user?.id;

	// Check if the caller is a super_admin
       const { data: adminProfile } = await locals.supabase
		.from('profiles')
		.select('role')
		.eq('id', superAdminId)
		.single();

	if (adminProfile?.role !== 'super_admin') {
		return new Response('Forbidden', { status: 403 });
	}

	// Get userId and newRole from body
	const { id, role } = await request.json();

	if (!id || !role) {
		return new Response('Missing id or role', { status: 400 });
	}

	const { error } = await supabaseAdmin
		.from('profiles')
		.update({ role })
		.eq('id', id);

	if (error) {
		return new Response(error.message, { status: 500 });
	}

	return json({ success: true });

}
