'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/app/lib/supabase'
import type { User } from '@/app/types'

type AdminAuthContextType = {
  user: User | null
  isAdmin: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  checkAdminStatus: () => Promise<boolean>
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        checkAdminStatus()
      } else {
        setUser(null)
        setIsAdmin(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      console.log('[DEBUG] checkUser -> user:', user)
      if (user) {
        setUser(user)
        await checkAdminStatus()
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkAdminStatus = async (): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
            
      if (!user) {
        console.log('No user found')
        setIsAdmin(false)
        return false
      }

      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .single()

      console.log('[DEBUG] checkAdminStatus -> user.id:', user.id, 'admin lookup:', data, 'error:', error)

      const adminStatus = !error && !!data

      setIsAdmin(adminStatus)
      return adminStatus
    } catch (error) {
      console.error('Exception in checkAdminStatus:', error)
      setIsAdmin(false)
      return false
    }
  }

  const signIn = async (email: string, password: string) => {
    try {

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Sign in error:', error)
        return { success: false, error: error.message }
      }

      if (data.user) {
        setUser(data.user)
        
        const adminStatus = await checkAdminStatus()
        
        if (!adminStatus) {
          await supabase.auth.signOut()
          return { success: false, error: 'You are not authorized as an admin' }
        }

        return { success: true }
      }

      return { success: false, error: 'Login failed' }
    } catch (error) {
      console.error('Exception in signIn:', error)
      return { success: false, error: 'An error occurred during login' }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
  }

  return (
    <AdminAuthContext.Provider value={{ user, isAdmin, loading, signIn, signOut, checkAdminStatus }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}