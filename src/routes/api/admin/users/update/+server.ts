import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function POST({ request }) {
	const body = await request.json();
	const { userId, organizationId, role } = body;

	const updates: any = {};
	if (organizationId !== undefined) updates.organization_id = organizationId;
	if (role !== undefined) updates.role = role;

	const { error } = await supabase
		.from('profiles')
		.update(updates)
		.eq('id', userId);

	if (error) return new Response(error.message, { status: 500 });
	return json({ success: true });
}
