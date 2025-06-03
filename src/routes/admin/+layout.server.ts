import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const userId = locals.user?.id;
	if (!userId) {
		throw redirect(303, '/login');
	}

	// Get role from the profiles table
	const { data: profile, error } = await locals.supabase
		.from('profiles')
		.select('role')
		.eq('id', userId)
		.single();

	if (error || profile?.role !== 'super_admin') {
		throw redirect(303, '/unauthorized'); // Or return a 403 page
	}

	return {}; // allow access
}
