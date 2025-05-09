import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { isUserLoggedIn, signInWithGitHub } from "~/utils/auth";

export const loader = async ({request}: LoaderFunctionArgs) => {
  if (await isUserLoggedIn(request)) {
    return null;
  }
  return null;
};

export const action = async ({request}: LoaderFunctionArgs) => {
  const {data, headers} = await signInWithGitHub(request);
  return redirect(data.url, {headers: headers});
};

export default function SignIn() {
  return (
    <Form method="post">
      <button type="submit">Sign In with GitHub</button>
    </Form>
  );
}
