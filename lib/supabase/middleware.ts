import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Role detection based on email patterns
export function getUserRole(email: string): 'student' | 'teacher' | 'admin' | null {
  if (!email.endsWith('@estin.dz')) {
    return null
  }
  
  // Admin emails contain "admin" or specific admin patterns
  if (email.includes('admin') || email.includes('direction') || email.includes('scolarite')) {
    return 'admin'
  }
  
  // Teacher emails typically have a different pattern (e.g., first.last@estin.dz without numbers)
  // Student emails typically have matricule numbers (e.g., i_nom@estin.dz or 2023_nom@estin.dz)
  const localPart = email.split('@')[0]
  
  // If email starts with a letter followed by underscore, or contains year pattern, it's a student
  if (/^[a-z]_/.test(localPart) || /^\d{4}/.test(localPart) || /^[a-z]+\d+/.test(localPart)) {
    return 'student'
  }
  
  // Otherwise assume teacher (professional email format like firstname.lastname@estin.dz)
  if (/^[a-z]+\.[a-z]+$/.test(localPart) || localPart.includes('.')) {
    return 'teacher'
  }
  
  // Default to student if unsure
  return 'student'
}

export async function updateSession(request: NextRequest) {
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
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
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

  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // If user is authenticated and accessing a role-specific page, verify their role
  if (user && user.email) {
    const role = getUserRole(user.email)
    
    // Redirect to appropriate dashboard based on role
    if (pathname === '/chat' || pathname === '/dashboard') {
      const url = request.nextUrl.clone()
      if (role === 'admin') {
        url.pathname = '/admin'
      } else if (role === 'teacher') {
        url.pathname = '/teacher'
      } else {
        url.pathname = '/student'
      }
      return NextResponse.redirect(url)
    }

    // Prevent access to wrong role's pages
    if (pathname.startsWith('/student') && role !== 'student') {
      const url = request.nextUrl.clone()
      url.pathname = role === 'admin' ? '/admin' : '/teacher'
      return NextResponse.redirect(url)
    }
    if (pathname.startsWith('/teacher') && role !== 'teacher') {
      const url = request.nextUrl.clone()
      url.pathname = role === 'admin' ? '/admin' : '/student'
      return NextResponse.redirect(url)
    }
    if (pathname.startsWith('/admin') && role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = role === 'teacher' ? '/teacher' : '/student'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
