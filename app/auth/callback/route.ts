import { createClient } from '@/lib/supabase/server'
import { getUserRole } from '@/lib/supabase/middleware'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user?.email) {
      // Validate email domain
      if (!data.user.email.endsWith('@estin.dz')) {
        // Sign out the user if not from estin.dz domain
        await supabase.auth.signOut()
        return NextResponse.redirect(`${origin}/auth/error?message=domain`)
      }
      
      // Redirect based on role
      const role = getUserRole(data.user.email)
      if (role === 'admin') {
        return NextResponse.redirect(`${origin}/admin`)
      } else if (role === 'teacher') {
        return NextResponse.redirect(`${origin}/teacher`)
      } else {
        return NextResponse.redirect(`${origin}/student`)
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/error`)
}
