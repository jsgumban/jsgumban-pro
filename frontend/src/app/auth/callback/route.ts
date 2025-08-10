import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('OAuth callback error:', error)
        return NextResponse.redirect(new URL('/login?error=oauth_failed', request.url))
      }

      // Create or update profile for OAuth users
      if (data.user) {
        try {
          await supabase
            .from('profiles')
            .upsert([
              {
                id: data.user.id,
                full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || '',
                avatar_url: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture || ''
              }
            ]);
        } catch (profileError) {
          console.error('Profile creation error:', profileError)
        }
      }
    } catch (error) {
      console.error('OAuth callback error:', error)
      return NextResponse.redirect(new URL('/login?error=oauth_failed', request.url))
    }
  }

  return NextResponse.redirect(new URL('/dashboard', request.url))
}