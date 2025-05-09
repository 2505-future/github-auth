import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

type SupabaseClientProps = {
	url: string;
	key: string;
};

export function getSupabaseClient(props: SupabaseClientProps): SupabaseClient {
	if (!supabase) {
		supabase = createBrowserClient(props.url, props.key);
	}

	return supabase;
}
