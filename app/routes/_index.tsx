import {
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
	type MetaFunction,
	redirect,
} from "@remix-run/node";
import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader,
} from "@supabase/ssr";
import { isUserLoggedIn } from "~/utils/auth";
import { createSupabaseServerClient } from "~/utils/getServerClient";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	if (!isUserLoggedIn(request)) {
		return redirect("/login");
	} else {
		return null;
	}
}

export default function Index() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<h1>Welcome to Remix - INDEX PAGE</h1>
		</div>
	);
}
