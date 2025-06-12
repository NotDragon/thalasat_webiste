import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) return { user: null, organizationName: null };

	const { data: profile, error } = await locals.supabase
		.from('profiles')
		.select('organization:organizations(name)')
		.eq('id', locals.user.id)
		.single();

        const organizationName = (profile as any)?.organization?.name ?? null;

	return {
		user: locals.user,
		organizationName
	};
};
