import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	const userId = locals.user?.id;

	// 🔒 Role check
       const { data: profile, error: profileError } = await locals.supabase
		.from('profiles')
		.select('role')
		.eq('id', userId)
		.single();

	if (profileError || profile?.role !== 'super_admin') {
		return new Response('Forbidden', { status: 403 });
	}

	// 📦 Get all organizations
       const { data: organizations, error } = await locals.supabase
		.from('organizations')
		.select('id, name, created_at')
		.order('created_at', { ascending: false });

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}

	return json(organizations);
}
