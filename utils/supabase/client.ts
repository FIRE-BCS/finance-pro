import { createBrowserClient } from '@supabase/ssr'
import { supabaseKey, supabaseUrl } from './supabasekeys'

export function createClient() {
  return createBrowserClient(
    supabaseUrl,
    supabaseKey,
  )
}