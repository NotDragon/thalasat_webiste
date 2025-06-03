// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { SupabaseClient, User } from '@supabase/supabase-js';

declare global {
	namespace App {
		// Locals available in `event.locals`
		interface Locals {
			supabase: SupabaseClient;
			user: User | null;
		}

		// If you use page data, you can define types here
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
