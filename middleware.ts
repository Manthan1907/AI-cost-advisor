import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Removed Supabase authentication logic

  return res
}

export const config = {
  // Removed login and auth callback from matcher
  matcher: ['/', '/dashboard/:path*'],
} 