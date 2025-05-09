import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSessionFromCode } from "~/utils/auth";

export async function loader({ request }: LoaderFunctionArgs) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");

	if (code) {
		const { data } = await getSessionFromCode(request, code);
		return data;
	}

	return redirect("/auth/auth-code-error");
}

export default function AuthCode() {
	const data = useLoaderData();
	console.log("Authentication Data:", data);
	return (
		<div>
			<h1>Auth Code</h1>
			<p>Check the console for the response.</p>
		</div>
	);
}

