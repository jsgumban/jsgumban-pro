'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

export default function Home() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Full-stack Supabase App
            </h1>
            <p className="text-xl text-gray-600">
              A modern full-stack application built with Next.js, Express.js, and Supabase
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {user ? (
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Hello, {user.email}!
                </h2>
                <p className="text-gray-600 mb-6">
                  You are successfully authenticated.
                </p>
                <div className="space-x-4">
                  <Link
                    href="/dashboard"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Get Started
                </h2>
                <p className="text-gray-600 mb-6">
                  Sign in to access protected features and your personalized dashboard.
                </p>
                <div className="space-x-4">
                  <Link
                    href="/login"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Next.js Frontend</h3>
              <p className="text-gray-600">
                Modern React framework with server-side rendering and optimal performance.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Express.js API</h3>
              <p className="text-gray-600">
                Robust backend API with authentication middleware and protected routes.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Supabase Auth</h3>
              <p className="text-gray-600">
                Secure authentication with email/password and OAuth providers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}