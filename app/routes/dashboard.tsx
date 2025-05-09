import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'
import { createServerClient } from '@supabase/ssr'
import { getSessionFromCode } from '~/utils/auth'
import { createSupabaseServerClient } from '~/utils/getServerClient'


export async function loader({ request }: LoaderFunctionArgs) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    
    if (code) {
      const { data } = await getSessionFromCode(request, code)
      console.log('data', data)
      return null;
    }

    return redirect('/auth/auth-code-error')
  }


export default function AuthCode() {
    return (
        <div>
            <h1>Auth Code</h1>
            <p>Check the console for the response.</p>
        </div>
    )
}   