import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function load({ locals }) {
	const user = locals.user;
	if (!user) {
		throw redirect(303, '/login');
	}

	const { data: profile, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user.id)
		.single();

	if (!profile) {
		throw redirect(302, '/unauthorized');
	}

	return { profile };
}
