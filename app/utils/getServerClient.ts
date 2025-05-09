import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader,
} from "@supabase/ssr";

export function createSupabaseServerClient(request: Request) {
	const cookies = parseCookieHeader(request.headers.get("Cookie") ?? "");
	const headers = new Headers();

	const supabase = createServerClient(
		process.env.SUPABASE_URL ?? "",
		process.env.SUPABASE_ANON_KEY ?? "",
		{
			cookies: {
				getAll() {
					return parseCookieHeader(request.headers.get("Cookie") ?? "").filter(
						(cookie): cookie is { name: string; value: string } =>
							cookie.value !== undefined,
					);
				},
				setAll(cookiesToSet) {
					for (const { name, value, options } of cookiesToSet) {
						headers.append(
							"Set-Cookie",
							serializeCookieHeader(name, value, options),
						);
					}
				},
			},
		},
	);

	return { supabase, headers };
}
