import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  console.log('env url:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('env key:', process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  )
}