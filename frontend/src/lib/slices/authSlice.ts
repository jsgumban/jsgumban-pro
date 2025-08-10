import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, Session } from '@supabase/auth-helpers-nextjs'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  session: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload
    },
    setAuth: (state, action: PayloadAction<{ user: User | null; session: Session | null }>) => {
      state.user = action.payload.user
      state.session = action.payload.session
      state.loading = false
      state.error = null
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
    clearAuth: (state) => {
      state.user = null
      state.session = null
      state.loading = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { setLoading, setUser, setSession, setAuth, setError, clearAuth, clearError } = authSlice.actions
export default authSlice.reducer