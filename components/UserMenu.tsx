'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useUserRole } from '@/lib/hooks/useUserRole'
import { User, LogOut, LogIn, LayoutDashboard, ChevronDown, Settings, Home, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function UserMenu() {
  const router = useRouter()
  const { user, role, loading } = useUserRole()
  const [isOpen, setIsOpen] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    if (auth) {
      void getRedirectResult(auth)
        .then((res) => {
          if (res?.user) router.push('/profile')
        })
        .catch((err) => {
          console.warn('Redirect auth notice:', err)
        })
    }
  }, [router])

  const handleSignIn = async () => {
    if (!auth) {
      setAuthError('Firebase Auth is not configured. Missing NEXT_PUBLIC_FIREBASE_* environment variables.')
      return
    }

    setAuthError(null)
    setIsOpen(false)

    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      await signInWithPopup(auth, provider)
      router.push('/profile')
    } catch (error: any) {
      console.warn('Popup sign in error, attempting redirect fallback:', error)
      try {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        await signInWithRedirect(auth, provider)
      } catch (redirectErr: any) {
        setAuthError(`Authentication failed: ${error.message || redirectErr.message}`)
      }
    }
  }

  const handleSignOut = async () => {
    if (!auth) return

    try {
      await signOut(auth)
      setIsOpen(false)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.user-menu-container')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  if (loading) {
    return (
      <div className="h-10 w-10 rounded-full bg-orchestra-gold/20 animate-pulse" />
    )
  }

  return (
    <div className="user-menu-container relative">
      {authError && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-red-950/95 border border-red-500/50 p-3.5 text-xs text-red-200 shadow-2xl z-50 backdrop-blur-lg">
          <div className="flex items-center gap-2 font-bold text-red-100 mb-1">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>Sign In Notice</span>
          </div>
          <p className="leading-relaxed text-[11px] text-red-200/90">{authError}</p>
          <button
            onClick={() => setAuthError(null)}
            className="mt-2.5 inline-block text-[10px] font-semibold text-red-300 hover:text-white underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}
      {!user ? (
        <button
          onClick={handleSignIn}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg transition-colors border border-emerald-500/40 cursor-pointer"
        >
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Sign In</span>
        </button>
      ) : (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/15 text-white"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="h-7 w-7 rounded-full object-cover border border-white/20"
              />
            ) : (
              <div className="h-7 w-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            )}
            <span className="hidden sm:inline text-white text-xs font-medium max-w-[120px] truncate">
              {user.displayName || user.email}
            </span>
            <ChevronDown className={`h-3.5 w-3.5 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40"
                  onClick={() => setIsOpen(false)}
                />

                {/* Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 bg-[#0d1017]/95 backdrop-blur-xl rounded-2xl border border-white/15 shadow-2xl z-50 overflow-hidden text-white"
                >
                  <div className="p-4 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center space-x-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || 'User'}
                          className="h-10 w-10 rounded-full border border-white/20 object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                          <User className="h-5 w-5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">
                          {user.displayName || 'User'}
                        </p>
                        <p className="text-xs text-white/50 truncate">
                          {user.email}
                        </p>
                        {role && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-mono uppercase bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full font-bold">
                            {role === 'beam_admin' ? 'BEAM Admin' : role.charAt(0).toUpperCase() + role.slice(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-2 space-y-1">
                    {/* Profile/Account Link */}
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors group text-xs font-semibold"
                    >
                      <User className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>My Profile</span>
                    </Link>

                    {/* Admin Hub Link */}
                    <Link
                      href="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors group text-xs font-semibold"
                    >
                      <LayoutDashboard className="h-4 w-4 text-transport-amber group-hover:scale-110 transition-transform" />
                      <div className="flex items-center justify-between w-full">
                        <span>Admin Hub</span>
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-transport-amber/15 text-transport-amber border border-transport-amber/30">
                          Exec
                        </span>
                      </div>
                    </Link>

                    {/* Divider */}
                    <div className="border-t border-white/10 my-1" />

                    {/* Sign Out */}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-red-500/15 text-red-300 hover:text-red-200 transition-colors group text-xs font-semibold cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 text-red-400 group-hover:scale-110 transition-transform" />
                      <span>Sign Out</span>
                    </button>
                  </div>

                  {authError && (
                    <div className="p-4 bg-red-500/10 border-t border-red-500/20">
                      <p className="text-sm text-red-300">{authError}</p>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}

