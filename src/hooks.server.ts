import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
			set: (key, value, options) => event.cookies.set(key, value, { ...options, path: '/' }),
			remove: (key, options) => event.cookies.delete(key, { ...options, path: '/' }),
		}
	});

	// 🔐 Fetch authenticated user and attach to locals
	const {
		data: { user }
	} = await event.locals.supabase.auth.getUser();

	event.locals.user = user;

	return resolve(event);
};
