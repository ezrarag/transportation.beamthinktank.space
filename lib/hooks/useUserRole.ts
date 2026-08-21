'use client'

import { useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

export type UserRole = 'beam_admin' | 'partner_admin' | 'board' | 'musician' | 'subscriber' | 'audience'

const adminAuthBypassEnabled =
  process.env.NEXT_PUBLIC_ADMIN_AUTH_BYPASS === '1'

interface UserWithRole {
  user: User | null
  role: UserRole | null
  loading: boolean
}

interface UseUserRoleOptions {
  allowAdminBypass?: boolean
}

const BYPASS_TOKEN_RESULT = {
  authTime: new Date(0).toISOString(),
  claims: {
    role: 'beam_admin',
    beam_admin: true,
  },
  expirationTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  issuedAtTime: new Date().toISOString(),
  signInProvider: 'custom',
  signInSecondFactor: null,
  token: 'admin-bypass-token',
} as Awaited<ReturnType<User['getIdTokenResult']>>

const mockAdminUser = {
  uid: 'local-admin-bypass',
  email: 'admin@local.dev',
  displayName: 'Local Admin',
  getIdToken: async () => 'admin-bypass-token',
  getIdTokenResult: async () => BYPASS_TOKEN_RESULT,
} as unknown as User

export function useUserRole(options: UseUserRoleOptions = {}): UserWithRole {
  const { allowAdminBypass = true } = options
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)
  const bypassEnabled = allowAdminBypass && adminAuthBypassEnabled

  useEffect(() => {
    // Check if auth is initialized
    if (!auth) {
      if (bypassEnabled) {
        setUser(mockAdminUser)
        setRole('beam_admin')
      } else {
        console.warn('Firebase auth is not initialized. Please check your environment variables.')
      }
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (realUser) => {
      const effectiveUser = realUser || (bypassEnabled ? mockAdminUser : null)
      setUser(effectiveUser)
      
      if (effectiveUser) {
        try {
          // First, check custom claims (for admin roles set via Firebase Admin SDK)
          const tokenResult = await effectiveUser.getIdTokenResult().catch(() => null)
          const claims = tokenResult?.claims || {}
          
          // Check for admin claim in custom claims
          if (claims.beam_admin === true || claims.role === 'beam_admin') {
            setRole('beam_admin')
            setLoading(false)
            return
          }
          
          // Check for partner_admin claim
          if (claims.role === 'partner_admin' || claims.partner_admin === true) {
            setRole('partner_admin')
            setLoading(false)
            return
          }
          
          // Check for board claim
          if (claims.role === 'board' || claims.board === true) {
            setRole('board')
            setLoading(false)
            return
          }
          
          // Check for subscriber claim
          if (claims.beam_subscriber === true || claims.subscriber === true) {
            setRole('subscriber')
            setLoading(false)
            return
          }
          
          // Fall back to Firestore user document
          if (db) {
            const userDoc = await getDoc(doc(db, 'users', effectiveUser.uid)).catch(() => null)
            if (userDoc && userDoc.exists()) {
              const userData = userDoc.data()
              if (userData.subscriber === true) {
                setRole('subscriber')
              } else {
                setRole(userData.role || 'musician')
              }
            } else {
              setRole('musician') // Default role
            }
          } else {
            setRole('musician')
          }
        } catch (error) {
          console.error('Error fetching user role:', error)
          setRole('musician')
        }
      } else {
        setRole(null)
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [bypassEnabled])

  return { user, role, loading }
}

export function useRequireRole(requiredRole: UserRole, options: UseUserRoleOptions = {}) {
  const { allowAdminBypass = true } = options
  const { user, role, loading } = useUserRole({ allowAdminBypass })
  
  const hasAccess = !loading && (
    (allowAdminBypass && adminAuthBypassEnabled) ||
    Boolean(user && role === requiredRole)
  )
  
  return {
    user,
    role,
    loading,
    hasAccess,
    redirect: !loading && !hasAccess
  }
}

export function useBoardAccess() {
  const { user, role, loading } = useUserRole()
  
  const hasAccess = !loading && (
    adminAuthBypassEnabled ||
    Boolean(
      user && (
        role === 'board' ||
        role === 'partner_admin' ||
        role === 'beam_admin'
      )
    )
  )
  
  const isReadOnly = role === 'board'
  
  return {
    user,
    role,
    loading,
    hasAccess,
    isReadOnly,
    redirect: !loading && !hasAccess
  }
}
