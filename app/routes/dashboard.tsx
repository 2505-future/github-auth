import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSessionFromCode } from "~/utils/auth";

export async function loader({ request }: LoaderFunctionArgs) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");

	if (code) {
		const { data } = await getSessionFromCode(request, code);
		console.log("data", data);
		return null;
	}

	return redirect("/auth/auth-code-error");
}

export default function AuthCode() {
	return (
		<div>
			<h1>Auth Code</h1>
			<p>Check the console for the response.</p>
		</div>
	);
}
