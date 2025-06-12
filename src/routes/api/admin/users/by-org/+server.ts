import { json } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/supabaseAdmin';

export async function GET({ url, locals }) {
    const orgId = url.searchParams.get('orgId');
    if (!orgId) {
        return new Response('Missing orgId', { status: 400 });
    }

    const userId = locals.user?.id;

    const { data: adminProfile } = await locals.supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

    if (adminProfile?.role !== 'super_admin') {
        return new Response('Forbidden', { status: 403 });
    }

    const { data: profiles, error } = await locals.supabase
        .from('profiles')
        .select('id, role, created_at, organizations(name)')
        .eq('organization_id', orgId);

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    const { data: auth } = await supabaseAdmin.auth.admin.listUsers();
    const emailMap = new Map(auth.users.map((u) => [u.id, u.email]));

    const result = profiles.map((p) => ({
        id: p.id,
        role: p.role,
        created_at: p.created_at,
        email: emailMap.get(p.id) ?? '(unknown)',
        organization: p.organizations?.name || '-'
    }));

    return json(result);
}
