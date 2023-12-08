import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/signup'
  
  const token = request.cookies.get('token')?.value || ''

  //if user is authenticated/have token then it should not be able to access the login & signup
  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  //if user not authenticated redirect user to login
  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}
 
// See "Matching Paths" below to learn more
//protected routes
export const config = {
  matcher: [
    '/',
    '/profile',
    '/profile/:path*',
    '/login',
    '/signup'
  ]
}