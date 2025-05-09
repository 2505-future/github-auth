import { redirect } from "@remix-run/react";
import { createSupabaseServerClient } from "~/utils/getServerClient";

export const signInWithGitHub = async (
  request: Request,
  successRedirectPath: string = "http://localhost:5173/dashboard",
) => {
  const {supabase, headers} = createSupabaseServerClient(request);
  const { data, error } = await supabase.auth.signInWithOAuth({ 
    provider: 'github',
    options: {
      redirectTo: successRedirectPath,
    }
  });

  if (error) {
    console.error("OAuth sign-in error:", error);
    throw error;
  }

  return {data, headers};
};


export const signOut = async (
  request: Request,
  successRedirectPath: string = "/",
) => {
  const {supabase} = createSupabaseServerClient(request);
  const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Sign-out error:", error);
        throw error;
    }

    redirect(successRedirectPath);
    return successRedirectPath;
};

export const getUser = async (
  request: Request,
) => {
  const {supabase} = createSupabaseServerClient(request);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user ?? null;
};

export const isUserLoggedIn = async (
  request: Request,
) => {
  const {supabase} = createSupabaseServerClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return !!user;
};

export const getSessionFromCode = async (
    request: Request,
    code: string,
) => {
    const { supabase, headers } = createSupabaseServerClient(request);

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        console.error("Error exchanging code for session:", error);
        throw error;
    }

    return { data, headers };
}