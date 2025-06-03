import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const user = locals.user;
	if (!user) {
		throw redirect(303, '/login');
	}

	return {};
}
