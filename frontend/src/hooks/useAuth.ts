'use client'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/store'
import {
  setLoading,
  setAuth,
  setError,
  clearAuth,
  clearError
} from '@/lib/slices/authSlice'
import { createClient } from '@/lib/supabase'

export function useAuth() {
  const dispatch = useDispatch()
  const { user, session, loading, error } = useSelector((state: RootState) => state.auth)
  const [initialized, setInitialized] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const initAuth = async () => {
      if (initialized) return

      try {
        dispatch(setLoading(true))

        // Check localStorage for existing session
        const storedSession = localStorage.getItem('supabase-session')
        if (storedSession) {
          const session = JSON.parse(storedSession)
          
          // Verify session with backend
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555'
          const response = await fetch(`${apiUrl}/auth/verify`, {
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
            },
          })

          if (response.ok) {
            const result = await response.json()
            if (result.valid) {
              dispatch(setAuth({ user: result.user, session }))
              setInitialized(true)
              return
            }
          }
          
          localStorage.removeItem('supabase-session')
        }

        // Check Supabase session (for OAuth)
        const { data: { session } } = await supabase.auth.getSession()
        dispatch(setAuth({ user: session?.user ?? null, session }))
      } catch (err) {
        dispatch(setError('Failed to initialize auth'))
      } finally {
        dispatch(setLoading(false))
        setInitialized(true)
      }
    }

    initAuth()

    // Listen for OAuth auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (_event === 'INITIAL_SESSION') return
        
        dispatch(setAuth({ 
          user: session?.user ?? null, 
          session 
        }))
        
        if (session) {
          localStorage.setItem('supabase-session', JSON.stringify(session))
        } else {
          localStorage.removeItem('supabase-session')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [dispatch, initialized, supabase.auth])

  const signIn = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true))
      dispatch(clearError())

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555'
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (!response.ok) {
        dispatch(setError(result.message || 'Login failed'))
        return { data: null, error: { message: result.message || 'Login failed' } }
      }

      if (result.session) {
        localStorage.setItem('supabase-session', JSON.stringify(result.session))
      }

      dispatch(setAuth({ user: result.user, session: result.session }))
      return { data: result, error: null }
    } catch (err) {
      dispatch(setError('Network error'))
      return { data: null, error: { message: 'Network error' } }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true))
      dispatch(clearError())

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555'
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (!response.ok) {
        dispatch(setError(result.message || 'Registration failed'))
        return { data: null, error: { message: result.message || 'Registration failed' } }
      }

      if (result.session) {
        localStorage.setItem('supabase-session', JSON.stringify(result.session))
      }

      dispatch(setAuth({ user: result.user, session: result.session }))
      return { data: result, error: null }
    } catch (err) {
      dispatch(setError('Network error'))
      return { data: null, error: { message: 'Network error' } }
    }
  }

  const signOut = async () => {
    try {
      dispatch(setLoading(true))
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555'
      
      if (session?.access_token) {
        await fetch(`${apiUrl}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        })
      }

      await supabase.auth.signOut()
      localStorage.removeItem('supabase-session')
      dispatch(clearAuth())

      return { error: null }
    } catch (err) {
      localStorage.removeItem('supabase-session')
      dispatch(clearAuth())
      return { error: { message: 'Logout failed' } }
    }
  }

  const signInWithProvider = async (provider: 'google' | 'github') => {
    try {
      dispatch(setLoading(true))
      dispatch(clearError())

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        dispatch(setError(error.message))
        return { data: null, error: { message: error.message } }
      }

      return { data, error: null }
    } catch (err) {
      dispatch(setError('OAuth initiation failed'))
      return { data: null, error: { message: 'OAuth initiation failed' } }
    }
  }

  const clearAuthError = () => {
    dispatch(clearError())
  }

  return {
    user,
    session,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    signInWithProvider,
    clearAuthError
  }
}