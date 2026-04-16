import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Role detection based on email patterns (your original logic, unchanged)
export function getUserRole(email: string): 'student' | 'teacher' | 'admin' | null {
  if (!email.endsWith('@estin.dz')) {
    return null
  }
  
  // Admin emails contain "admin" or specific admin patterns
  if (email.includes('admin') || email.includes('direction') || email.includes('scolarite')) {
    return 'admin'
  }
  
  const localPart = email.split('@')[0]
  
  if (/^[a-z]_/.test(localPart) || /^\d{4}/.test(localPart) || /^[a-z]+\d+/.test(localPart)) {
    return 'student'
  }
  
  if (/^[a-z]+\.[a-z]+$/.test(localPart) || localPart.includes('.')) {
    return 'teacher'
  }
  
  return 'student'
}

export async function updateSession(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value)
            })
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) => {
              supabaseResponse.cookies.set(name, value, options)
            })
          },
        },
      },
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname

    // Protected routes that require authentication
    const protectedPaths = ['/chat', '/dashboard', '/student', '/teacher', '/admin']
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

    // ✅ FIX: Build redirect URLs using request.nextUrl.origin (absolute base)
    if (isProtectedPath && !user) {
      const loginUrl = new URL('/auth/login', request.nextUrl.origin)
      return NextResponse.redirect(loginUrl)
    }

    // If user is authenticated and accessing a role-specific page, verify their role
    if (user && user.email) {
      const role = getUserRole(user.email)
      
      // Redirect from generic paths to role-specific dashboards
      if (pathname === '/chat' || pathname === '/dashboard') {
        let targetPath = '/student'
        if (role === 'admin') targetPath = '/admin'
        else if (role === 'teacher') targetPath = '/teacher'
        const targetUrl = new URL(targetPath, request.nextUrl.origin)
        return NextResponse.redirect(targetUrl)
      }

      // Prevent access to wrong role's pages
      if (pathname.startsWith('/student') && role !== 'student') {
        const targetPath = role === 'admin' ? '/admin' : '/teacher'
        const targetUrl = new URL(targetPath, request.nextUrl.origin)
        return NextResponse.redirect(targetUrl)
      }
      if (pathname.startsWith('/teacher') && role !== 'teacher') {
        const targetPath = role === 'admin' ? '/admin' : '/student'
        const targetUrl = new URL(targetPath, request.nextUrl.origin)
        return NextResponse.redirect(targetUrl)
      }
      if (pathname.startsWith('/admin') && role !== 'admin') {
        const targetPath = role === 'teacher' ? '/teacher' : '/student'
        const targetUrl = new URL(targetPath, request.nextUrl.origin)
        return NextResponse.redirect(targetUrl)
      }
    }

    return supabaseResponse
  } catch (error) {
    console.error('[updateSession] Fatal error:', error)
    // Fallback to allow the request to continue (avoids 500 error)
    return NextResponse.next({ request })
  }
}