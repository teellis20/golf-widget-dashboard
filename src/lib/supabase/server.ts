import { createServerClient } from '@supabase/ssr'
import { createClient as cc } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  // console.log('env url:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  // console.log('env key:', process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            console.log('any errors with cookies??')
          }
        },
      },
    }
  )
}

export async function supabaseAdmin () {
  return cc(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_SERVICE_ROLE_SECRET!, 
    {
    auth: {
      // These options are often necessary in server-side rendering (SSR) environments
      // to prevent the client from using a user's session in place of the service key
      persistSession: false,
      autoRefreshToken: false,
    },
});
}